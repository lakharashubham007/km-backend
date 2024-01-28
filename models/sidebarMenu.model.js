const mongoose = require("mongoose");

const sidebarMenuSchema = new mongoose.Schema(
  {
  menu: {
    type: String,
    required: true
  },
  description: String,
  types: {
    enum: ['mainMenu', 'subMenu'],
   
  },
  parentMenu: {
    type: String,
  }
 
}, {
  timestamps: true
});

const SidebarMenu = mongoose.model("SidebarMenu", sidebarMenuSchema);

module.exports.SidebarMenu = SidebarMenu;
