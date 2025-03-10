require('dotenv').config({path: '../.env' });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());
app.use(express.json());

// Verbindung zur Datenbank herstellen
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Überprüfen, ob die Datenbankverbindung erfolgreich ist
db.connect((err) => {
    if (err) {
        console.error('Datenbankverbindung fehlgeschlagen:', err);
        return;
    }
    console.log('Mit der Datenbank verbunden.');
});

// Endpoint zum Abrufen aller Musikwünsche
app.get('/api/musikwuensche', (req, res) => {
    const sql = 'SELECT * FROM T_Musikwunsch';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Fehler bei der Abfrage:', err);
            res.status(500).send('Fehler bei der Abfrage.');
        } else {
            res.json(results);
        }
    });
});

// Endpoint zum Hinzufügen eines neuen Musikwunsches
app.post('/api/musikwuensche', (req, res) => {
    const { titel, bandname, genre } = req.body;
    if (!titel || !genre) {
        return res.status(400).send('Titel und Genre sind erforderlich.');
    }
    const insertSql = `
    INSERT INTO T_Musikwunsch (titel, bandname, genre, votes_count)
    VALUES (?, ?, ?, 0)
  `;
    db.query(insertSql, [titel, bandname || null, genre], (err, result) => {
        if (err) {
            console.error('Fehler beim Hinzufügen des Songs:', err);
            return res.status(500).send('Hinzufügen des Songs fehlgeschlagen.');
        }
        res.status(201).json({
            message: 'Song erfolgreich hinzugefügt.',
            songId: result.insertId
        });
    });
});

// Endpoint zum Abrufen der Playlist
app.get('/api/playlist', (req, res) => {
    const sql = `
            SELECT ps.position, m.titel, m.genre, m.bandname
            FROM T_Playlist_Song ps
            JOIN T_Musikwunsch m ON ps.song_id = m.song_id
            WHERE ps.position IS NOT NULL
            ORDER BY ps.position
        `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Fehler bei der Abfrage:', err);
            res.status(500).send('Fehler bei der Abfrage.');
        } else {
            res.json(results);
        }
    });
});

// Endpoint zum Anmelden eines Gastes
app.post('/api/gast', async (req, res) => {
    let { vname, nname, password } = req.body;
    vname = vname.trim();
    nname = nname.trim();

    if (!vname || !nname || !password) {
        return res.status(400).send('Vorname, Nachname und Kennwort sind erforderlich.');
    }

    try {
        const checkSql = 'SELECT * FROM T_Gast WHERE vname = ? AND nname = ?';
        db.query(checkSql, [vname, nname], async (err, results) => {
            if (err) {
                console.error('Fehler bei der Überprüfung des Nutzers:', err);
                return res.status(500).send('Fehler bei der Überprüfung des Nutzers.');
            }

            if (results.length > 0) {
                // Nutzer existiert bereits → Passwort überprüfen
                const user = results[0];
                const passwordMatch = await bcrypt.compare(password, user.password_hash);

                if (passwordMatch) {
                    delete req.body.password;
                    return res.status(200).json({
                        message: 'Login erfolgreich!',
                        gastId: user.gast_id
                    });
                } else {
                    return res.status(401).send('Falsches Passwort.');
                }
            }

            // Nutzer existiert nicht → Neuen Nutzer registrieren
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const insertSql = 'INSERT INTO T_Gast (vname, nname, password_hash) VALUES (?, ?, ?)';

            db.query(insertSql, [vname, nname, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Fehler bei der Anmeldung:', err);
                    return res.status(500).send('Fehler bei der Anmeldung.');
                }
                delete req.body.password;
                res.status(201).json({ message: 'Gast erfolgreich angemeldet.', gastId: results.insertId });
            });
        });
    } catch (error) {
        console.error('Serverfehler:', error);
        res.status(500).send('Interner Serverfehler.');
    }
});

// Endpoint zum Abstimmen für einen Song
app.post('/api/vote', (req, res) => {
    const { songId } = req.body;
    if (!songId) {
        return res.status(400).send('Song-ID ist erforderlich.');
    }

    const now = new Date();
    const datum = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const zeit = now.toTimeString().split(' ')[0]; // HH:MM:SS

    const getLastGastSql = `SELECT gast_id FROM T_Gast ORDER BY gast_id DESC LIMIT 1`;

    db.query(getLastGastSql, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen des letzten Gast-ID:', err);
            return res.status(500).send('Fehler beim Abrufen des letzten Gast-ID.');
        }

        const lastGastId = results.length > 0 ? results[0].gast_id : null;

        const updateVotesSql = `
            UPDATE T_Musikwunsch 
            SET votes_count = votes_count + 1
            WHERE song_id = ?
        `;

        const insertVoteSql = `
            INSERT INTO T_Vote (f_gast_id, f_song_id, datum, zeit)
            VALUES (?, ?, ?, ?)
        `;

        db.query(updateVotesSql, [songId], (err, results) => {
            if (err) {
                console.error('Fehler beim Hinzufügen eines Votes:', err);
                return res.status(500).send('Fehler beim Hinzufügen eines Votes.');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('Song nicht gefunden.');
            }

            db.query(insertVoteSql, [lastGastId, songId, datum, zeit], (err, results) => {
                if (err) {
                    console.error('Fehler beim Speichern des Votes:', err);
                    return res.status(500).send('Fehler beim Speichern des Votes.');
                }

                res.status(200).json({ message: 'Vote erfolgreich hinzugefügt.', voteId: results.insertId });
            });
        });
    });
});

// Endpoint zum Abrufen der Top 5 Songs
app.get('/api/top-songs', (req, res) => {
    const sql = `
            SELECT * 
            FROM T_Musikwunsch
            ORDER BY votes_count DESC
            LIMIT 5
        `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Fehler bei der Abfrage:', err);
            res.status(500).send('Fehler bei der Abfrage.');
        } else {
            res.json(results);
        }
    });
});

// Endpoint zum Hinzufügen einer Playlist
app.post('/api/playlist', (req, res) => {
    const { name, gastgeberId } = req.body;

    if (!name || !gastgeberId) {
        return res.status(400).send('Name der Playlist und Gastgeber-ID sind erforderlich');
    }

    const checkSql = `
        SELECT * FROM T_Playlist 
        WHERE f_gastgeber_id = ? AND name = ?
    `;

    db.query(checkSql, [gastgeberId, name], (err, results) => {
        if (err) {
            console.error('Fehler bei der Überprüfung der Playlist', err);
            return res.status(500).send('Fehler bei der Überprüfung der Playlist');
        }

        if (results.length > 0) {
            return res.status(409).send('Diese Playlist existiert bereits');
        }

        const insertSql = `
            INSERT INTO T_Playlist (f_gastgeber_id, name)
            VALUES (?, ?)
        `;

        db.query(insertSql, [gastgeberId, name], (err, results) => {
            if (err) {
                console.error('Fehler beim Hinzufügen einer Playlist', err);
                return res.status(500).send('Hinzufügen einer Playlist fehlgeschlagen');
            }

            res.status(201).json({ message: 'Playlist hinzugefügt', playlistId: results.insertId });
        });
    });
});

// Endpoint zum Überprüfen, ob eine Playlist existiert
app.get('/api/playlist/check', (req, res) => {
    const { name, gastgeberId } = req.query;

    if (!name || !gastgeberId) {
        return res.status(400).send('Name und Gastgeber-ID sind erforderlich');
    }

    const checkSql = `SELECT * FROM T_Playlist WHERE f_gastgeber_id = ? AND name = ?`;

    db.query(checkSql, [gastgeberId, name], (err, results) => {
        if (err) {
            console.error('Fehler bei der Überprüfung der Playlist:', err);
            return res.status(500).send('Fehler bei der Überprüfung der Playlist');
        }

        res.json({ exists: results.length > 0 });
    });
});

// Endpoint zum Abrufen der letzten Playlist
app.get('/api/playlist/latest', (req, res) => {
    const sql = `
        SELECT *
        FROM T_Playlist
        ORDER BY playlist_id DESC
        LIMIT 1
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Fehler beim Abrufen der letzten Playlist:', err);
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            console.log('⚠ Keine Playlist gefunden.');
            return res.status(404).json({ message: "Keine Playlist gefunden" });
        }
        console.log('✅ Letzte Playlist:', result[0]);
        res.json(result[0]);
    });
});

// Endpoint zum Löschen einer Playlist
app.delete('/api/playlist', (req, res) => {
    const { name, gastgeberId } = req.body;

    if (!name || !gastgeberId) {
        return res.status(400).send('Name und Gastgeber-ID sind erforderlich');
    }

    const checkSql = `SELECT * FROM T_Playlist WHERE f_gastgeber_id = ? AND name = ?`;

    db.query(checkSql, [gastgeberId, name], (err, results) => {
        if (err) {
            console.error('Fehler bei der Überprüfung der Playlist:', err);
            return res.status(500).send('Fehler bei der Überprüfung der Playlist');
        }

        if (results.length === 0) {
            return res.status(404).send('Diese Playlist existiert nicht');
        }

        const deleteSql = `DELETE FROM T_Playlist WHERE f_gastgeber_id = ? AND name = ?`;

        db.query(deleteSql, [gastgeberId, name], (err, results) => {
            if (err) {
                console.error('Fehler beim Löschen der Playlist:', err);
                return res.status(500).send('Löschen der Playlist fehlgeschlagen');
            }

            res.status(200).json({ message: 'Playlist gelöscht' });
        });
    });
});

// Endpoint zum Ändern des Passworts eines Gastes
app.post('/api/change-password', async (req, res) => {
    let { vname, nname, oldPassword, newPassword } = req.body;

    vname = vname.trim();
    nname = nname.trim();
    oldPassword.bcrypt

    if (!vname || !nname || !oldPassword || !newPassword) {
        return res.status(400).send('Vorname, Nachname, altes und neues Passwort sind erforderlich.');
    }

    try {
        const getUserSql = 'SELECT * FROM T_Gast WHERE vname = ? AND nname = ?';
        db.query(getUserSql, [vname, nname], async (err, results) => {
            if (err) {
                console.error('Fehler beim Abrufen des Nutzers:', err);
                return res.status(500).send('Fehler beim Abrufen des Nutzers.');
            }

            if (results.length === 0) {
                return res.status(404).send('Nutzer nicht gefunden.');
            }

            const user = results[0];

            // Passwort überprüfen
            const passwordMatch = await bcrypt.compare(oldPassword, user.password_hash);
            if (!passwordMatch) {
                return res.status(401).send('Altes Passwort ist falsch.');
            }

            // Setzen neues Passworts 
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            const updateSql = 'UPDATE T_Gast SET password_hash = ? WHERE vname = ? AND nname = ?';
            db.query(updateSql, [hashedPassword, vname, nname], (err, results) => {
                if (err) {
                    console.error('Fehler beim Aktualisieren des Passworts:', err);
                    return res.status(500).send('Fehler beim Aktualisieren des Passworts.');
                }

                res.status(200).json({ message: 'Passwort erfolgreich aktualisiert.' });
            });
        });
    } catch (error) {
        console.error('Serverfehler:', error);
        res.status(500).send('Interner Serverfehler.');
    }
});

// Der Server läuft auf dem angegebenen Port
app.listen(port, () => {
    console.log(`Backend läuft auf http://localhost:${port}`);
});
