const DbConfig = require("../module/DbConfig");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema;
const newSchema = new userSchema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    gender: String,

})
const moduleSchema = mongoose.model("blogusers", newSchema);

module.exports = moduleSchema;