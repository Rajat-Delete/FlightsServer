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

/*
Request is going to be look like 
GET 
*/

async function getAirplanes(request,response){
    try{
    const airplanes= await AirplaneService.getAirplanes();
    //console.log('airplanes in controller>>',airplanes);
    SuccesResponse.data = airplanes;

    return response.
    status(StatusCodes.OK)
    .json(SuccesResponse);

    }
    catch(error){
        ErrorResponse.error = error;
        return response
        .status(error.statusCode)
        .json(ErrorResponse);

    }

}
/*
Request is going to be look like 
GET 
*/

async function getAirplane(request,response){
    try{
        //If we have to access one parameter we can access like request.params.id
        const airplane = await AirplaneService.getAirplane(request.params.id);
        //console.log('airplane>>',airplane);
        SuccesResponse.data = airplane;
        return response
        .status(StatusCodes.OK)
        .json(SuccesResponse);

    }
    catch(error){
        console.log('error>>',error);
        ErrorResponse.error=error;
        return response.
        status(error.statusCode)
        .json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
}