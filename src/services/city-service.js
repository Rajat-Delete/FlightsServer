const { CityRepository } = require("../repositories")
const { StatusCodes } = require('http-status-codes');
const AppError = require("../utils/errors/app-error");

const cityRepository =  new CityRepository();

async function createCity(data){
    try{
        const city = await cityRepository.create(data);
        return city;
    }
    catch(error){
        console.log(error);
        if(error.name == 'TypeError'){
            throw new AppError('Something went wrong while creating the city object', StatusCodes.INTERNAL_SERVER_ERROR);
        }

        //code added for validating the city and unique constraint for city
        if(error.name == 'SequelizeValidationError' ||error.name == 'SequelizeUniqueConstraintError'){
            let explanation =[];
            error.errors.forEach(element => {
                explanation.push(element.message);
            });

            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw error;
    }
}

async function deleteCity(data){
    try{
        const city = await cityRepository.delete(data);
        return city;
    }
    catch(error){
        //so the possible scenario is that we are not able to find the resource or not connect to DB
        throw new AppError('Can not find the data of the City', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createCity,
    deleteCity
}