const express = require('express');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Ustawienie folderu dla plików statycznych (np. CSS, JS, obrazy)
app.use(express.static(path.join(__dirname, 'public')));

// Konfiguracja połączenia z bazą danych MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Endpoint wysyłający index.html
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

        // Logowanie wyników zapytania
        console.log("Wyniki z bazy danych:", rows);

        connection.end();

        // Zwróć dane jako JSON
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



// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
