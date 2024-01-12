import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <h2>Survey</h2>
            </Nav.Link>
            <Nav.Link href="#link">
              <h2>Qoute</h2>
            </Nav.Link>
            <Nav.Link href="#login">
              <h2>Login</h2>
            </Nav.Link>
            <Nav.Link href="#register">
              <h2>Register</h2>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
