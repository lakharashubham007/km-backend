const express = require("express")
const authRoute = require("./auth.route")
const router = express.Router();

//Task: Reroute all API requests beginning with the `/v1/auth` route to Express router in auth.route.js
router.use("/auth", authRoute);

module.exports = router;