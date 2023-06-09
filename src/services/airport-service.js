//we can write class based syntax here also, but for timebeing we are writing function based
const { StatusCodes } =  require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepository =new AirportRepository();

async function createAirport(data){
    try{
            const airport = await airportRepository.create(data);
            return airport;
    }catch(error){
        console.log(error);
        //Now there are multiple types of error, so to make consistency we will throw a App Error
        if(error.name == 'TypeError'){
            throw new AppError( 'Something went wrong while creating Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
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

async function getAirports(){
    try{
        const airports = await airportRepository.getAll();
        //console.log('airplanes>>',airplanes);
        return airports;
    }
    catch(error){
        //Now since here there is no validation so the error possible here is that we will not be able to connect to DB
        throw new AppError('Can not fetch data of all airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAirport(id){
    try{
    const airport = await airportRepository.get(id);
    //console.log('airplane>>',airplane);
    return airport;
    }
    catch(error){
        //console.log('code here');
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The Airport You requested is not found', error.statusCode);
        }

        //Here also there is no validation on the data , since it is a get request so possible error is we are unable to find that
        //record or we are not able to connect to DB
        throw new AppError('Can not fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function destroyAirport(id){
    try{
        const response = await airportRepository.delete(id);
        console.log('response in destroyAirport service>',response);
        return response;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
           // console.log('code inside custom error');
            throw new AppError('The Airport you requested to delete is not found', error.statusCode);
        }
        console.log('error>>',error);
        throw new AppError('Can not fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
} 

async function updateAirport(id, data){
    try{
        console.log('data>>',data);
        console.log('id>>', id);
        const airport = await airportRepository.update(id,data);
        console.log('airport in service>>',airport);
        return airport;
    }
    catch(error){
        if(error.statusCode ==  StatusCodes.NOT_FOUND){
            console.log('code inside update');
            throw new AppError('The Airport you reuested to udpate is not found',error.statusCode);
        }
        //this error should be thrown for server side issue like DB not connecting and other scenario
        throw new AppError('Can not able to fetch the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports ={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}