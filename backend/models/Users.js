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
    }
    // contact : {
    //     firstName : {
    //         type : String,
    //     },
    //     lastName : {
    //         type : String
    //     },
    //     email : { 
    //         type : String,
    //     }
    // }
}, {timestamp : true})

//name and the model it needs to use
module.exports = mongoose.model('users', Users)