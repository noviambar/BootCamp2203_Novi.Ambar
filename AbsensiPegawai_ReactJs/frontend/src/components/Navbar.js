import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavbarComp() {
  const [position, setPosition] = useState([]);

  useEffect(() => {
    getUser();
  });

  async function getUser() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      setPosition(parseRes.position);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/dashboard">Absensi Pegawai</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
          {position === "Admin" && (
            <Nav.Link href="/Employee">Employee</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
