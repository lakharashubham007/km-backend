const express = require("express");
const router = express.Router();
const facilityController = require("../../controllers/facility.controller");
const multer = require("multer");

//save 
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "uploads")
        },
        filename: function(req,file,cb){
            console.log(file);
            cb(null, file.originalname);
            // cb(null, file.originalname + "-" + Date.now() + ".jpg")
        }
    })
}).single("image");


router.get("/get-facilities", facilityController.getFacility);
router.post("/create-facility", upload, facilityController.createFacility);
router.patch('/update-facility/:facilityId',upload, facilityController.updateFacility);
router.delete('/delete-facility/:facilityId', facilityController.deleteFacility);




module.exports = router;








