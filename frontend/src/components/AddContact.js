import React, { Component } from 'react'
import { useState, useEffect, useHistory } from 'react'
import axios from 'axios'


export default function AddContact() {
    //will also check for redundancies here, so if it already is there say is present
    //try to integrate email js to it
    var [email, setEmail] = useState("")
    var [firstname, setFirstName] = useState("")
    var [lastname, setLastName] = useState("")

    useEffect(() => {
        if(localStorage.getItem('uname') == null || localStorage.getItem('uemail') == null){
            //redirectPath()
            window.location.replace("/")
        }
    }, []);

    const addUserContact = async () => {
        var uname = localStorage.getItem('uname')
        var uemail = localStorage.getItem('uemail')
        if(firstname == "" || email == ""){
            alert("Please fill in your contact's email and firstname")
        }
        else{
            var contact = {uname : uname, uemail : uemail, firstname : firstname, lastname : lastname, email : email}
            axios.post("http://localhost:9001/contact/add", contact)
            .then((response) => {
                console.log(response);
                if(response.data.status == 1){
                    alert("New contact saved succesfully!")
                }
                else{
                    alert("There was an issue, try again :(")
                }
            })
        } 
    }



    return (
        <div>
            <h1>Welcome {localStorage.getItem('uname')}</h1>
            <h1>Add a new contact here!</h1>
            <br></br>
            <br></br>
            <h3>Enter the details of your contact</h3>
            First Name : <input value={firstname} onChange={e => setFirstName(e.target.value)} type="text"/>
            <br></br>
            Last Name : <input value={lastname} onChange={e => setLastName(e.target.value)} type="text"/>
            <br></br>
            Email : <input value={email} onChange={e => setEmail(e.target.value)} type="text"/>
            <br></br>
            <br></br>
            <button onClick={addUserContact}>Add</button>
        </div>
    )
}
