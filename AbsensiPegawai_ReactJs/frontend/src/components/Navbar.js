import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavbarComp() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Absensi Pegawai</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/Dashboard">Home</Nav.Link>
          <Nav.Link href="/Employee">Employee</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#logout">Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
