var hotelData = require('../data/hotel-data.json');
var dbconnection = require('../data/mongodbconnection.js');
var ObjectId = require('mongodb').ObjectId;

module.exports = {

    getAllHotels : (req, res) => {

        let db = dbconnection.getConn();
        let collection = db.collection('hotels');

        let offset = 0;
        let count  = 5;

        if(req.query && req.query.offset){
            offset = parseInt(req.query.offset, 10);
        }
        if(req.query && req.query.count){
            count = parseInt(req.query.count, 10);
        }
        collection.find().skip(offset).limit(count).toArray((err, docs) => {
            // console.log("Found Hotels", docs);
            res.status(200);
            res.json(docs);
        });

        console.log('GET /hotels db');
        console.log('GET /hotels');
        console.log('GET /hotel query',req.query);

    },

    getOneHotel : (req, res) => {
        let db = dbconnection.getConn();
        let collection = db.collection('hotels');

        let hotelId  = req.params.hotelId;
        console.log('GET /oneHotel', hotelId);

        collection.findOne({
            _id : ObjectId(hotelId)
        }, (err, doc) =>{
            res.status(200);
            res.json(doc);
        });

    },

    addNewHotel : (req, res) => {
        let db = dbconnection.getConn();
        let collection = db.collection('hotels');
        let newHotel;

        console.log("POST /hotel/new");

        if(req.body && req.body.name && req.body.stars){

            newHotel = req.body;
            newHotel.stars = parseInt(req.body.stars, 10);

            console.log("POST /hotel body", newHotel);

            collection.insertOne(newHotel, (err, response) =>{
                console.log(response.ops);
                res.status(201);
                res.json(response.ops);
            });
        }else {
            console.log("Data missing from Body");
            res.status(400);
            res.json({ message: "Required data missing from body"});
        }
    }

};
