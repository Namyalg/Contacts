import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

export default function Navigation() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand>Great to see you {localStorage.getItem('uname')}!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/add">Add a Contact</Nav.Link>
                        <Nav.Link href="/list">List Contacts</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link href="/" onClick={() => {
                            localStorage.setItem('uname', "")
                            localStorage.setItem('uemail', "")
                            localStorage.setItem('logout', true)
                        }} style={{paddingLeft : '1200%'}}>Logout</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
