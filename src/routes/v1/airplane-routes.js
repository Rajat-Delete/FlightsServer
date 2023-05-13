const express = require('express');

const router = express.Router();
const { AirplaneController } =require('../../controllers');
const { AirplaneMiddleWare } =require('../../middlewares');


//this is technically reffering to /api/v1/airplanes which is a post request
router.post('/' , 
    AirplaneMiddleWare.validateRequest,
    AirplaneController.createAirplane);


module.exports = router;