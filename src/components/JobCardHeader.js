import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

const JobCardHeader = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <h1>JOB CARD / DAMAGE REPORT: </h1>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs={6}>
          <Form.Group as={Col} controlId="assessmentDate">
            <Form.Label>Assessment Date:</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group as={Col} controlId="responsibleEmployee">
            <Form.Label>Responsible Employee:</Form.Label>
            <Form.Control as="select">
              <option>Select...</option>
              <option>Jaco</option>
              <option>Louise</option>
              <option>Noel</option>
              <option>Amos</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row className="mb-5">
        <Col xs={12}>
          <h4>Present on Site:</h4>
          <Form.Group controlId="jobTitle">
            <Form.Check label="MR" />
            <Form.Check label="MRS" />
            <Form.Check label="TENANT" />
            <Form.Check label="WORKER" />
            <Form.Control
              placeholder="Other"
              style={{ maxWidth: "200px" }}
              type="text"
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row className="mb-5">
        <Col>
          <h4>Is the premises occupied or vacant: </h4>
        </Col>
        <Col>
          <Form.Group controlId="occupiedOrVacant">
            <Form.Check
              inline
              type="radio"
              id="occupied"
              name="occupiedOrVacant"
              label="Occupied"
            />
            <Form.Check
              inline
              type="radio"
              id="vacant"
              name="occupiedOrVacant"
              label="Vacant"
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row className="mb-5">
        <Col xs={12}>
          <Form.Group controlId="clientStory">
            <Form.Label>What did the client say happend:</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Col>
      </Row>
      <Button>Submit</Button>
      <hr />
    </>
  );
};

export default JobCardHeader;
