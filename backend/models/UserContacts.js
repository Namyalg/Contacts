const mongoose = require('mongoose')

//this is going to be the structure of th data stored in our collection

//each document will look like this
const UserContacts = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    contact : {
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String
        },
        email : { 
            type : String,
            required : true
        }
    }
    
}, {timestamps : true})

//name and the model it needs to use
module.exports = mongoose.model('UserContacts', UserContacts)