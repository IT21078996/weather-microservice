const axios = require('axios');
require('dotenv').config();

// Controller function to search for weather information for a location
exports.searchLocation = async (req, res) => {
    try {
        const { query } = req.query;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
