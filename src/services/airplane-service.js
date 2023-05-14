//we can write class based syntax here also, but for timebeing we are writing function based
const { StatusCodes } =  require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepository =new AirplaneRepository();

async function createAirplane(data){
    try{
            const airplane = await airplaneRepository.create(data);
            return airplane;
    }catch(error){
        console.log(error);
        //Now there are multiple types of error, so to make consistency we will throw a App Error
        if(error.name == 'TypeError'){
            throw new AppError( 'Something went wrong while creating Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
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

async function getAirplanes(){
    try{
        const airplanes = await airplaneRepository.getAll();
        //console.log('airplanes>>',airplanes);
        return airplanes;
    }
    catch(error){
        //Now since here there is no validation so the error possible here is that we will not be able to connect to DB
        throw new AppError('Can not fetch data of all airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAirplane(id){
    try{
    const airplane = await airplaneRepository.get(id);
    //console.log('airplane>>',airplane);
    return airplane;
    }
    catch(error){
        //console.log('code here');
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The Airplane You requested is not found', error.statusCode);
        }

        //Here also there is no validation on the data , since it is a get request so possible error is we are unable to find that
        //record or we are not able to connect to DB
        throw new AppError('Can not fetch data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function destroyAirplane(id){
    try{
        const response = await airplaneRepository.delete(id);
        console.log('response in service>',response);
        return response;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            console.log('code inside custom error');
            throw new AppError('The Airplane you requested to delete is not found', error.statusCode);
        }
        console.log('error>>',error);
        throw new AppError('Can not fetch data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
} 

module.exports ={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}