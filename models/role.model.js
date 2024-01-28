const mongoose = require("mongoose");


const roleSchema = new mongoose.Schema({
  // role_id: {
  //   type: Number,
  //   required: true
  // },
  role_name: {
    type: String,
    required: true
  },
  description: String,
  sidebarMenus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SidebarMenus",
    required: true
  }],
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
    required: true
  }],
  key: String
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});
const Role = mongoose.model("Role", roleSchema);

module.exports.Role = Role;