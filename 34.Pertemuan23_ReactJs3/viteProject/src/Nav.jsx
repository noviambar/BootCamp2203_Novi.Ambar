import React, {useState} from "react"
import { Navbar, Nav, Container } from "react-bootstrap"

function NavbarComp(){
    var [date] = useState(new Date())
    return(
    <Navbar bg="primary" variant="dark">
        <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>             
            </Nav>
            <Nav>
                <h5>{date.toLocaleTimeString()}</h5>
            </Nav> 
        </Container>
    </Navbar>
    )
}

export default NavbarComp