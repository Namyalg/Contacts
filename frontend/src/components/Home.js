import React from 'react'
import {useState} from 'react'
import NewUser from './NewUser'
import ExistingUser from './ExistingUser';
import background from './back.png'
import { Navbar, Container, Button} from 'react-bootstrap';
import {AiTwotoneMail , AiOutlineMail} from 'react-icons/ai'

export default function Home(props) {
    var [type, setType] = useState(false);
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
            Sign up if you are a <Button variant="outline-dark" onClick={e => setType(false)}>New User</Button>
            <br></br>
            Or login as an <Button variant="outline-dark" onClick={e => setType(true)}>Existing User</Button>
            <div>
            {type === true ? <ExistingUser></ExistingUser> : <NewUser></NewUser>}
            </div>
        </div>
    )
}
