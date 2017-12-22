var mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
var dburl  = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl, {useMongoClient :  true});

mongoose.connection.on('connected', () => {
    console.log("Mongoose connected to "+ dburl);
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose disconnected to "+ dburl);
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose connection error "+ err);
});

// ctrl + c termination event listener
process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log("Mongoose disconnected through app termination (SIGINT)");
        process.exit(0);
    });
});

// Heroku like service termination event listener
process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log("Mongoose disconnected through app termination (SIGTERM)");
        process.exit(0);
    });
});

// 'nodemon' termination event listener
process.once('SIGUSR2', () => {
    mongoose.connection.close( () => {
        console.log("Mongoose disconnected through app termination (SIGUSR2)");
        process.kill(process.pid, 'SIGUSR2');
    });
});

// BRING IN SCHEMAS AND MODELS
require('./hotels.model.js');
