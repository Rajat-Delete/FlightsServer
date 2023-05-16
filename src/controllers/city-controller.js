const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { SuccesResponse, ErrorResponse } = require('../utils/common');

async function createCity(request,response){
    try{
        const city = await CityService.createCity({
            name : request.body.name
        });
        SuccesResponse.data=city;
        return response
        .status(StatusCodes.CREATED)
        .json(SuccesResponse);

    }
    catch(error){
        ErrorResponse.error = error;
        return response
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function deleteCity(request,response){
    try{
        const city = await CityService.deleteCity(request.params.id);
        //console.log('code here >>',city);
        //If data is coming while deleting the resource then we are passing that data in our success response so that it can 
        //be displayed to frontend user
        SuccesResponse.data = city;
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

async function updateCity(request, response){
    try{
        const city = await CityService.updateCity(request.params.id, {
            name : request.body.name
        });
        SuccesResponse.data = city;
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

module.exports ={
    createCity,
    deleteCity,
    updateCity
}