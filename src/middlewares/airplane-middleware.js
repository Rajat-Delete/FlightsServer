const { StatusCode } =  require('http-status-codes');

const { ErrorResponse } = require('../utils/common');

function validateRequest(request, response, next){
    if(!request.body.modelNumber){
        ErrorResponse.message = 'Something Went Wrong while creating Airplane';
        ErrorResponse.error = {'Explanation': 'Airplane modelNumber was not found in Incoming Request'};
        response
        .status(400)
        .json(ErrorResponse)
        
    }
    next();

}

module.exports = {
    validateRequest
}