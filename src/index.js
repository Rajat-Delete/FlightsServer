//const {ServerConfig} = require('./config'); //This is special syntax in JSX.It is used to evaluate JS expression during complilation
const express = require('express');

const apiroutes = require('./routes')
const { ServerConfig, Logger } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api', apiroutes);


app.listen(ServerConfig.PORT, async (req,res) =>{
    console.log(`App is running on the port no: ${ServerConfig.PORT}`);
    Logger.info("Successfully Started the Server",{})

    //bad code alert
    const { Airport , City } = require('./models');

    //await City.create({name : 'Gujrat'});
    const gujrat = await City.findByPk(13);
    console.log(gujrat);
    const airportsInGujrat = await gujrat.getAirports();
    console.log(airportsInGujrat);
    //await gujrat.createAirport({name : 'Rajkot Airport' , code : 'GUJ'});
    //await gujrat.createAirport({name : 'Ahmedabad Airport', code : 'AMD'})

    //const city = await City.findByPk(4);
    //console.log(city);
    //await city.createAirport({ name : 'Hubbali Airport' , code : 'HBA' });

    // await City.destroy({
    //     where : {
    //         id : 4
    //     }
    // });

})








