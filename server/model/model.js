const mongoose = require("mongoose");

const RecordSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    address:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    note:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Record", RecordSchema);