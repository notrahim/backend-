const { Schema, model, Mongoose } = require('mongoose')
const mongoose = require("mongoose")

const formaliteSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true, 
        required: true
    },
    companytype: {
        type: Array,
    },
    documents: {
        type: Array,
        lowercase: true,
        trim: true,
        required: true
    },
    exId: {
        type: String,
        required: true
    },
    mentionsPV: {
        type: Array,
        lowercase: true,
    },
    attestation: {
        type: Array,
        lowercase: true, 
        trim: true,
    },
    form: {
        type: String,
        enum: ['M0-SAS', 'M0-SARL', 'M0-SC', 'M2', 'M3', 'M4'],
    },
    fields: {
        type: Array
    },
    popups: {
        type: Array
    }
    },

) 

module.exports = mongoose.model('formalite', formaliteSchema)