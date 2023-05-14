const { Logger } = require('../config');


class CrudRepository{

    constructor(model){
        this.model=model;
    }

    //for creating a model  
    async create(data){
            const response = await this.model.create(data);
            return response; 
    }

    //For deleting a model 
    async delete(data){
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            }
            );
            return response; 
    }

    //for selecting a single unique query
    async get(data){
            const response = await this.model.findByPk(data);
            return response; 
    }

    //for selecting a list of records
    async getAll(){
            const response = await this.model.findAll();
            return response; 
    }

    //for updating a set of records in our database
    async update(id, data){
            const response = await this.model.update(data , {
                where : {
                    id : id
                }
            })
    }

    

}

module.exports = CrudRepository;