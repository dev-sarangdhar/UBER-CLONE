const dotenv = require('dotenv'); 
dotenv.config(); 
const cors = require('cors'); 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectToDb = require('../Backend/db/db'); // Correct path
const PORT = 4000;

// Connect to the database with error handling
connectToDb().catch((err) => {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1); // Exit the process if the database connection fails
});

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Middleware to parse JSON

// Routes
const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;