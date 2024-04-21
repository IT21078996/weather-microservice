const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

const locationRoutes = require('./routes/locationRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'root' directory
app.use(express.static(process.cwd()));

// Mount routes
app.use('/locations', locationRoutes);
app.use('/search', searchRoutes);

// Default route for root path
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: process.cwd() });
});

// Start server
const port = process.env.PORT || 3000;
const uri = process.env.MongoDB_CON_STR;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// MongoDB connection
async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // Gracefully handle database connection errors
        server.close(); // Close the server if database connection fails
        process.exit(1); // Exit the process with failure code
    }
}

connectToDatabase().then(() => {});