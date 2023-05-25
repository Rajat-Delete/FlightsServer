//we can write class based syntax here also, but for timebeing we are writing function based
const { StatusCodes } =  require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/datetime-helpers')

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


module.exports ={
    createFlight,
}