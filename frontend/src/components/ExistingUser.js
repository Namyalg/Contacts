/* 
    This file handles verification of an existing user at the route /user/login
*/

import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap'
const backend = process.env.REACT_APP_BACKEND

export default function ExistingUser(props) {
    var [email, setEmail] = useState("")
    var [name, setName] = useState("")
    const history = useHistory();
    
    const redirectPath = () => {
        history.push("/add");
    }

    const verifyUser = async () => {
        if(name === "" || email === ""){
            alert("Please fill in your name and email!")
        }
        else{
            const newuser = { name : name, email : email };
            var URL = backend + "user/login"
            axios.post(URL, newuser)
            .then(response => {
                console.log(response.data);
                if(response.data.status === 1){
                    localStorage.setItem('uname', name)
                    localStorage.setItem('uemail', email)
                    alert("Succesful login! Welcome back!")
                    redirectPath()
                }
                else{
                    alert("An error occured, enter the correct details :(")
                }
            });
        }
    }

    return (
        <div>
            <div style={{textAlign : "center"}}>
                <Card style={{backgroundColor:"#e6f3f5"}}>
                    <Form>
                        <br></br>
                        <h2>LOGIN</h2>
                        <Form.Group className="mb-3">
                            <Form.Control defaultValue="#563d7c" style={{width : '50%', margin : 'auto'}} size="lg" type="text" placeholder="Enter Your Name" value={name} onChange={e => setName(e.target.value)}/>
                            <br></br>
                            <Form.Control style={{width : '50%', margin : 'auto'}} size="lg" type="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)}/>
                            <br></br>
                            <Button variant="outline-dark" className="mb-2" onClick={verifyUser}>Verify Credentials</Button>
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
