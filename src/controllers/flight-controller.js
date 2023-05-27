const { StatusCodes } = require('http-status-codes');


const { FlightService } = require('../services');
const { ErrorResponse, SuccesResponse } = require('../utils/common');

/*
Request is going to be look like 
POST {
    flightNumber : 'UK 808'
    airplaneId : 'a380'
    departureAirportId : 'DEL'
    arrivalAirportId : 'BLR'
    arrivalTime : '11:10:00'
    departureTime : '09:10:00'
    price : '4000'
    boardingGate : '12A'
    totalSeats : '120'
}

*/
async function createFlight(request, response){

    try{
       // console.log("request>>",request);
        const flight = await FlightService.createFlight({
            flightNumber : request.body.flightNumber,
            airplaneId: request.body.airplaneId,
            departureAirportId : request.body.departureAirportId,
            arrivalAirportId : request.body.arrivalAirportId,
            arrivalTime : request.body.arrivalTime,
            departureTime : request.body.departureTime,
            price : request.body.price,
            boardingGate : request.body.boardingGate,
            totalSeats : request.body.totalSeats
        });
        SuccesResponse.data =flight;
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

async function getAllFlights(request,response){
    try{
        const flights = await FlightService.getAllFlights(request.query);
        console.log(flights)
        SuccesResponse.data=flights;
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
    createFlight,
    getAllFlights
}