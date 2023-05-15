const  CrudRepository  = require('./crud-repository');
const { Airplane } = require('../models');

class AirplaneRepository extends CrudRepository{

    constructor(){
        //console.log('inside the Airplane Repository constructor');
        super(Airplane);
    }


}
module.exports = AirplaneRepository;