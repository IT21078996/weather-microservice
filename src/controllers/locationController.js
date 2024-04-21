const Location = require('../models/locationModel');

// Controller function to create a new location
exports.createLocation = async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;
        const newLocation = await Location.create({ name, latitude, longitude });
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to get all saved locations
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to update a location
exports.updateLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        const { name, latitude, longitude } = req.body;

        // Check if the location exists
        const existingLocation = await Location.findById(locationId);
        if (!existingLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        // Update the location details
        existingLocation.name = name;
        existingLocation.latitude = latitude;
        existingLocation.longitude = longitude;

        // Save the updated location
        await existingLocation.save();

        res.status(200).json(existingLocation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to delete a location
exports.deleteLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        await Location.findByIdAndDelete(locationId);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
