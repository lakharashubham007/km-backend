const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  Deals: { type: String,  enum: ["50%OFF","Latest","Limited Time Deal"] },
  Facilities: { type: String,  enum: ["TV", "AC", "Desk", "Other"] },
  HotelCategory: { type: String,  },
  RoomCategory: { type: String, },
  baseprice: { type: Number, },
  description: { type: String,  },
  gallery: [
    {
      type: String, // Assuming you store the file paths for the gallery images
    },
  ],
  maxadults: { type: Number,  },
  maxchild: { type: Number,  },
  minpeople: { type: Number,  },
  stocks: { type: Number,  },
  thumbnail: { type: String }, // Assuming you store the file path for the thumbnail
  todaysprice: { type: Number,  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports.Room = Room;






// const mongoose = require("mongoose");

// const roomSchema = new mongoose.Schema({
//   deal: { type: String, required: true, enum: ["Limited Time Deal"] },
//   facilities: { type: String, required: true, enum: ["AC"] },
//   hotelCategory: { type: String, required: true },
//   roomCategory: { type: String, required: true },
//   basePrice: { type: Number, required: true },
//   description: { type: String, required: true },
//   gallery: [
//     {
//       type: String, // Assuming you store the file paths for the gallery images
//     },
//   ],
//   maxAdults: { type: Number, required: true },
//   maxChild: { type: Number, required: true },
//   minPeople: { type: Number, required: true },
//   stocks: { type: Number, required: true },
//   thumbnail: { type: String }, // Assuming you store the file path for the thumbnail
//   todaysPrice: { type: Number, required: true },
// });

// const Room = mongoose.model("Room", roomSchema);

// module.exports.Room = Room;