const Joi = require("joi");
const { password } = require("./custom.validation");

/**
 * Validation schema for user registration.
 */
const register = {
  body: Joi.object().keys({
    username: Joi.string().required().min(3).max(50),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    role: Joi.string().required(), // Assuming role is a string for simplicity
    password: Joi.string().required().custom(password).min(16),
    email: Joi.string().required().email(),
    phonenumber: Joi.string().pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/),
    firebasetoken: Joi.string(),
    remembertoken: Joi.string(),
    socialmediaUser: Joi.string(), // Assuming socialmediaUser is a string for simplicity
    profile_picture: Joi.string().uri(),
    // other properties...
  }),
};

/**
 * Validation schema for user login.
 */
const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
