CREATE DATABASE MusikVotingDB;
USE MusikVotingDB;

CREATE TABLE T_Gastgeber (
    gastgeber_id INT PRIMARY KEY,
    vname VARCHAR(50),
    nname VARCHAR(50)
);

INSERT INTO T_Gastgeber (gastgeber_id, vname, nname) VALUES
(1, 'Tyrion', 'Lennister');

CREATE TABLE T_Playlist (
    playlist_id INT PRIMARY KEY,
    f_gastgeber_id INT,
    name VARCHAR(100),
    FOREIGN KEY (f_gastgeber_id) REFERENCES T_Gastgeber(gastgeber_id)
);

INSERT INTO T_Playlist (playlist_id, f_gastgeber_id, name) VALUES
(1, 1, 'Party-Time');

CREATE TABLE T_Musikwunsch (
    song_id INT PRIMARY KEY,
    titel VARCHAR(100),
    genre VARCHAR(50),
    bandname VARCHAR(100),
    votes_count INT DEFAULT 0
);

INSERT INTO T_Musikwunsch (song_id, titel, genre, bandname, votes_count) VALUES
(1, 'Raining Blood', 'Thrash Metal', 'Slayer', 3),
(2, 'Nothing Else Matters', 'Ballade', 'Metallica', 2),
(3, 'Atemlos durch die Nacht', 'Schlager', 'Helene Fischer', 1),
(4, 'Die Wahrheit über die Liebe', 'Schlager', 'Helene Fischer', 0),
(5, 'Master of Puppets', 'Thrash Metal', 'Metallica', 2),
(6, 'Hallelujah', 'Pop', 'Leonard Cohen', 2);

CREATE TABLE T_Playlist_Song (
    playlist_id INT,
    song_id INT,
    position INT DEFAULT NULL,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES T_Playlist(playlist_id),
    FOREIGN KEY (song_id) REFERENCES T_Musikwunsch(song_id)
);

INSERT INTO T_Playlist_Song (playlist_id, song_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6);

CREATE TABLE T_Gast (
    gast_id INT PRIMARY KEY,
    vname VARCHAR(50),
    nname VARCHAR(50)
);

INSERT INTO T_Gast (gast_id, vname, nname) VALUES
(1, 'Jaime', 'Lennister'),
(2, 'Cersei', 'Lennister'),
(3, 'Daenerys', 'Targaryen');

CREATE TABLE T_Vote (
    vote_id INT PRIMARY KEY,
    f_gast_id INT,
    f_song_id INT,
    datum DATE,
    zeit TIME,
    FOREIGN KEY (f_gast_id) REFERENCES T_Gast(gast_id),
    FOREIGN KEY (f_song_id) REFERENCES T_Musikwunsch(song_id)
);

INSERT INTO T_Vote (vote_id, f_gast_id, f_song_id, datum, zeit) VALUES
(1, 1, 1, '2023-11-24', '12:00:00'),
(2, 2, 2, '2023-11-24', '12:05:00'),
(3, 3, 3, '2023-11-24', '12:10:00'),
(4, 1, 5, '2023-11-24', '12:15:00'),
(5, 2, 6, '2023-11-24', '12:20:00'),
(6, 3, 1, '2023-11-24', '12:25:00'),
(7, 1, 2, '2023-11-24', '12:30:00'),
(8, 2, 6, '2023-11-24', '12:35:00'),
(9, 3, 5, '2023-11-24', '12:40:00'),
(10, 1, 1, '2023-11-24', '12:45:00');

UPDATE T_Musikwunsch m
SET m.votes_count = (
    SELECT COUNT(*)
    FROM T_Vote v
    WHERE v.f_song_id = m.song_id
);

UPDATE T_Playlist_Song ps
SET ps.position = (
    SELECT COUNT(*) + 1
    FROM T_Musikwunsch m2
    WHERE m2.votes_count > (
        SELECT m.votes_count
        FROM T_Musikwunsch m
        WHERE m.song_id = ps.song_id
    )
    OR (m2.votes_count = (
        SELECT m.votes_count
        FROM T_Musikwunsch m
        WHERE m.song_id = ps.song_id
    )
    AND m2.song_id < ps.song_id)
)
WHERE (SELECT m.votes_count FROM T_Musikwunsch m WHERE m.song_id = ps.song_id) > 0;

UPDATE T_Playlist_Song ps
SET ps.position = NULL
WHERE (SELECT m.votes_count FROM T_Musikwunsch m WHERE m.song_id = ps.song_id) = 0;

SELECT * FROM T_Musikwunsch ORDER BY votes_count DESC;
SELECT * FROM T_Playlist_Song ORDER BY position;