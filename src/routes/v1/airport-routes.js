const express = require('express');

const router = express.Router();
const { AirportController } = require('../../controllers');
const { AirportMiddleware } = require('../../middlewares');


//this is technically reffering to /api/v1/airports which is a post request
console.log('code here');
router.post('/' , 
    AirportMiddleware.validateRequest,
    AirportController.createAirport);

//this is technically reffering to /api/v1/airports which is a get request
router.get('/',AirportController.getAirports);

//this is technically reffering to /api/v1/airports/:id which is a get request
router.get('/:id', AirportController.getAirport);

//this is technically reffering to /api/v1/airports/:id which is a delete request
router.delete('/:id', AirportController.destroyAirport);


//this is technically reffering to /api/v1/airports/:id which is a update request
router.patch('/:id', AirportController.updateAirport);

module.exports = router;
