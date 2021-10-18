/*
    This file is used to perform addition, updation and deletion of contacts
    A status of 1 is returned on success else 0
*/

const { response } = require('express')
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

router.post("/add", async (req, res) => {
    try{
        var allUsers = await user.find()
        var check;
        for(obj of allUsers){
            if(obj.name == req.body.uname && obj.email == req.body.uemail){
                var allContacts = obj.contacts
                var newContact = {firstname : req.body.firstname, lastname : req.body.lastname, email : req.body.email}
                allContacts.push(newContact)
                user.findOneAndUpdate({_id : obj._id}, {contacts : allContacts}, {upsert : false}, function(err, res){
                })
            }
        }
        res.json({status : 1})
    }
    catch(err){
        res.json({status : 0})
    }
})

router.get("/list/:name/:email", async (req, res) => {
    try{
        var allUsers = await user.find()
        var flag = false;
        for(obj of allUsers){
            if(obj.name == req.params.name && obj.email == req.params.email){
                flag = true
                res.json({status : 1, contacts : obj})
            }
        }
        if(!flag){
            res.json({status : 0})
        }
    }
    catch(err){
        res.send({status : 0})
    }
})

router.delete("/delete/:documentId/:contactId", async (req, res) => {
    var objId = req.params.documentId 
    var contactId = req.params.contactId 
    //pull is used to remove a document with a specified id
    user.updateOne({ _id : objId},
        { $pull: { "contacts" : { _id : contactId } } }, (err) => {
            if (err) {
                res.status(404).json({ status : 0 });
            }
            else{
                res.status(200).json({status : 1})
            }
        }
    );
})

router.put("/update", async (req, res) => {
    var objId = req.body.objId 
    var contactId = req.body.contactId
    var fname =  req.body.firstname 
    var lname = req.body.lastname 
    var email = req.body.email
    user.updateOne(
        { 'contacts._id': contactId },
        { $set:  { 'contacts.$.firstname': fname, 'contacts.$.lastname': lname, 'contacts.$.email': email }},
        (err, result) => {
          if (err) {
            res.json({ error: 'Unable to update contacts.', status : 0, message : err});
          } else {
            res.status(200)
            .json({status : 1});
          }
       }
    );
})

module.exports = router
