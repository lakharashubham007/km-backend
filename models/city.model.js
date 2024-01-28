const mongoose = require("mongoose");

// City Schema
const citySchema = new mongoose.Schema({
  city_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  state_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true,
  },
});

const City = mongoose.model("City", citySchema);

module.exports.City = City;
