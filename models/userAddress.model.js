const mongoose = require("mongoose");

// Define UserAddress Schema
const userAddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    addressType: {
      type: String,
      enum: ["home", "office"],
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    zipcode: String,
    lat: Number,
    long: Number,
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserAddress = mongoose.model("UserAddress", userAddressSchema);

module.exports.UserAddress = UserAddress;