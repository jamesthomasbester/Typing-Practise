const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    github: String,
    createdAt: Date
})

module.exports = mongoose.model("User", userSchema)