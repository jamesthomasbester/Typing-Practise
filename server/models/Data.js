const { Schema, model } = require('mongoose');
const mongoose  = require("mongoose")

const DataSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    data: {
        character: {
            type: String,
        },
        latency: {
            type: Number,
        },
        correct: {
            type: Number,
        },
        incorrect: {
            type: Number
        }
    }
})

const Data = model("Data", DataSchema)
module.exports = Data;