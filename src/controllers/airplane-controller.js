const { StatusCode } = require('http-status-codes')
const { AirplaneService } = require('../services');
const { ErrorResponse, SuccesResponse } = require('../utils/common');
/*
Request is going to be look like 
POST {
    'modelNumber': 'Airbus380',
    'Capacity': '250'
}

*/

async function createAirplane(request, response){

    try{
       // console.log("request>>",request);
        const airplane = await AirplaneService.createAirplane({
            modelNumber : request.body.modelNumber,
            capacity: request.body.capacity
        });
        SuccesResponse.data =airplane;
        return response
        .status(201)
        .json(SuccesResponse);

    }catch(error){
        ErrorResponse.message = 'Successfully created a airplane';
        ErrorResponse.error = error;
        return response
        .status(500)
        .json(ErrorResponse);

    }
}

module.exports = {
    createAirplane
}