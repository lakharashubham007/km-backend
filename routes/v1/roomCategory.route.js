const express = require("express");
const router = express.Router();
const { roomCategoryController } = require("../../controllers");



router.post("/create-roomcategory",  roomCategoryController.createRoomCategory);
router.get("/get-roomcategory", roomCategoryController.getRoomCategory );

// router.post("/login",  authController.login);
// router.get("/sidebar-menus", sidebarMenuController.getSidebarMenus);

module.exports = router;
