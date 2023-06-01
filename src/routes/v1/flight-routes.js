const express = require('express');

const router = express.Router();
const { FlightController, AirplaneController } =require('../../controllers');
const { FlightMiddleware } =require('../../middlewares');


//this is technically reffering to /api/v1/flights which is a post request
router.post('/' , 
    FlightMiddleware.validateRequest,
    FlightController.createFlight);

//this is technically reffering to /api/v1/flights?trips=DEL-MUM which is a GET request

router.get('/',
FlightController.getAllFlights);

router.get('/:id', FlightController.getFlight)

module.exports = router;