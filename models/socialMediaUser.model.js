const mongoose = require('mongoose');

const socialMediaUserSchema = new mongoose.Schema({
  socialMediaId: {
    type: String,
    required: true,
    unique: true
  },
  platform: {
    type: String,
    required: true
  },
  displayName: String,
  email: String,
  profilePicture: String
});

const SocialMediaUser = mongoose.model('SocialMediaUser', socialMediaUserSchema);

module.exports.SocialMediaUser = SocialMediaUser;
