//we can write class based syntax here also, but for timebeing we are writing function based
const { StatusCodes } =  require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/datetime-helpers');
const { Op } = require('sequelize');
const flightRepository =new FlightRepository();

async function createFlight(data){
    try{   
            //console.log('data in flight create>>',data.arrivalTime," ", data.departureTime);
            const flight = await flightRepository.create(data);
            return flight;
    }catch(error){
        console.log(error);
        //Now there are multiple types of error, so to make consistency we will throw a App Error
        if(error.name == 'TypeError'){
            throw new AppError( 'Something went wrong while creating flight object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        //this error was added on validation of data being send from UI
        if(error.name == 'SequelizeValidationError'){
            let explantion =[];
            error.errors.forEach(error => {
                explantion.push(error.message);
            });
            console.log('explanation',explantion);
            throw new AppError(explantion,StatusCodes.BAD_REQUEST);
        }
        throw error;
    }

}


async function getAllFlights(query){
    console.log('query>>',query);
    let customfilter={};
    let sortFilters={};
     //trips-DEL-MUM
        if(query.trips){
            [departureAirportId ,arrivalAirportId] = query.trips.split('-');
            customfilter.departureAirportId=departureAirportId;
            customfilter.arrivalAirportId = arrivalAirportId;
            //TODO a check that they are not same 
        }
    //Price between a custom range Ex : 1000-
        if(query.price){
            [minPrice, maxPrice] = query.price.split('-');
            customfilter.price = ({
                    [Op.between]: [minPrice,((maxPrice == undefined) ? 20000 : maxPrice)]
            });
            }

    //Checking for travellers ie. travellers must be less than the total seats avaialble in airplane
        if(query.travellers){
            customfilter.totalSeats = {
                [ Op.gte ] : query.travellers,
            } 
        }

    //checking for flight of a specific date
        if(query.tripDate){
            const endingTripTime = " 23:59:59"; 
            customfilter.departureTime = {
                [Op.between] : [query.tripDate, query.tripDate+endingTripTime],
            }
        }

    //checking for sorting of the array
    if(query.sort){
        const params = query.sort.split(',');
        const sortFilter = params.map((param) => param.split('_'));
        sortFilters = sortFilter;
    }
        
        console.log('custom filer>>',customfilter,sortFilters);
        try{
            const flights = await flightRepository.getAll(customfilter,sortFilters);
            //console.log(flights);
            return flights;
        }
        catch(error){
            console.log(error);
            throw new AppError('Cannot Fetch data of all flights', StatusCodes.INTERNAL_SERVER_ERROR);
        }

}


async function getFlight(id){
     try{
    const flight = await flightRepository.get(id);
    //console.log('flight>>',flight);
    return flight;
    }
    catch(error){
        //console.log('code here');
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The Flight You requested is not found', error.statusCode);
        }

        //Here also there is no validation on the data , since it is a get request so possible error is we are unable to find that
        //record or we are not able to connect to DB
        throw new AppError('Can not fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

module.exports ={
    createFlight,
    getAllFlights,
    getFlight
     
}