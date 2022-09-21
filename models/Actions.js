const { Schema, model, Mongoose } = require('mongoose')
const mongoose = require("mongoose")

// Schema of the User information for mongodb

const ficheSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    formaliteName : {
        type : String,
        required : true
    },
    dateAction : {
        type : Date,
        required : true
    },
    formaliteType : {
        type : String,
        enum : ['immatriculation', 'modification', 'radiation', 'régularisation']
    },
    companyName : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    }
})
module.exports = mongoose.model("action", ficheSchema)