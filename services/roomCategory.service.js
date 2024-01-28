
const { RoomCategory } = require("../models");

const createRoomCategory = async (roomCategoryData) => {
  try {
    const roomCategory = await RoomCategory.create({ ...roomCategoryData });
    return { message: "Room category Added successfully", roomCategory };
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

const getRoomCategory = async () => {
  try {
    const category = await RoomCategory.find();
    return category;
  } catch (error) {
    console.error("Error getting Category :", error);
    throw error;
  }
};


module.exports = {
    createRoomCategory,
    getRoomCategory
};