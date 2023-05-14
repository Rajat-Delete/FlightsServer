const express = require('express');

const router = express.Router();
const { AirplaneController } =require('../../controllers');
const { AirplaneMiddleWare } =require('../../middlewares');


//this is technically reffering to /api/v1/airplanes which is a post request
router.post('/' , 
    AirplaneMiddleWare.validateRequest,
    AirplaneController.createAirplane);


//this is technically reffering to /api/v1/airplane which is a get request
router.get('/',AirplaneController.getAirplanes);

//this is technically reffering to /api/v1/airplane/:id which is a get request
router.get('/:id', AirplaneController.getAirplane);

//this is technically reffering to /api/v1/airplane/:id which is a delete request
router.delete('/:id', AirplaneController.destroyAirplane);


module.exports = router;