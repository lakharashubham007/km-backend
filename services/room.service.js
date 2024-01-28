
const { Room } = require("../models");

const addRoom = async (hotelId, roomData ,thumbnail) => {
    console.log("roomData in service file",roomData);
  try {
    const thumbnailPath = thumbnail[0].originalname;
    const room = await Room.create({ hotel: hotelId, ...roomData , thumbnail:thumbnailPath });
    return { message: "Room added successfully", room };
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};


const getRooms = async () => {
    try {
      const rooms = await Room.find();
      return rooms;
    } catch (error) {
      console.error("Error getting  Rooms :", error);
      throw error;
    }
  };

module.exports = {
  addRoom,
  getRooms
};



// const { Room } = require("../models");

// const addRoom = async (basicInfoBody) => {
//     const { email } = basicInfoBody;
//     // Check if a hotel with the given email already exists
//     const existingHotel = await Hotel.findOne({ email });
//     if (!existingHotel) {
//       // Hotel with the given email does not exist, create a new entry
//       const newHotel = await Room.create(basicInfoBody);
//       return { created: true, addbasicInfo: newHotel };
//     } else {
//       // Hotel with the given email already exists
//       console.log(
//         "Hotel with the given email already exists. Retrieving details."
//       );
//       return { created: false, addbasicInfo: existingHotel };
//     }
//   };


// module.exports = {
//     addRoom
//   };

  

