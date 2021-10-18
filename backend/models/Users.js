/* 
    This file consists of the schema for each user
    On creation a mongo db document with this schema is created
    On addition of contacts the contacts array is populated

*/

const mongoose = require('mongoose')

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