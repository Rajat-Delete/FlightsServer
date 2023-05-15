const express = require('express');

const router = express.Router();
const { CityController } =require('../../controllers');
const { CityMiddleware } = require('../../middlewares');

//this is technically reffering to /api/v1/cities which is a post request
router.post('/' ,CityMiddleware.validateRequest,CityController.createCity);

module.exports = router;