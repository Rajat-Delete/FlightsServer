const express = require('express');

const router = express.Router();
const { CityController } =require('../../controllers');


//this is technically reffering to /api/v1/cities which is a post request
router.post('/' ,CityController.createCity);

module.exports = router;