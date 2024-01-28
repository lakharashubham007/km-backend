const mongoose = require('mongoose');

const hotelFacilitiesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    facilities_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Facilities', required: true },
});

const HotelFacilities = mongoose.model('HotelFacilities', hotelFacilitiesSchema);

module.exports.HotelFacilities = HotelFacilities;
