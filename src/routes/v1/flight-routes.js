const express = require('express');

const router = express.Router();
const { FlightController } =require('../../controllers');
const { FlightMiddleware } =require('../../middlewares');


//this is technically reffering to /api/v1/airplanes which is a post request
router.post('/' , 
    FlightMiddleware.validateRequest,
    FlightController.createFlight);


module.exports = router;