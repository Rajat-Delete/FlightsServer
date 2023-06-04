const { StatusCodes } =  require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/datetime-helpers');


function validateRequest(request, response, next){
    console.log('code inside validate request');
    if(!request.body.flightNumber){
        ErrorResponse.message = 'Something Went Wrong while creating Flight';
        ErrorResponse.error = new AppError({'Explanation': 'Flight flightNumber was not found in Incoming Request'}, StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
        
    }
    if(!request.body.airplaneId){
        ErrorResponse.message ='Something went wrong while creating Flight';
        ErrorResponse.error = new AppError('Explanation : Flight airplaneId was not found in incoming request', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!request.body.departureAirportId){
        ErrorResponse.message ='Something went wrong while creating Flight';
        ErrorResponse.error = new AppError('Explanation : Flight departureAirportId was not found in incoming request', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!request.body.arrivalAirportId){
        ErrorResponse.message = 'Something Went Wrong while creating Flight';
        ErrorResponse.error = new AppError({'Explanation': 'Flight arrivalAirportId was not found in Incoming Request'}, StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
        
    }
    if(!request.body.arrivalTime){
        ErrorResponse.message ='Something went wrong while creating Flight';
        ErrorResponse.error = new AppError('Explanation : Flight arrivalTime was not found in incoming request', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(!request.body.departureTime){
        ErrorResponse.message ='Something went wrong while creating Flight';
        ErrorResponse.error = new AppError('Explanation : Flight departureTime was not found in incoming request', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }if(!request.body.price){
        ErrorResponse.message = 'Something Went Wrong while creating Flight';
        ErrorResponse.error = new AppError({'Explanation': 'Flight price was not found in Incoming Request'}, StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
        
    }
    if(!request.body.totalSeats){
        ErrorResponse.message ='Something went wrong while creating Flight';
        ErrorResponse.error = new AppError('Explanation : Flight totalSeats was not found in incoming request', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    if(compareTime(request.body.arrivalTime,request.body.departureTime)){
        ErrorResponse.error = 'Something went wrong while creating Flight';
        ErrorResponse.error = new AppError('Explanation : Flight arrival Time is less than Departure Time', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();

}

function validateUpdateSeatsRequest(request, response, next){
    //console.log('request>>',request);
    if(!request.body.seats){
        ErrorResponse.error = 'Something went wrong while updating Seats';
        ErrorResponse.error = new AppError('Explanation : Flight seats was not found in Incoming Request', StatusCodes.BAD_REQUEST);
        return response
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateRequest,
    validateUpdateSeatsRequest
}