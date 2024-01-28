const express = require("express");
const { hotelController } = require("../../controllers");
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
    { name: 'gallery', maxCount: 10 },
    // Add more fields if needed based on the expected number of gallery images
  ]);



router.post("/add-basicinfo",hotelController.addBasicInfo);
router.patch("/add-locationinfo/:hotelId",hotelController.addLocationInfo);
router.patch("/add-media/:hotelId", upload, hotelController.addMedia);
router.patch("/add-propertyrulesinfo/:hotelId",hotelController.addPropertyRules);
router.patch("/addfacilities/:hotelId", hotelController.addFacilities);
router.get("/get-hotels", hotelController.getHotels);








router.post("/createHotel", hotelController.createHotel);
router.put("/updateHotel", hotelController.createHotel);
router.delete("/deleteHotel", hotelController.createHotel);
router.get("/getHotel", hotelController.createHotel);
router.get("/getHotelList", hotelController.createHotel);

module.exports = router;



// router.post("/createHotel", (req, res) => {
//   res.send({ message: "Hotel created" });
// });


// router.get("/add-basicinfo",(req, res) => {
//       res.send({ message: "Hotel created" });
//     });