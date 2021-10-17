const express = require('express')
const router = express.Router()
const user = require('../models/Users') 

router.get("/", async (req, res) => {
    try{
        var allUsers = await user.find()
        res.status(200).json({message : allUsers})
    }
    catch(err){
        res.status(400).json({message : err})
    }
})

router.post("/login", async (req, res) => {
    console.log(req.body.name)
    console.log(req.body.email)

    try{
        var flag = false;
        var allUsers = await user.find()
        for(obj of allUsers){
            if(obj.name == req.body.name && obj.email == req.body.email){
                res.status(200).json({status : 1})
                flag = true
            }
        }
        if(!flag){
            res.status(200).json({status : 0})
        }
    }
    catch(err){
        res.status(400).json({message : err})
    }
})


router.post("/signin", async (req, res) => {
    var userObject = new user({
        email : req.body.email,
        name : req.body.name
    })
    try{
    userObject.save()
    .then(data => {
        res.json({status : 1})
    })
    .catch((err) => res.json({status : 0}))
    }
    catch(err){
        res.json({status : err}) 
    }
})

module.exports = router;