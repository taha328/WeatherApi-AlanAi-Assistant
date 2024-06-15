const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL Database setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db',
  password: 'qawsed?',
  port: 5432,
});

// Create a table to store health information
pool.query(`
  CREATE TABLE IF NOT EXISTS Infos_Santé (
    id SERIAL PRIMARY KEY,
    nom_complet TEXT,
    temperature_corporelle REAL,
    tension_arterielle TEXT,
    symptomes TEXT,
    groupe_age TEXT,
    adresse TEXT,
    acces_refroidissement TEXT,
    contact_urgence TEXT,
    conditions_medicales TEXT
  );
`, (err, result) => {
  if (err) {
    console.error('Error creating Infos_Santé table:', err);
  } else {
    console.log('Table Infos_Santé created successfully');
  }
});

// Routes
app.post('/health-info', (req, res) => {
  const {
    nomComplet,
    temperatureCorporelle,
    tensionArterielle,
    symptomes,
    groupeAge,
    adresse,
    accesRefroidissement,
    contactUrgence,
    conditionsMedicales
  } = req.body;
  // Insert health information into the database
  pool.query('INSERT INTO Infos_Santé (nom_complet, temperature_corporelle, tension_arterielle, symptomes, groupe_age, adresse, acces_refroidissement, contact_urgence, conditions_medicales) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [nomComplet, temperatureCorporelle, tensionArterielle, symptomes, groupeAge, adresse, accesRefroidissement, contactUrgence, conditionsMedicales],
    (err, result) => {
      if (err) {
        console.error('Error inserting health information:', err);
        res.status(500).json({ error: 'Échec de l\'enregistrement des informations de santé.' });
      } else {
        res.status(200).json({ message: 'Informations de santé enregistrées avec succès.' });
      }
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
