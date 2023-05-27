const CrudRepository = require("./crud-repository");
const { flight } = require('../models');

class FlightRepository extends CrudRepository{

    constructor(){
        super(flight);
    }

    async getAll(filter,sort){
        const flights = await flight.findAll({
            where : filter,
            order : sort
        });
        return flights;
    }
    
}

module.exports = FlightRepository;