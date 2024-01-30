import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  selectName,
  selectEmail,
  selectLoading,
  selectError,
  login,
} from "../features/UserSlice";
import { useSelector, useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleLogin = (email, password) => {
    const respond = dispatch(login({ email: email, password: password }));
  };

  useEffect(() => {
    if (name) {
      navigate("/");
    }
  }, [name, navigate]);
  return (
    <Container>
      <Row>
        <Col>
          <h2>Login</h2>
        </Col>
      </Row>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <React.Fragment>
          {name.error ? <Alert>{name.error}</Alert> : <p>{name}</p>}
          {/* Render other details here if needed */}
        </React.Fragment>
      )}
      <Row>
        <Col>
          <FormGroup>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Enter username"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() => handleLogin(username, password)}
            className="my-3"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
