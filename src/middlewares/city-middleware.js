const { StatusCodes }= require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


function validateRequest(request,response,next){
    if(!request.body.name){
        ErrorResponse.message = 'Something went wrong while creating the city object';
        ErrorResponse.error = new AppError({'Explanation' : 'City name was not present in Incoming Request'},StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateRequest
}