const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BlackListToken = require("../models/blackListToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const isBlackListed = await BlackListToken.findOne({token});
    if(isBlackListed) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const isBlackListed = await BlackListToken.findOne({token});
    if(isBlackListed) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"});
    }
}
