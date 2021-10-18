/*
    This file provides the table layout for displaying the contacts
    The contact list is got via a GET request to /contact/list
    Each entry in the table has an option to modify (/contact/update) and delete (/contact/delete/)
*/

import React, { useEffect, useState } from 'react'
import background from '../assets/back.png'
import "./styles/ListContact.css"
import axios from 'axios'
import { FaEdit } from 'react-icons/fa';
import {AiFillDelete, AiTwotoneMail} from 'react-icons/ai'
import Modal from "react-modal";
import Navigation from './Navigation'
import {Form, Button} from 'react-bootstrap'
const backend = process.env.REACT_APP_BACKEND

Modal.setAppElement("#root");

export default function ListContact() {  
    var [contacts, setContact] =  useState([])
    var [obj, setObj] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    var [email, setEmail] = useState("")
    var [firstname, setFirstName] = useState("")
    var [lastname, setLastName] = useState("")
    var [targetId, setTargetId] = useState(null)

    //performed on load of the page
    useEffect(() => {
        if(localStorage.getItem('uname')  === "" || localStorage.getItem('uemail')  === ""){
            window.location.replace("/")
        }
        else{
            var URL = backend + "contact/list/" + localStorage.getItem('uname') + "/" + localStorage.getItem('uemail')
            axios.get(URL)
            .then((response) => {
                setContact(response.data.contacts.contacts)
                setObj(response.data.contacts)
            })
        }
    }, []);

    const backdrop = {
        backgroundImage: `url(${background})`,
        width:'100%',
        height : '650px',
        backgroundRepeat: 'no-repeat',
        overflowX : 'hidden',
        overflowY : 'auto',
        margin : 'auto'
    }

    const tableStyle = {
        marginLeft : '-10%'
    }

    const customStyles = {
        content: {
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    
    function toggleModal() {
        setIsOpen(!isOpen);
    }

    return (
       <div style={backdrop}>
           <Navigation/>
            <div style={tableStyle}>
                <h1>Contact list <AiTwotoneMail size={60} style={{paddingLeft : '20px'}}/></h1>
                    <table style={{marginLeft : '19%', width : '70%'}}>
                        <thead>
                            <tr>
                                <th style={{width : '15%'}}>First Name</th>
                                <th style={{width : '15%'}}>Last Name</th>
                                <th style={{width : '35%'}}>Email</th>
                                <th style={{width : '10%'}}>Modify</th>
                                <th style={{width : '10%'}}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                             {
                                contacts !== null ?
                                    contacts.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td>{item.email}</td>
                                            <td><Button variant="outline-dark" onClick={() => {
                                                setTargetId(item._id)
                                                toggleModal()
                                            }}><FaEdit size={20}/></Button>
                                                {/* Modal to modify the contact */}
                                                <Modal
                                                    style={customStyles}
                                                    isOpen={isOpen}
                                                    onRequestClose={toggleModal}
                                                    contentLabel="Edit contact"
                                                >
                                                <div>
                                                    <h3>Modify Contact</h3>
                                                    <Form>
                                                        <Form.Group className="mb-3">
                                                            <Form.Control style={{width : '80%', margin : 'auto'}} size="lg" type="text" placeholder="Enter First Name" value={firstname} onChange={e => setFirstName(e.target.value)}/>
                                                            <br></br>
                                                            <Form.Control style={{width : '80%', margin : 'auto'}} size="lg" type="text" placeholder="Enter Last Name" value={lastname} onChange={e => setLastName(e.target.value)}/>
                                                            <br></br>
                                                            <Form.Control style={{width : '80%', margin : 'auto'}} size="lg" type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
                                                            <br></br>
                                                            <Button variant="outline-dark" onClick={() => {
                                                                var content = {objId : obj._id , contactId : targetId, firstname : firstname, lastname : lastname, email : email}
                                                                if(firstname === "" || email === ""){
                                                                    alert("Please fill in first name and email")
                                                                }
                                                                else{
                                                                    var URL = backend + "contact/update"
                                                                    axios.put(URL, content)
                                                                    .then((response) => {
                                                                        if(response.data.status == 1){
                                                                            window.location.reload()
                                                                            toggleModal()
                                                                        }
                                                                        else{
                                                                            alert("There was an error updating, try again :(")
                                                                        }
                                                                    })
                                                                }
                                                            }}>Update contact</Button>
                                                        </Form.Group>
                                                    </Form>
                                                </div>
                                            </Modal>
                                        </td>
                                        <td><Button variant="outline-dark" onClick={() => {
                                            if(window.confirm("Do you want to delete this record ?")){
                                                var dlt = {objId : obj._id , contactId : item._id}
                                                var URL = backend + "contact/delete/" + obj._id + "/" + item._id
                                                axios.delete(URL)
                                                .then((response) => {
                                                    if(response.data.status == 1){
                                                        window.location.reload()
                                                    }
                                                    else{
                                                        alert("There was an error deleting, try again :(")
                                                    }
                                                })
                                            }
                                        }}>
                                    <AiFillDelete size={20}/></Button></td>
                                </tr>
                            )) : <tr></tr>
                        }
                    </tbody>
                </table>
           </div>
       </div>    
    )
}
