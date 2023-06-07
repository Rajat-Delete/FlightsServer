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
        
        const transaction = await db.sequelize.transaction();
        try {
             //Putting row level lock before updating the record
        await db.sequelize.query(updateFlightSeats(flightId)); 
        
        //naming it as flightdetail as flight overlaps with model name 
        const flightdetail = await flight.findByPk(flightId);
        // console.log(typeof dec , +dec);
       //console.log(typeof Boolean(dec), Boolean(dec));
       console.log(dec);
        if(+dec){
            console.log('Inside true');
            await flightdetail.decrement('totalSeats' , {by : seats});
        }else{
            console.log('Inside else');
            await flightdetail.increment('totalSeats' , {by : seats});
        }
        //If there are no errors then we are committing the updated flight details
        await transaction.commit();
        return flightdetail;
        } catch (error) {
            //we are rolling back the details if transaction has any issues.
            await transaction.rollback();
            throw error;
        }
       
    }
    
}

module.exports = FlightRepository;