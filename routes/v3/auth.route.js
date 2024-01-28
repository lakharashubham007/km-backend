const express = require("express");
const router = express.Router();
const validate = require('../../middleware/validate')
const authValidation = require("../../validation/auth.validation");
const authController = require("../../controllers/auth.controller");

router.post("/register", validate(authValidation.register), authController.register );
router.post("/login",validate(authValidation.login), authController.login);

module.exports = router;