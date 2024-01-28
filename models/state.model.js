const mongoose = require("mongoose");

// State Schema
const stateSchema = new mongoose.Schema({
  state_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  state_name: {
    type: String,
    required: true,
    trim: true,
  },
  shortname: {
    type: String,
    trim: true,
    uppercase: true,
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
});

const State = mongoose.model("State", stateSchema);

module.exports.State = State;
