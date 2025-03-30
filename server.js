const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const port = 3000;

// PostgreSQL pool connection setup
const pool = new Pool({
  user: 'postgres',     // PostgreSQL username
  host: 'localhost',         // PostgreSQL host
  database: 'testingground', // PostgreSQL database name
  password: 'antara1sampai10', // PostgreSQL password
  port: 5432,                // PostgreSQL port (default is 5432)
});

// Middleware to parse JSON requests
app.use(express.json());

// Serve the index.html file when accessing the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to get the latest data from the database
const getLatestData = async () => {
  try {
    const result = await pool.query('SELECT * FROM tabel ORDER BY id DESC LIMIT 1');
    if (result.rows.length > 0) {
      const latestData = result.rows[0];
      return {
        table1: latestData.table1,
        table2: latestData.table2,
        table3: latestData.table3,
        table4: latestData.table4,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error executing query:', err);
    return null;
  }
};

// Route to get the latest data (API endpoint)
app.get('/latest-data', async (req, res) => {
  try {
    const data = await getLatestData();
    if (data) {
      res.json(data);
    } else {
      res.status(500).send('Error retrieving data');
    }
  } catch (err) {
    console.error('Error fetching latest data:', err);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
