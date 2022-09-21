const { Schema, model, Mongoose } = require('mongoose')
const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

// Schema of the User profile for mongodb

const userSchema = new Schema({
    email: {
        type: String, 
        unique: true, 
        trim: true, 
        lowercase: true},

    password: {
        type: String, 
        minlength: 8, 
        trim: true},
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("user", userSchema)