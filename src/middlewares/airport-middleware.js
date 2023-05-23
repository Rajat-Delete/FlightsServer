const { StatusCodes } =  require('http-status-codes');


const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


function validateRequest(request, response, next){
    console.log('code inside validate request');
    if(!request.body.name){
        ErrorResponse.message = 'Something Went Wrong while creating Airport';
        ErrorResponse.error = new AppError({'Explanation': 'Airport name was not found in Incoming Request'}, StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
        
    }
    if(!request.body.code){
        ErrorResponse.message ='Something went wrong while creating Airport';
        ErrorResponse.error = new AppError('Explanation : Airport code was not found in incoming request', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!request.body.cityId){
        ErrorResponse.message ='Something went wrong while creating cityId';
        ErrorResponse.error = new AppError('Explanation : Airport cityId was not found in incoming request', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();

}

module.exports = {
    validateRequest
}