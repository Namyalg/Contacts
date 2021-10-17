import React from 'react'
import {useState} from 'react'
import NewUser from './NewUser'
import ExistingUser from './ExistingUser';
import background from './back.png'
import { Navbar, Container, Button} from 'react-bootstrap';
import {AiTwotoneMail , AiOutlineMail} from 'react-icons/ai'

export default function Home(props) {
    var [type, setType] = useState(null);
    const nextPath = (path) => {
        props.history.push(path)
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
             <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand><AiOutlineMail size={50} style={{paddingRight : '10px'}}/>Contact-o-mail</Navbar.Brand>
                </Container>
            </Navbar>
            <br></br> 
            <br></br>
            <h2>The easiest way to save and organise your email contacts <AiTwotoneMail size={50}/></h2>
            <br></br>
            <span><h2 style={{marginLeft : '34%', float : 'left'}}>Sign up if you are a </h2><Button style={{marginRight : '34%'}} onClick={e => setType(false)} variant="outline-dark" size="lg">New User</Button></span>
            <br></br>
            <br></br>
            <span><h2 style={{marginLeft : '33%', float : 'left'}}>Or Login if you are an </h2><Button style={{marginRight : '32%'}} onClick={e => setType(true)} variant="outline-dark" size="lg">Existing User</Button></span>
            <div style={{margin : '2%'}}>
                {type === null ? <div></div> : type === true ? <ExistingUser></ExistingUser> : <NewUser></NewUser>}
            </div>
        </div>
    )
}
