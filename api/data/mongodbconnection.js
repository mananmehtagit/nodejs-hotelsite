var MongoClient = require ('mongodb').MongoClient;
var dburl  = 'mongodb://localhost:27017/meanhotel';
var _connection  = null;

module.exports = {

    openConn : () => {
        MongoClient.connect(dburl, (err, db) => {
            if(err){
                console.log("DB Connection failed");
                return;
            }
            _connection = db;
            console.log("DB Connection open");
        });
        //set _connection
    },

    getConn : () => {
        // console.log(_connection);
        return _connection;
    }
};
