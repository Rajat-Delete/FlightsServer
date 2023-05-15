const express = require('express');

const router = express.Router();

const { InfoController} = require('../../controllers');
const AirplaneRoutes = require('./airplane-routes');
const CityRoutes = require('./city-routes');

router.use('/airplanes',AirplaneRoutes);

router.use('/cities', CityRoutes);
router.get('/info', InfoController.info);
console.log('inside the index js of v1 routes');

module.exports = router;

