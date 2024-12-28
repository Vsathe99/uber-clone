const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {query} = require("express-validator");
const {getCoordinates} = require("../controllers/map.controller");
const {getDistanceTime} = require("../controllers/map.controller");
const {getAutoCompleteSuggestions} = require("../controllers/map.controller");



router.get("/get-coordinates",
    query("address").isString().notEmpty(),
    authMiddleware.authUser, getCoordinates);

router.get("/get-distance-time",
    query("origin").isString().notEmpty(),
    query("destination").isString().notEmpty(),
    authMiddleware.authUser, getDistanceTime);

router.get("/get-suggestions",
    query("input").isString().notEmpty(),
    authMiddleware.authUser, getAutoCompleteSuggestions
)


module.exports = router;