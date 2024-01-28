const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");
const { User } = require("../models/user.model");


/**
 * Generate jwt token
 * - Payload must contain fields
 * --- "sub": `userId` parameter
 * --- "type": `type` parameter
 *
 * - Token expiration must be set to the value of `expires` parameter
 *
 * @param {ObjectId} userId - Mongo user id
 * @param {Number} expires - Token expiration time in seconds since unix epoch
 * @param {string} type - Access token type eg: Access, Refresh
 * @param {string} [secret] - Secret key to sign the token, defaults to config.jwt.secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const Payload = {
    sub: userId,
    iat: Math.floor(Date.now / 1000),
    type: type,
    exp: expires
  }
  return jwt.sign(Payload, secret)
};

/*
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const Payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    type: type, 
    exp: expires}
  return jwt.sign(Payload, secret);
};

*/

/**
 * Generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 * @param {User} user
 * @returns {Promise<Object>}
 *
 * Example response:
 * "access": {
 *          "token": "eyJhbGciOiJIUzI1NiIs...",
 *          "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
const generateAuthTokens = async (user) => {
  
  const accessTokenExpires = Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  await User.updateOne(
    { _id: user._id },
    { $set: { remembertoken: accessToken } }
  );


  // Retrieve the updated user document
  const updatedUser = await User.findById(user._id);


  return {
    token: accessToken,
    expires: new Date(accessTokenExpires * 1000),
    user: updatedUser
};
}
/**
 
  const accessTokenExpires = Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;
  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );
  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires * 1000),
    }
  }



 */

module.exports = {
  generateToken,
  generateAuthTokens,
};