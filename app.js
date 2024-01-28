const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const ApiError = require("./utils/ApiError");

const helmet = require("helmet");
const routes = require('./routes/v1');
const { authenticate } = require("passport");


const {Auth, Authorization} = require("./middleware/");


const app = express();
// set security HTTP headers \
app.use(helmet());

//parse json request body
app.use(express.json());

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//enable cors
app.use(cors());
app.options("*", cors());

//Images access public
app.use("/v1/img", routes);

//public access 
app.use("/v1", routes);

// Reroute all facilities api 
app.use("/v1/new",  routes);

// Sidebarmenus auth
app.use("/v1/api", Auth, routes);




//hotel api
app.use("/v1/ht", routes);

//hotel room
app.use("/v1/rm", routes);

//Room Category
app.use("/v1/rc",routes)

//Deals
app.use("/v1/dl",routes)


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});


module.exports = app;
