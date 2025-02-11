const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    database: 'MusikVotingDB',
    user: 'root1',
    host: 'localhost'
});

db.connect((err) => {
    if (err) {
        console.error('Datenbankverbindung fehlgeschlagen:', err);
        return;
    }
    console.log('Mit der Datenbank verbunden.');
});

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
                return res.status(409).send('Nutzer mit diesem Namen existiert bereits.');
            }

            // Passwort hashen
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const insertSql = 'INSERT INTO T_Gast (vname, nname, password_hash) VALUES (?, ?, ?)';
            db.query(insertSql, [vname, nname, hashedPassword], (err, results) => {
                if (err) {
                    console.error('Fehler bei der Anmeldung:', err);
                    return res.status(500).send('Fehler bei der Anmeldung.');
                }

                res.status(201).json({ message: 'Gast erfolgreich angemeldet.', gastId: results.insertId });
            });
        });
    } catch (error) {
        console.error('Serverfehler:', error);
        res.status(500).send('Interner Serverfehler.');
    }
});

app.post('/api/vote', (req, res) => {
    const { songId } = req.body;

    if (!songId) {
        return res.status(400).send('Song-ID ist erforderlich.');
    }

    const updateSql = `
        UPDATE T_Musikwunsch 
        SET votes_count = votes_count + 1
        WHERE song_id = ?
    `;

    db.query(updateSql, [songId], (err, results) => {
        if (err) {
            console.error('Fehler beim Hinzufügen eines Votes:', err);
            return res.status(500).send('Fehler beim Hinzufügen eines Votes.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Song nicht gefunden.');
        }

        res.status(200).json({ message: 'Vote erfolgreich hinzugefügt.' });
    });
});

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

app.delete('/api/musikwuensche/:songId', (req, res) => {
    const songId = req.params.songId;

    const deleteVotesSql = 'DELETE FROM T_Vote WHERE f_song_id = ?';
    const deleteSongSql = 'DELETE FROM T_Musikwunsch WHERE song_id = ?';

    db.query(deleteVotesSql, [songId], (err, voteResults) => {
        if (err) {
            console.error('Fehler beim Löschen der Votes:', err);
            return res.status(500).send('Fehler beim Löschen der Votes.');
        }

        db.query(deleteSongSql, [songId], (err, songResults) => {
            if (err) {
                console.error('Fehler beim Löschen des Songs:', err);
                return res.status(500).send('Fehler beim Löschen des Songs.');
            }

            if (songResults.affectedRows === 0) {
                return res.status(404).send('Song nicht gefunden.');
            }

            res.status(200).json({ message: 'Song erfolgreich gelöscht.' });
        });
    });
});

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


app.listen(port, () => {
    console.log(`Backend läuft auf http://localhost:${port}`);
});
