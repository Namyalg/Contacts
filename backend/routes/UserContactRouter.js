const { response } = require('express')
const express = require('express')
const router = express.Router()
const user = require('../models/Users') 

//its about which schema you are using

router.get("/", async (req, res) => {
    try{
        var allUsers = await user.find()
        console.log(allUsers)
        res.status(200).json({message : allUsers})
    }
    catch(err){
        res.status(400).json({message : err})
    }
})

router.post("/add", async (req, res) => {
    console.log(req.body);
    //res.json({message : req.body})
    var allUsers = await user.find()
    var check;
    for(obj of allUsers){
        if(obj.name == req.body.uname && obj.email == req.body.uemail){
            var allContacts = obj.contacts
            var newContact = {firstname : req.body.firstname, lastname : req.body.lastname, email : req.body.email}
            allContacts.push(newContact)
            user.findOneAndUpdate({_id : obj._id}, {contacts : allContacts}, {upsert : false}, function(err, res){
                console.log(err, res);
                console.log(res._id, obj._id)
                check = res.matchedCount
                if(res._id == obj._id){
                    console.log("the correct one is matched")  
                }
            })
        }
    }
    res.json({status : 1})
})

module.exports = router
