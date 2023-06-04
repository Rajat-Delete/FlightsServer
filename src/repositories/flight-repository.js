const { Sequelize } = require('sequelize');
const CrudRepository = require("./crud-repository");
const { flight , Airplane , Airport, City } = require('../models');

const db = require('../models');
const { updateFlightSeats} =require('./queries');
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
                },
                include : {
                    model : City,
                    required : true,
                }
            },
            {
               model: Airport,
               required : true,
                as : 'arrivalAirport',
                on:{
                    col1 : Sequelize.where(Sequelize.col('Flight.arrivalAirportId') ,'=' , Sequelize.col('arrivalAirport.code'))
                },
                include : {
                    model : City,
                    required : true,
                }
            }
        ]
            //order : ((sort == {}) ? sort = {[['departureTime', 'ASC']]} : sort),
        });
        console.log('flights in repo>>',flights);
        return flights;
    }


    async updateRemainingSeats(flightId , seats , dec = true){
        
        //Putting row level lock before updating the record
        await db.sequelize.query(updateFlightSeats(flightId)); 
        
        //naming it as flightdetail as flight overlaps with model name 
        const flightdetail = await flight.findByPk(flightId);
       // console.log(typeof dec);
        if(parseInt(dec)){
            const response = await flightdetail.decrement('totalSeats' , {by : seats});
            return response;
        }else{
            const response = await flightdetail.increment('totalSeats' , {by : seats});
            return response;
        }
    }
    
}

module.exports = FlightRepository;