import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function ExistingUser(props) {
    var [email, setEmail] = useState("")
    var [name, setName] = useState("")
    const history = useHistory();
    const redirectPath = () => {
        history.push("/add");
    }

    const checkUser = async () => {
        if(name === "" || email === ""){
            alert("Please fill in your name and email!")
            window.location.reload();
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
                <h1>Lets verify your details!</h1>
                Name : <input value={name} onChange={e => setName(e.target.value)} type="text"/>
                <br></br>
                Email : <input value={email} onChange={e => setEmail(e.target.value)} type="text"/>
                <br></br>
                <br></br>
                <button onClick={checkUser}>Verify details</button>
            </div>
        </div>
    )
}
