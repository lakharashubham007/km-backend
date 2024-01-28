const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { roomCategoryService } = require("../services");


const createRoomCategory = catchAsync(async (req, res) => {
    const  roomCatgory  = await roomCategoryService.createRoomCategory(req.body);
    res.status(httpStatus.CREATED).send({ roomCatgory: roomCatgory, message: "Room Category Saved Successfully!" });
});

const getRoomCategory = async (req, res) => {
    try {
      const roomCategory = await roomCategoryService.getRoomCategory();
      res.json({ success: true, category: roomCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }



  
  
module.exports = {
    createRoomCategory,
    getRoomCategory,
  };




  