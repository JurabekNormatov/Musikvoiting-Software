const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    database: 'MusikVotingDB',
    user: 'root',
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

app.post('/api/gast', (req, res) => {
    const { vname, nname } = req.body;

    if (!vname || !nname) {
        return res.status(400).send('Vorname und Nachname sind erforderlich.');
    }

    const sql = 'INSERT INTO T_Gast (vname, nname) VALUES (?, ?)';
    db.query(sql, [vname, nname], (err, results) => {
        if (err) {
            console.error('Fehler bei der Anmeldung:', err);
            return res.status(500).send('Fehler bei der Anmeldung.');
        }
        res.status(201).json({ message: 'Gast erfolgreich angemeldet.', gastId: results.insertId });
    });
});

app.listen(port, () => {
    console.log(`Backend läuft auf http://localhost:${port}`);
});
