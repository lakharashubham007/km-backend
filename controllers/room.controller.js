

const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { roomService } = require("../services");

    const addRoom = catchAsync(async (req, res) => {
    const { hotelId } = req.params;
    const roomData = req.body;
    const thumbnail = req.files.thumbnail; 
    console.log("thumbnail  files: ", thumbnail[0].originalname);

    // Extract gallery files from req.files array
    const gallery = req.body.gallery.filter(file => file.fieldname.startsWith('gallery'));
    // const gallery = req.files.gallery.filter(file => file.fieldname.startsWith('gallery'));

    console.log("gallary request: ",gallery);
    // const thumbnail = req.files.thumbnail; // Assuming the thumbnail is a single file
        
    // Extract gallery files from req.files array
    // const gallery = req.files.gallery.filter(file => file.fieldname.startsWith('gallery'));
    // console.log("roomData in Controller file",roomData,thumbnail,gallery);
    try {
        const { message, room } = await roomService.addRoom(hotelId, roomData, thumbnail); 
        res.status(httpStatus.CREATED).json({
        success: true,
        message,
        room,
        });
    } catch (error) {
        console.error("Error in addRoom controller:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Internal Server Error",
        });
    }
    });

    const getRooms = async (req, res) => {
        try {
          const getRooms = await roomService.getRooms();
          res.json({ success: true, rooms: getRooms });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Internal Server Error" });
        }
      }

module.exports = {
  addRoom,
  getRooms
};

// const httpStatus = require("http-status");
// const catchAsync = require("../utils/catchAsync");
// const { roomService } = require("../services");


// const addRoom = catchAsync(async (req, res) => {
//   const { created, addbasicInfo } = await roomService.addRoom(req.body);
//   if (created) {
//     res.status(httpStatus.CREATED).send({ basicInfo: addbasicInfo, message: "Basic Information Saved Successfully!" });
//   } else {
//     res.status(httpStatus.OK).send({ basicInfo: addbasicInfo, message: "Existing Hotel Details!" });
//   }
// });

// module.exports = {
//     addRoom
//   };