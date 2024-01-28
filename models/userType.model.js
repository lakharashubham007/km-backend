const mongoose = require("mongoose");


const userTypeSchema =  new mongoose.Schema({
  userType: {
    type: String,
    required: true,
  },
});

const UserType = mongoose.model("UserType", userTypeSchema);

module.exports.UserType = UserType;
