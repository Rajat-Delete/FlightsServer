const { Sequelize } = require('sequelize');
const CrudRepository = require("./crud-repository");
const { flight , Airplane , Airport } = require('../models');

class FlightRepository extends CrudRepository{

    constructor(){
        super(flight);
    }

    async getAll(filter,sort){
        const flights = await flight.findAll({
            where : filter,
            order : sort,
            include :[{
                model : Airplane,
                required : true,
                as : 'airplaneDetail'
            },
            {
                model: Airport,
                required : true,
                as : 'departureAirport',
                on : {
                    col1 : Sequelize.where(Sequelize.col('Flight.departureAirportId') ,'=' , Sequelize.col('departureAirport.code'))
                }
            },
            {
               model: Airport,
               required : true,
                as : 'arrivalAirport',
                on:{
                    col1 : Sequelize.where(Sequelize.col('Flight.arrivalAirportId') ,'=' , Sequelize.col('arrivalAirport.code'))
                }
            }
        ]
            //order : ((sort == {}) ? sort = {[['departureTime', 'ASC']]} : sort),
        });
        console.log('flights in repo>>',flights);
        return flights;
    }
    
}

module.exports = FlightRepository;