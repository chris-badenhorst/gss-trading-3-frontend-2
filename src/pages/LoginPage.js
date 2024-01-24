import React, { useState } from "react";
import { Row, Col, Container, Form, FormGroup, Button } from "react-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container>
      <Row>
        <Col>
          <h2>Login</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Form.Label>User name:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Form.Label>User name:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="my-3">Submit</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
