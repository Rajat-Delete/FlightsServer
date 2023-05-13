const { createLogger, format, transports }= require('winston');
const { combine, timestamp, label, printf }= format;

const customFormat = printf( ( {level, message, timestamp} )=>{
      return `${timestamp} : ${level} : ${message}`;
})

const logger = createLogger({
    format: combine(
        timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),
        customFormat
    ), 
    transports: [
        new transports.Console(),
        new transports.File({filename: 'combined.log'})

    ],
});
//The technical point to understand here is that transports basically transports our logs in combined logs file.
module.exports = logger