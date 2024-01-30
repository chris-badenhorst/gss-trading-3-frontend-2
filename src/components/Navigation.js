import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import {
  selectName,
  selectQuote,
  selectSurvey,
  selectStaff,
} from "../features/UserSlice";

const Navigation = () => {
  const name = useSelector(selectName);
  const survey = useSelector(selectSurvey);
  const quote = useSelector(selectQuote);
  const staff = useSelector(selectStaff);
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {survey && (
              <LinkContainer to="/">
                <Nav.Link>
                  <h2>Survey</h2>
                </Nav.Link>
              </LinkContainer>
            )}

            {quote && (
              <LinkContainer to="/qoute">
                <Nav.Link>
                  <h2>Quote</h2>
                </Nav.Link>
              </LinkContainer>
            )}

            {name ? (
              <></>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <h2>Login</h2>
                </Nav.Link>
              </LinkContainer>
            )}
            {staff && (
              <LinkContainer to="/register">
                <Nav.Link>
                  <h2>Register</h2>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
