const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const BlackListToken = require("../models/blackListToken.model");




module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
   
    const {fullname, email, password} = req.body;
    const isUserExist = await userModel.findOne({email});
    if(isUserExist){
        return next(new Error("User already exists"));
    }
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname :fullname.firstname,
        lastname :fullname.lastname,
        email,
        password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({token,user});

}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select("+password");
    if(!user) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid) {
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = user.generateAuthToken();
    res.cookie("token", token, {httpOnly: true});
    res.status(200).json({token, user});
    
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({user: req.user});
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token");
    const token = (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null) || req.cookies.token;
    await BlackListToken.create({token});
    res.status(200).json({message: "Logged out successfully"});
}
