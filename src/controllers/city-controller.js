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

module.exports ={
    createCity
}