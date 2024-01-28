const mongoose = require("mongoose");

// Country Schema
const countrySchema = new mongoose.Schema({
  country_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  shortname: {
    type: String,
    trim: true,
    uppercase: true,
  },
});

const Country = mongoose.model("Country", countrySchema);

module.exports.Country = Country;
