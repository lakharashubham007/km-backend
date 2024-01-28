const mongoose = require("mongoose");

const dealsSchema = new mongoose.Schema({
  name: { type: String },
});

const Deals = mongoose.model("Deals", dealsSchema);

module.exports.Deals = Deals;
