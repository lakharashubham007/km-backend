const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/database")
let server=config.port;

//updated
//Connect With DataBase
connectDB();

//Entry Point
app.listen(server,()=>console.log("Listening at PORT:",server));