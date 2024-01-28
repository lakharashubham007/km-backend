const express = require("express");
const router = express.Router();




router.post("/createRole", validate(authValidation.register), checkRole, authController.register );