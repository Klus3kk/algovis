const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL database connection setup
const pool = new Pool({
  user: 'your-username', // Your PostgreSQL username
  host: 'localhost', // Your PostgreSQL host
  database: 'algorithm_visualizer', // Your PostgreSQL database name
  password: 'your-password', // Your PostgreSQL password
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
