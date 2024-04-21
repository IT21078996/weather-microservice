const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route to search for weather information for a location
router.get('/', searchController.searchLocation);

module.exports = router;
