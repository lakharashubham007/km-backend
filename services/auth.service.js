const httpStatus = require("http-status");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");

/**
 * Login with username and password
 * - Utilize userService method to fetch user object corresponding to the email provided
 * - Use the User schema's "isPasswordMatch" method to check if input password matches the one user registered with (i.e, hash stored in MongoDB)
 * - If user doesn't exist or incorrect password,
 * throw an ApiError with "401 Unauthorized" status code and message, "Incorrect email or password"
 * - Else, return the user object
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !await user.isPasswordMatch(password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

const logoutUser = async (token) => {
  // Assuming your user model has a field called 'tokens' to store the tokens
  const user = await userService.getUserByToken(token);
  console.log(user);
  if (user) {
    // Remove the token from the user's tokens array
    user.remembertoken = '';
    // Save the updated user document
    await user.save();
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logoutUser
};