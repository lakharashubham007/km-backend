const express = require("express");
const { roomController } = require("../../controllers");
const router = express.Router();

const multer = require("multer");

// Save
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "images");
      },
      filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
        // cb(null, file.originalname + "-" + Date.now() + ".jpg")
      },
    }),
  }).fields([
    { name: 'thumbnail', maxCount: 1 },
    // { name: 'gallery', maxCount: 10 },
    { name: 'gallery[0]', maxCount: 10 },
    { name: 'gallery[1]', maxCount: 10 },
    { name: 'gallery[2]', maxCount: 10 },
    // Add more fields if needed based on the expected number of gallery images
  ]);



  router.post("/add-room", upload, roomController.addRoom);
  router.get("/get-rooms", roomController.getRooms);

//   router.post("/add-room/:hotelId", upload, roomController.addRoom);

  


// router.post("/add-basicinfo",hotelController.addBasicInfo);
// router.patch("/add-locationinfo/:hotelId",hotelController.addLocationInfo);
// router.patch("/add-media/:hotelId", upload, hotelController.addMedia);
// router.patch("/add-propertyrulesinfo/:hotelId",hotelController.addPropertyRules);

// router.patch("/addfacilities/:hotelId", hotelController.addFacilities);






module.exports = router;