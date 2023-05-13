const { StatusCodes } = require('http-status-codes');


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
        .status(StatusCodes.CREATED)
        .json(SuccesResponse);

    }catch(error){
        ErrorResponse.error = error;
        //Generic code we can add to avoid failures at server end
        // if(!error.statusCode){
        //     error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        // }
        return response
        .status(error.statusCode)
        .json(ErrorResponse);

    }
}

module.exports = {
    createAirplane
}