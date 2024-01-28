const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tag: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  classStatus: { type: String, required: true },
  releaseStatus: {
    type: String,
    // enum: ["Published", "NotPublished", "Awaiting", "Archived"],
    required: true,
  },
  hotelCategory: { type: String, },
  description: { type: String,  },
  address: { type: String, },
  country: { type: String,  },
  state: { type: String,  },
  city: { type: String,},
  zipcode: { type: String,  },
  latitude: { type: Number,  },
  longitude: { type: Number,  },
  thumbnail: { type: String }, // Assuming you store the file path for the thumbnail
  gallery: [
    {
      type: String, // Assuming you store the file paths for the gallery images
    },
  ],
  checkintime: {
    type: String, // Assuming you want to store it as a string
  },
  checkouttime: {
    type: String, // Assuming you want to store it as a string
  },
  paymentPolicy: {
    type: String,
  },
  ageRestriction: {
    type: String,
  },
  petsRules: {
    type: String,
  },
  childRules: {
    type: String,
  },
  paymentMethods: [
    {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  facilities: [
    {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports.Hotel = Hotel;

// const mongoose = require('mongoose');

// const hotelSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   brand: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, required: true },
//   zip_code: { type: String, required: true },
//   contact_email: { type: String, required: true },
//   contact_phone: { type: String, required: true },
//   lat: { type: Number, required: true },
//   lng: { type: Number, required: true },
//   rating: { type: Number, min: 1, max: 5 },
//   class: { type: String, required: true },
//   hotel_category: { type: [String], required: true },
//   rank: { type: Number },
//   images: { type: [String], default: [] },
//   check_in_time: { type: String, required: true },
//   check_out_time: { type: String, required: true },
//   description: { type: String, required: true },
//   facilities: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Facilities' }], default: [] },
//   deals: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deals' }], default: [] },
//   paypal_email: { type: String },
//   website: { type: String },
//   status: { type: String, enum: ['Release', 'Published', 'Not published', 'Awaiting', 'Archived'], default: 'Not published' },
//   created_at: { type: Date, default: Date.now },
//   created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   is_active: { type: Boolean, default: true },
//   updated_at: { type: Date },
//   updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// });

// const Hotel = mongoose.model('Hotel', hotelSchema);

// module.exports.Hotel = Hotel;
