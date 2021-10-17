import React, { useEffect, useState } from 'react'
import background from './back.png'
import "./styles/ListContact.css"
import axios from 'axios'
import { FaEdit } from 'react-icons/fa';
import {AiFillDelete, AiTwotoneMail} from 'react-icons/ai'
import Modal from "react-modal";
import Navigation from './Navigation'

Modal.setAppElement("#root");

export default function ListContact() {  
    var [contacts, setContact] =  useState([])
    var [obj, setObj] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
      setIsOpen(!isOpen);
    }

    useEffect(() => {
        if(localStorage.getItem('uname')  === "" || localStorage.getItem('uemail')  === ""){
            window.location.replace("/")
        }
        else{
            axios.post("http://localhost:9001/contact/list", {name : localStorage.getItem('uname'), email : localStorage.getItem('uemail')})
            .then((response) => {
                console.log(response.data)
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
            overflow : 'hidden',
            margin : 'auto'
    }
    var [email, setEmail] = useState("")
    var [firstname, setFirstName] = useState("")
    var [lastname, setLastName] = useState("")

    const tableStyle = {
        marginLeft : '-10%'
    }

    const paddingStyle = {
        paddingLeft : '120px'
    }

    const paddingStyleExtra = {
        paddingLeft : '150px'
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    const edit = (item) => {
        alert(item.firstname)
    }

    const deleteContact = () => {
        console.log("current object is")
        console.log(obj)
    }

    return (
       <div style={backdrop}>
           <Navigation/>
            <div style={tableStyle}>
                <h1>Here is your contact list <AiTwotoneMail size={60} style={{paddingLeft : '20px'}}/></h1>
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
                                     <tr key={item.id}>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.email}</td>
                                        <td><button onClick={toggleModal}><FaEdit size={20}/></button>
                                        <Modal
                                            style={customStyles}
                                            isOpen={isOpen}
                                            onRequestClose={toggleModal}
                                            contentLabel="Edit contact"
                                            >
                                            <div>Edit contact</div>
                                            <div>
                                            <h3>Enter the details of your contact</h3>
                                                First Name : <input value={firstname} onChange={e => setFirstName(e.target.value)} type="text"/>
                                                <br></br>
                                                Last Name : <input value={lastname} onChange={e => setLastName(e.target.value)} type="text"/>
                                                <br></br>
                                                Email : <input value={email} onChange={e => setEmail(e.target.value)} type="text"/>
                                                <br></br>
                                                <br></br>
                                                <button onClick={() => {
                                                var content = {objId : obj._id , contactId : item._id, firstname : firstname, lastname : lastname, email : email}
                                                axios.post("http://localhost:9001/contact/update", content)
                                                .then((response) => {
                                                    if(response.data.status == 1){
                                                        window.location.reload()
                                                        toggleModal()
                                                    }
                                                    else{
                                                        alert("There was an error updating, try again :(")
                                                    }
                                                })
                                            }}>Update contact</button>
                                            </div>
                                        </Modal>
                                        </td>
                                        {/* <td><button onClick={() => {
                                                var content = {objId : obj._id , contactId : item._id, firstname : "what", lastname : "is", email : "name@mail.com"}
                                                axios.post("http://localhost:9001/contact/update", content)
                                                .then((response) => {
                                                    if(response.data.status == 1){
                                                        alert("Succesful update")
                                                        window.location.reload()
                                                    }
                                                    else{
                                                        alert("There was an error updating, try again :(")
                                                    }
                                                })
                                        }}>
                                        <FaEdit size={20}/></button></td> */}
                                        <td><button onClick={() => {
                                            if(window.confirm("Do you want to delete this record ?")){
                                                var dlt = {objId : obj._id , contactId : item._id}
                                                axios.post("http://localhost:9001/contact/delete", dlt)
                                                .then((response) => {
                                                    if(response.data.status == 1){
                                                        alert("Succesful delete")
                                                        window.location.reload()
                                                    }
                                                    else{
                                                        alert("There was an error deleting, try again :(")
                                                    }
                                                })
                                            }
                                        }}>
                                        <AiFillDelete size={20}/></button></td>
                                    </tr>
                                )) : <tr></tr>
                            }
                        </tbody>
                </table>
           </div>
       </div>    
    )
}
