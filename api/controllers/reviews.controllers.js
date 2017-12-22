var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports = {

    getAllReviews : (req, res) => {
        let hotelId  = req.params.hotelId;
        console.log('GET /oneHotel', hotelId);

        Hotel
            .findById(hotelId)
            .select('reviews')
            .exec((err, doc) => {
                // console.log('Return doc', doc);
                res.status(200);
                res.json(doc.reviews);
            });
    },

    getOneReview : (req, res) => {
        let hotelId  = req.params.hotelId;
        let reviewId  = req.params.reviewId;
        console.log('GET /oneHotel ' +'reviewId ' + reviewId + ' for HotelId '+ hotelId);

        Hotel
            .findById(hotelId)
            .select('reviews')
            .exec((err, hotel) => {
                // console.log('Return hotel', hotel);

                let review = hotel.reviews.id(reviewId);

                res.status(200);
                res.json(review);
            });
    }

};
