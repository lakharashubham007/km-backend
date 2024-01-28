const express = require("express")
const authRoute = require("./auth.route")
const role = require("./roleCreate.route")


const router = express.Router();




//Task: Reroute all API requests beginning with the `/v1/auth` route to Express router in auth.route.js
router.use("/auth", authRoute);

router.use("./role",role )

module.exports = router;