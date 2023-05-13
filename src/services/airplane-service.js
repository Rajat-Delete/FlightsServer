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

module.exports ={
    createAirplane
}