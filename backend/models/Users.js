const mongoose = require('mongoose')


//this is going to be the structure of th data stored in our collection

//each document will look like this
const Users = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : { 
        type : String,
        required : true
    },
    contacts : [
        {
            firstname : {
                type : String,
                required : true
            },
            lastname : {
                type : String,
            },
            email : {
                type : String,
                required : true
            }
        }
    ]
}, {timestamp : true})

//name and the model it needs to use
module.exports = mongoose.model('users', Users)