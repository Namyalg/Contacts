import React from 'react'
import { useState } from 'react'
import axios from 'axios'

//here only a post request is made to the database, need to cross check once


export default function NewUser(props) {
    var [email, setEmail] = useState("")
    var [name, setName] = useState("")

    const nextPath = (path) => {
        props.history.push(path)
    }

    const addUser = async () => {
        console.log(name)
        console.log(email)
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
                    window.location.replace("/add")
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
                <h1>Create a document for yourself</h1>
                Name : <input value={name} onChange={e => setName(e.target.value)} type="text"/>
                <br></br>
                Email : <input value={email} onChange={e => setEmail(e.target.value)} type="text"/>
                <br></br>
                <br></br>
                <button onClick={addUser}>Create an account</button>
            </div>
        </div>
    )
}
