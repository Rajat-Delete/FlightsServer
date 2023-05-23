const express = require('express');

const router = express.Router();

const { InfoController} = require('../../controllers');
const AirplaneRoutes = require('./airplane-routes');
const CityRoutes = require('./city-routes');
const AirportRoutes = require('./airport-routes');

router.use('/airplanes',AirplaneRoutes);
router.use('/airports',AirportRoutes);

router.use('/cities', CityRoutes);
router.get('/info', InfoController.info);
console.log('inside the index js of v1 routes');

module.exports = router;

