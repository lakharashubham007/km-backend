const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hotel: { type: String },
  category: { type: String },
  deals: [{ type: String }],
  facilities: [{ type: String }],
  description: { type: String },
  thumbnail: { type: String },
  gallery: [{ type: String }],
  max_adults: { type: Number },
  max_children: { type: Number },
  min_people: { type: Number },
  rooms_stock: { type: Number },
  base_Price: { type: Number },
  todays_price: { type: Number },
});

const Room = mongoose.model("Room", roomSchema);

module.exports.Room = Room;
