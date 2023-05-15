const { StatusCodes } =  require('http-status-codes');


const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


function validateRequest(request, response, next){
    if(!request.body.modelNumber){
        ErrorResponse.message = 'Something Went Wrong while creating Airplane';
        ErrorResponse.error = new AppError({'Explanation': 'Airplane modelNumber was not found in Incoming Request'}, StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
        
    }
    if(!request.body.capacity){
        ErrorResponse.message ='Something went wrong while creating airplane';
        ErrorResponse.error = new AppError('Explanation : Airplane capacity was not found in incoming request', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();

}

module.exports = {
    validateRequest
}