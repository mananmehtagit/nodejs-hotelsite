var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = (req, res) => {
    let lng =  parseFloat(req.query.lng);
    let lat =  parseFloat(req.query.lat);

    // getJSON point
    var point ={
        type : "Point",
        coordinates : [lng, lat]
    };

    var geoOptions = {
        spherical : true,
        maxDistance : 2000,
        num : 5
    };

    Hotel
        .geoNear(point, geoOptions, (err, results, stats) => {
            // console.log("Geo Results", results);
            // console.log("Geo Stats", stats);

            res.status(200);
            res.json(results);

        });
};

module.exports = {

    getAllHotels : (req, res) => {

        let offset = 0;
        let count  = 5;
        let maxCount = 10;

        if(req.query && req.query.lat && req.query.lng){
            runGeoQuery(req, res);
            return;
        }

        if(req.query && req.query.offset){
            offset = parseInt(req.query.offset, 10);
        }
        if(req.query && req.query.count){
            count = parseInt(req.query.count, 10);
        }

        if(isNaN(offset) || isNaN(count)){
            res.status(400);
            res.json({
                'message': 'If supplied in query stirng count and offset should be numbers.'
            });
            return;
        }

        if(count > maxCount){
            res.status(400);
            res.json({
                'message' : 'Count limit of ' + maxCount + ' exceeded.'
            });
            return;
        }

        Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec( (err, hotels) => {
            if(err){
                console.log("Error Finding hotels");
                res.status(500);
                res.json(err);
            }else{
                console.log('Found Hotels', hotels.length);
                res.json(hotels);
            }
        });
        console.log('GET /hotels db');
        console.log('GET /hotels');
        console.log('GET /hotel query',req.query);

    },

    getOneHotel : (req, res) => {
        // let db = dbconnection.getConn();
        // let collection = db.collection('hotels');

        let hotelId  = req.params.hotelId;
        console.log('GET /oneHotel', hotelId);

        Hotel
            .findById(hotelId)
            .exec((err, doc) => {
                let response = {
                    status : 200,
                    message : doc
                };
                if(err){
                    console.log("Error Finding hotel");
                    response.status = 500;
                    response.message = err;

                }else if (!doc) {
                    response.status = 404;
                    response.message = {'message' : "No Hotel Found"}

                }else{
                    res.status(response.status);
                    res.json(response.message);
                }
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
