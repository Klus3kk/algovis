const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL database connection setup
const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost', // Your PostgreSQL host
  database: 'AlgoVis-db', // Your PostgreSQL database name
  password: 'cluesec', // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// Basic route to test the API
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Example route for fetching algorithms
app.get('/algorithms', (req, res) => {
  res.json({
    algorithms: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Dijkstra', 'A* Search'],
  });
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
