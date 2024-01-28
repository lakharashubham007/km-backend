const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
// const bcrypt = require("bcrypt");


/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *    
 *   
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * 
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */

const createUser = async (userBody) => {
  console.log("userBody",userBody)
    if (await User.isEmailTaken(userBody.email)) {
       throw new ApiError(httpStatus.OK, "Email already taken");
     } else {
       const hashedPassword = await bcrypt.hash(userBody.password, 10);
       const newUser = await User.create({
         ...userBody,
         password: hashedPassword,
       });
       console.log("newUser",newUser);
     return newUser;
 }
 }

 /**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
 const getUserByEmail = async (email) => {
  return await User.findOne({email: email});
}
 
const getUserByToken = async (remembertoken) => {
   return await User.findOne({remembertoken: remembertoken});
}
 
 module.exports ={  createUser, getUserByEmail, getUserByToken};