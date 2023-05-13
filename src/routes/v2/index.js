const express = require('express');

const router = express.Router();

router.get('/info', (request,response)=>{
    response.json({
        "msg" : "We are now coming from v2 routes",
        "Success" : "True" 
    });
})

module.exports = router;