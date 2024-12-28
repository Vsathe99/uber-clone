const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service') ;
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup: req.body.pickup,
            destination: req.body.destination,
            vehicleType: req.body.vehicleType
        });
        

        const pickupCoordinates = await mapService.getAddressCoordinate(req.body.pickup);
        console.log(pickupCoordinates);
        const captainInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 4);
        ride.otp = "";
        

        const rideWithUser = await rideModel.findOne({_id:ride._id}).populate('user');
        captainInRadius.map( captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride', 
                data: rideWithUser
            });
           
        });
        res.status(201).json(ride);

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

module.exports.getFare = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { pickup, destination } = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json(fare);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, captainId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captainId });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp });
        console.log(ride.user.socketId)
        sendMessageToSocketId(ride.user.socketId, {
            event:'ride-begins',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId,captainId } = req.body;
    console.log(rideId)

    try {
        const ride = await rideService.endRide({ rideId, captai:captainId });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message });
    } s
}