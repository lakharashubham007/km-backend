const mongoose = require("mongoose");


const moduleSchema = new mongoose.Schema({
    module_name: {
        type: String,
        required: true
    },
});
const Module = mongoose.model("Module", moduleSchema);

module.exports.Module = Module;