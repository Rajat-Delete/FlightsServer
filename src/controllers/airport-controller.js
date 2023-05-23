const { StatusCodes } = require('http-status-codes');

const { AirportService } = require('../services');
const { ErrorResponse, SuccesResponse } = require('../utils/common');

/*
Request is going to be look like 
POST {
    'name': 'Airbus380',
    'code': '250',
    'address' : 'Some Address',
    'cityId' : 'Some city'
}

*/
async function createAirport(request, response){

    try{
       console.log("request>>",request);
        const airport = await AirportService.createAirport({
            name : request.body.name,
            code: request.body.code,
            address : request.body.address,
            cityId : request.body.cityId
        });
        SuccesResponse.data =airport;
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

async function getAirports(request,response){
    try{
    const airports= await AirportService.getAirports();
    //console.log('airplanes in controller>>',airplanes);
    SuccesResponse.data = airports;

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

async function getAirport(request,response){
    try{
        //If we have to access one parameter we can access like request.params.id
        const airport = await AirportService.getAirport(request.params.id);
        //console.log('airplane>>',airplane);
        SuccesResponse.data = airport;
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

/*
Request is going to be look like 
DELETE 
*/
async function destroyAirport(request,response){
    try{
        //console.log('code here');
        const airport = await AirportService.destroyAirport(request.params.id);
        //If response comes as 1 while deleting it means , the record was successfully deleted
        //If response comes as 0 then it means that resource was not able to delete
        SuccesResponse.data= airport;
        console.log('response in controller>>>>',SuccesResponse);
        return response
        .status(StatusCodes.OK)
        .json(SuccesResponse);
    }
    catch(error){
        ErrorResponse.error=error;
        return response
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

/*
Request is going to be look like 
PATCH 
*/

async function updateAirport(request,response){
    try{
        //console.log('request>>',request);
        const airport = await AirportService.updateAirport(
           request.params.id, {
             name : request.body.name,
            code: request.body.code,
            address : request.body.address,
            cityId : request.body.cityId
        });
        //console.log('airplane in up service>>',airplane);
        SuccesResponse.data=airport;
        return response
        .status(StatusCodes.OK)
        .json(SuccesResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return response
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}



module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}