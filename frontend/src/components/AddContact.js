import React, { Component } from 'react'
import { useState, useEffect, useHistory } from 'react'
import axios from 'axios'
import Navigation from './Navigation'
import background from '../assets/back.png'
import {AiFillDelete, AiTwotoneMail} from 'react-icons/ai'
import {Form, Button} from 'react-bootstrap'
const backend = process.env.REACT_APP_BACKEND


export default function AddContact() {
    var [email, setEmail] = useState("")
    var [firstname, setFirstName] = useState("")
    var [lastname, setLastName] = useState("")

    useEffect(() => {
        if(localStorage.getItem('uname')  === "" || localStorage.getItem('uemail')  === ""){
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
            var URL = backend + "contact/add"
            //axios.post("http://localhost:9001/contact/add", contact)
            axios.post(URL, contact)
            .then((response) => {
                console.log(response);
                if(response.data.status == 1){
                    alert("New contact saved succesfully!")
                    window.location.reload()
                }
                else{
                    alert("There was an issue, try again :(")
                }
            })
        } 
    }

    const backdrop = {
        backgroundImage: `url(${background})`,
        width:'100%',
        height : '650px',
        backgroundRepeat: 'no-repeat',
        overflow : 'hidden',
        margin : 'auto'
    }

    return (
         <div style={backdrop}>
            <Navigation/>
            <br></br>
            <br></br>
            <h1>Add a new contact here <AiTwotoneMail size={60} style={{paddingLeft : '20px'}}/></h1>
            <br></br>
            <h3>Enter the details of your contact</h3>
            <br></br>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control style={{width : '50%', margin : 'auto'}} size="lg" type="text" placeholder="Enter First Name" value={firstname} onChange={e => setFirstName(e.target.value)}/>
                    <br></br>
                    <br></br>
                    <Form.Control style={{width : '50%', margin : 'auto'}} size="lg" type="text" placeholder="Enter Last Name" value={lastname} onChange={e => setLastName(e.target.value)}/>
                    <br></br>
                    <br></br>
                    <Form.Control style={{width : '50%', margin : 'auto'}} size="lg" type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <br></br>
                    <br></br>
                    <Button variant="outline-dark" className="mb-2" onClick={addUserContact}>Add Contact</Button>
                </Form.Group>
            </Form>
        </div>
    )
}
