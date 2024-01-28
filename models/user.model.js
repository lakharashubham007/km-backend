const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role", // Reference to the Role collection
      required: true,
    },
    userType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserType",
      
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phonenumber: {
      type: String,
      match: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    },
    firebasetoken: String,
    remembertoken: String,
    socialmediaUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialMediaUser",
    },
    profile_picture: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: "Invalid URL for profile picture",
      },
    },
    last_login: Date,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } //Create createdAt and updatedAt fields automatically
);

/**
 * Hash the user's password before saving.
 * This middleware is triggered before saving a user document.
 * If the password field has been modified, it hashes the password using bcrypt with a cost factor of 10.
 * The hashed password is then updated in the user document.
 *
 * @param {Function} next - Callback to continue with the save operation.
 * @returns {Promise<void>} - Promise that resolves after hashing the password.
 * @throws {Error} - Throws an error if an issue occurs during the password hashing process.
 */

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

/**
 * Compare a candidate password with the stored hashed password during login.
 * Returns true if the passwords match, and false otherwise.
 * If an error occurs during the comparison, it returns false.
 *
 * @param {string} candidatePassword - The candidate password to compare.
 * @returns {Promise<boolean>} - Promise that resolves with the result of the password comparison.
 */
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     const match = await bcrypt.compare(candidatePassword, this.password);
//     return match;
//   } catch (error) {
//     return false;
//   }
// };

// Implement the isEmailTaken() static method
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};


const User = mongoose.model("User", userSchema);

module.exports.User = User;
