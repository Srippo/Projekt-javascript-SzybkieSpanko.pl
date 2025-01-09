const express = require('express');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/results', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).send('Miasto nie zostało podane');
    }

    try {
        const connection = mysql.createConnection(dbConfig);
        const [rows] = await connection.promise().query('SELECT * FROM Obiekty WHERE city = ?', [city]);

        console.log("Wyniki z bazy danych:", rows);

        connection.end();

        res.json({ results: rows });
    } catch (err) {
        console.error("Błąd połączenia z bazą danych:", err);
        res.status(500).send('Błąd połączenia z bazą danych');
    }
});


app.get('/city-coordinates', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).send('Miasto nie zostało podane');
    }

    try {
        const connection = mysql.createConnection(dbConfig);
        const [rows] = await connection.promise().query(
            'SELECT latitude, longitude FROM Miasta WHERE city = ?',
            [city]
        );

        if (rows.length === 0) {
            return res.status(404).send('Miasto nie zostało znalezione');
        }

        res.json({ latitude: rows[0].latitude, longitude: rows[0].longitude });
        connection.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd połączenia z bazą danych');
    }
});

app.get('/offer-details', async (req, res) => {
    const { id } = req.query;

    try {
        const connection = mysql.createConnection(dbConfig);

        const [offer] = await connection.promise().query('SELECT * FROM Obiekty WHERE Id = ?', [id]);

        const [facilities] = await connection.promise().query(`
            SELECT Facilities.name, Facilities.icon 
            FROM Facilities 
            JOIN Obiekty_Facilities ON Facilities.id = Obiekty_Facilities.facility_id 
            WHERE Obiekty_Facilities.object_id = ?
        `, [id]);

        const [photos] = await connection.promise().query(`
            SELECT image_url 
            FROM Obiekty_Images 
            WHERE object_id = ?
        `, [id]);

        connection.end();

        if (offer.length === 0) {
            res.status(404).send('Nie znaleziono oferty');
        } else {
            res.json({
                ...offer[0],
                facilities,
                photos: photos.map(photo => photo.image_url),
            });
        }
    } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        res.status(500).send('Błąd serwera');
    }
});

app.get('/reservation-details', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).send('Brakuje identyfikatora oferty.');
    }

    try {
        const connection = mysql.createConnection(dbConfig);
        const [rows] = await connection.promise().query('SELECT object_name, imageUrl, price FROM Obiekty WHERE id = ?', [id]);
        connection.end();

        if (rows.length === 0) {
            return res.status(404).send('Nie znaleziono oferty.');
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd połączenia z bazą danych.');
    }
});



app.post('/rezerwacja', express.json(), async (req, res) => {
    const {
        imie, nazwisko, email, telefon,
        miasto, data_zameldowania, data_wymeldowania,
        liczba_doroslych, liczba_dzieci, object_id
    } = req.body;

    if (!object_id) {
        return res.status(400).send('Brakuje identyfikatora obiektu.');
    }

    try {
        const connection = mysql.createConnection(dbConfig);
        const query = `
            INSERT INTO Rezerwacje
            (imie, nazwisko, email, telefon, miasto, data_zameldowania, data_wymeldowania, liczba_doroslych, liczba_dzieci, object_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await connection.promise().query(query, [
            imie, nazwisko, email, telefon,
            miasto, data_zameldowania, data_wymeldowania,
            liczba_doroslych, liczba_dzieci, object_id
        ]);
        connection.end();

        res.status(200).send('Rezerwacja zapisana');
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd serwera');
    }
});


app.get('/obiekt/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = mysql.createConnection(dbConfig);
        const [rows] = await connection.promise().query('SELECT * FROM Obiekty WHERE id = ?', [id]);
        connection.end();

        if (rows.length === 0) {
            return res.status(404).send('Nie znaleziono obiektu');
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd serwera');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
