const express = require("express");
const authRoute = require("./auth.route");
const hotelRoute = require("./hotel.route");
const adminauthRoute = require('./adminAuth.route');
const facilityRoute = require('./facility.route');
const imageRoute = require('./images.route');
const roomsRoute = require('./room.route');
const roomcategoryRoute = require('./roomCategory.route');
const dealsRoute = require('./deals.route');
const router = express.Router();




//Task: Reroute all API requests beginning with the `/v2` route to Express router in auth.route.js
router.use("/auth", authRoute);
router.use("/hotels", hotelRoute);
router.use("/admin/auth", adminauthRoute);
router.use("/facility", facilityRoute);
router.use("/get-Images", imageRoute);
router.use("/rooms", roomsRoute)
router.use("/roomcategory", roomcategoryRoute)
router.use("/deals", dealsRoute)

module.exports = router;