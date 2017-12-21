var hotelData = require('../data/hotel-data.json');
var dbconnection = require('../data/mongodbconnection.js');

module.exports = {

    getAllHotels : (req, res) => {

        let db = dbconnection.getConn();
        console.log('GET /hotels db');  
        console.log('GET /hotels');
        console.log('GET /hotel query',req.query);

        let offset = 0;
        let count  = 5;

        if(req.query && req.query.offset){
            offset = parseInt(req.query.offset, 10);
        }
        if(req.query && req.query.count){
            count = parseInt(req.query.count, 10);
        }

        var returnData = hotelData.slice(offset, offset + count);
        res.status(200);

        if(req.query.offset || req.query.count){
            res.json(returnData);
        }else{
            res.json(hotelData);
        }
    },

    getOneHotel : (req, res) => {
        let hotelId  = req.params.hotelId;
        let thisHotel = hotelData[hotelId]; // index of hotelData array
        console.log('GET /oneHotel', hotelId);

        res.status(200);
        res.json(thisHotel);
    },

    addNewHotel : (req, res) => {
        console.log("POST /hotel/new");
        console.log("POST /hotel body", req.body);

        res.status(200);
        res.json(req.body);
    }

};
