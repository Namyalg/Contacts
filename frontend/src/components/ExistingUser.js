import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap'

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
            axios.post('http://localhost:9001/user/login', newuser)
            .then(response => {
                console.log(response.data);
                if(response.data.status === 1){
                    localStorage.setItem('uname', name)
                    localStorage.setItem('uemail', email)
                    alert("Succesful login! Welcome back!")
                    redirectPath()
                }
                else{
                    alert("An error occured, try again :(")
                }
            });
        }
        
    }

    return (
        <div>
            <div style={{textAlign : "center"}}>
            {/* <>
            <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
            <Form.Control
                type="color"
                id="exampleColorInput"
                defaultValue="#563d7c"
                title="Choose your color"
            />
            </> */}
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
                {/* <h2>Lets verify your details</h2>
                Name : <input value={name} onChange={e => setName(e.target.value)} type="text"/>
                <br></br>
                Email : <input value={email} onChange={e => setEmail(e.target.value)} type="text"/>
                <br></br>
                <br></br> */}
                {/* <button onClick={checkUser}>Verify details</button> */}
            </div>
        </div>
    )
}
