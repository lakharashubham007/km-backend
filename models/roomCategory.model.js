const mongoose = require("mongoose");

const roomCategorySchema = new mongoose.Schema({

    category: { type: String, },

});

const RoomCategory = mongoose.model("RoomCategory", roomCategorySchema);

module.exports.RoomCategory = RoomCategory;
