const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlackListToken = require("../models/blackListToken.model");


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new Error(errors.array()[0].msg));
    }
    const {fullname, email, password, vehicle} = req.body;

    const isCaptainExist = await captainModel.findOne({email});
    if(isCaptainExist){
        return next(new Error("Captain already exists"));
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword,
        color:vehicle.color, 
        plate:vehicle.plate, 
        capacity:vehicle.capacity, 
        vehicleType:vehicle.vehicleType,
    });
    const token = captain.generateAuthToken();
    res.status(201).json({token, captain});
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new Error(errors.array()[0].msg));
    }
    const {email, password} = req.body;
    const captain = await captainModel.findOne({email}).select("+password");
    if(!captain){
        return next(new Error("Captain not found"));
    }
    const isPasswordCorrect = await captain.comparePassword(password);
    if(!isPasswordCorrect){
        return next(new Error("Invalid password"));
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token)
    res.status(200).json({token, captain});
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain: req.captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie("token");
    const token = (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null) || req.cookies.token;
    await BlackListToken.create({token});
    res.status(200).json({message: "Logged out successfully"});
}
