const express = require('express');
const { query,body } = require('express-validator');
const router = express.Router();
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',authMiddleware.authUser,[

    body('pickup').isString().notEmpty().withMessage('Invalid pickup address'),
    body('destination').isString().notEmpty().withMessage('Invalid destination address'),
    body('vehicleType').isString().notEmpty().withMessage('Invalid vehicle type'),
],
  rideController.createRide

)

router.get('/get-fare',authMiddleware.authUser,
  [
    query('pickup').isString().notEmpty().withMessage('Invalid pickup address'),
    query('destination').isString().notEmpty().withMessage('Invalid destination address'),
  ]
  ,rideController.getFare)


router.post('/confirm',
  authMiddleware.authCaptain,
  [
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    body('captainId').isMongoId().withMessage('Invalid ride id'),
   
  ],
  rideController.confirmRide)

  router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    body('captainId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

  
module.exports = router;