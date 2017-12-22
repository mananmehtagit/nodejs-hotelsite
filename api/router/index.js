var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

// Hotels Routes
router.get('/hotels', ctrlHotels.getAllHotels);
router.get('/hotels/:hotelId', ctrlHotels.getOneHotel);
router.post('/hotel/new', ctrlHotels.addNewHotel);

// Reivews Routes
router.get('/hotels/:hotelId/reviews', ctrlReviews.getAllReviews);
router.get('/hotels/:hotelId/reviews/:reviewId', ctrlReviews.getOneReview);

module.exports = router;
