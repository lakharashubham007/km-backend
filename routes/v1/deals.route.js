const express = require("express");
const router = express.Router();
const { dealsController } = require("../../controllers");



router.post("/add-deals",  dealsController.addDeals);
router.get("/get-deals", dealsController.getDeals );


module.exports = router;
