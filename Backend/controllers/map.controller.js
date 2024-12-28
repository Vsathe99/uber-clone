const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');


module.exports.getCoordinates = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ message: error.array()[0].msg });
    }

    const { address } = req.query;
    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.json(coordinates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getDistanceTime = async (req, res) => {
    try {
        
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array()[0].msg });
        }

        const { origin, destination } = req.query;
        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        console.log(distanceTime);
        res.status(200).json(distanceTime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ message: error.array()[0].msg });
        }

        const { input } = req.query;
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}