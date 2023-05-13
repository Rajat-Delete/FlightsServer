const { Logger } = require('../config');


class CrudRepository{

    constructor(model){
        this.model=model;
    }

    //for creating a model  
    async create(data){
        try{
            const response = await this.model.create(data);
            return response; 
        }
        catch(error){
            Logger.error('Some went wrong in the crud repo : create function');
            throw error;
        }
    }

    //For deleting a model 
    async delete(data){
        try{
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            }
            );
            return response; 
        }
        catch(error){
            Logger.error('Some went wrong in the crud repo : delete function');
            throw error;
        }
    }

    //for selecting a single unique query
    async get(data){
        try{
            const response = await this.model.findByPk(data);
            return response; 
        }
        catch(error){
            Logger.error('Some went wrong in the crud repo : get function');
            throw error;
        }
    }

    //for selecting a list of records
    async getAll(){
        try{
            const response = await this.model.findAll();
            return response; 
        }
        catch(error){
            Logger.error('Some went wrong in the crud repo : getAll function');
            throw error;
        }
    }

    //for updating a set of records in our database
    async update(id, data){
        try{
            const response = await this.model.update(data , {
                where : {
                    id : id
                }
            })
        }
        catch(error){
            Logger.error('Something went wrong in the crud repo: update function');
            throw error;
        }
    }

    

}

module.exports = CrudRepository;