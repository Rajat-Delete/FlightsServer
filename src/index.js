//const {ServerConfig} = require('./config'); //This is special syntax in JSX.It is used to evaluate JS expression during complilation
const express = require('express');

const apiroutes = require('./routes')
const { ServerConfig, Logger } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
console.log('code here');
app.use('/api', apiroutes);
app.use('/flightsService/api' , apiroutes);


app.listen(ServerConfig.PORT, (req,res) =>{
    console.log(`App is running on the port no: ${ServerConfig.PORT}`);
    Logger.info("Successfully Started the Server",{})

    
})








