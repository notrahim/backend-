const { Schema, model, Mongoose } = require('mongoose')
const mongoose = require("mongoose")

// Schema of the Task element for mongodb

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("task", taskSchema)