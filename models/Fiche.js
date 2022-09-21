const { Schema, model, Mongoose } = require('mongoose')
const mongoose = require("mongoose")

// Schema of the User information for mongodb

const ficheSchema = new Schema({

    userId: {
        type: String,
        required: true
    },
    firstname: {
        type: String, 
        lowercase: true, 
        trim: true, 
        min: 6, 
        max: 15,
        required: true
    },
    lastname: {
        type: String, 
        lowercase: true, 
        trim: true, 
        min: 6, 
        max: 15,
        required: true
    },
    denomination: {
        type: String,
        required: true
    },
    role: {
         type: String, 
         enum: ['user', 'admin', 'superadmin'],
         // required: true
    },
    street: {
        type: String, 
        lowercase: true,
        required: true
    },
    city: {
        type: String, 
        lowercase: true,
        required: true
    },
    postal: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true 
    },
    stats: {
        immatriculations: {
            type: Number,
            default: 0
        },
        modifications: {
            type: Number,
            default: 0
        },
        radiations: {
            type: Number,
            default: 0
        },
        regularisations: {
            type: Number,
            default: 0
        }
    },
 })

module.exports = mongoose.model("fiche", ficheSchema)