import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap'

export default function NewUser(props) {
    var [email, setEmail] = useState("")
    var [name, setName] = useState("")

    const addUser = async () => {
        if(name === "" || email === ""){
            alert("Please fill in your name and email!")
            window.location.reload();
        }
        else{
            const newuser = { name : name, email : email };
            axios.post('http://localhost:9001/user', newuser)
            .then(response => {
                if(response.data.status === 1){
                    alert("Succesful sign up! Go ahead and save your contacts!")
                    localStorage.setItem('uname', name)
                    localStorage.setItem('uemail', email)
                    window.location.replace("/add")
                }
                else{
                    alert("An error occured, try again :(")
                }
            });
        }
    }

    return (
        // <div>
        //     <div style={{textAlign : "center"}}>
        //         <h1>Create a document for yourself</h1>
        //         Name : <input value={name} onChange={e => setName(e.target.value)} type="text"/>
        //         <br></br>
        //         Email : <input value={email} onChange={e => setEmail(e.target.value)} type="text"/>
        //         <br></br>
        //         <br></br>
        //         <button onClick={addUser}>Create an account</button>
        //     </div>
        // </div>
        <div>
            <div style={{textAlign : "center"}}>
                <Card style={{backgroundColor:"#e6f3f5"}}>
                    <Form>
                        <br></br>
                        <h2>SIGN-UP</h2>
                        <Form.Group className="mb-3">
                            <Form.Control defaultValue="#563d7c" style={{width : '50%', margin : 'auto'}} size="lg" type="text" placeholder="Enter Your Name" value={name} onChange={e => setName(e.target.value)}/>
                            <br></br>
                            <Form.Control style={{width : '50%', margin : 'auto'}} size="lg" type="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)}/>
                            <br></br>
                            <Button variant="outline-dark" className="mb-2" onClick={addUser}>Create An account</Button>
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
