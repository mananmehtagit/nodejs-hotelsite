var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');

router.get('/hotels', ctrlHotels.getAllHotels);

router.get('/hotels/:hotelId', ctrlHotels.getOneHotel);

router.post('/hotel/new', ctrlHotels.addNewHotel);

module.exports = router;
