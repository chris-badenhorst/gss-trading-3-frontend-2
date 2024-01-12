import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  ListGroup,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";

const GarageMotorItem = ({ id, name, description }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  const popover = <Popover id={`popover-${id}`}>{description}</Popover>;

  return (
    <ListGroup.Item>
      <Row>
        <Col className="d-flex align-items-center my-1" md={2}>
          <OverlayTrigger
            trigger="hover"
            placement="right"
            overlay={popover}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <strong>
              {id}.{name}:
            </strong>
          </OverlayTrigger>
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check label="Present" />
        </Col>
        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check label="damaged" />
        </Col>
        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Control type="text" placeholder="Type" />
        </Col>
        <Col className="my-1" md={4}>
          <Form.Control as="textarea" placeholder="Findings" />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const GarageMotor = () => {
  const makeItem = (id, name, description) => (
    <GarageMotorItem key={id} id={id} name={name} description={description} />
  );

  const items = [
    {
      id: 1,
      name: "Anti Theft",
      fix: "Verify the functionality of the anti-theft mechanism. Adjust or replace components as necessary.",
    },
    {
      id: 2,
      name: "Lock",
      fix: "Test the lock mechanism for proper engagement and disengagement. Replace or lubricate the lock if needed.",
    },
    {
      id: 3,
      name: "Lid",
      fix: "nspect the lid for any damage. Replace if necessary.",
    },
    {
      id: 4,
      name: "Door Lock",
      fix: "Check the functionality of the door lock. Ensure it securely locks and unlocks. Repair or replace components as needed.",
    },
    {
      id: 5,
      name: "Pc Board",
      fix: "nspect the main control board (PC Board) for visible damage. Check for loose connections and ensure all wiring is intact. Replace the PC Board if any components are faulty",
    },
    {
      id: 6,
      name: "Power Supply",
      fix: "Use a multimeter to test the voltage at the gate motor's power supply input. If there is no power, check the circuit breaker or power source. Repair or replace the power supply components if necessary.",
    },
    {
      id: 7,
      name: "Battery",
      fix: "Check the battery voltage with a multimeter. If the battery is weak or dead, replace it with a fully charged one. Ensure proper battery connections.",
    },
    {
      id: 8,
      name: "Dos",
      fix: "Test and inspect the dosing system. Replace any faulty components or adjust settings as needed.",
    },
    {
      id: 9,
      name: "Casing",
      fix: "Inspect the outer casing for any visible damage or signs of wear. Replace or repair the casing as needed.",
    },
    {
      id: 10,
      name: "Reciever",
      fix: "Test the receiver unit with a compatible remote control. If it's not responding, replace the receiver unit. Ensure proper wiring and connections.",
    },
    {
      id: 11,
      name: "Cable",
      fix: "Inspect the cables connecting various components. Check for damaged cables or loose connections. Replace damaged cables and secure connections.",
    },
    {
      id: 12,
      name: "Wheels",
      fix: "Check the wheels for smooth operation. Lubricate or replace them if there is resistance or damage.",
    },
    {
      id: 13,
      name: "Rack",
      fix: " Inspect the rack for proper alignment and any damage. Adjust or replace if necessary.",
    },
    {
      id: 14,
      name: "i-5 beams",
      fix: "Check the infrared beams for proper alignment. Clean and align them, or replace if they are damaged.",
    },
    {
      id: 15,
      name: "Gate Contact",
      fix: " Ensure the gate contact is making a good connection when the gate is closed. Adjust or replace the gate contact if necessary.",
    },
    {
      id: 16,
      name: "Light",
      fix: "Test the light component. If it's not working, replace the light bulb or the entire light assembly. Check and repair wiring as needed.",
    },
    {
      id: 17,
      name: "Day night",
      fix: "Ensure the day/night sensor is clean and unobstructed. Adjust sensitivity settings or replace if it's not functioning correctly.",
    },
    { id: 18, name: "other" },
  ];

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row>
          <Col xs={3}>
            <h2>Garage motor:</h2>
          </Col>
          <Col xs={3}>
            <Form.Control type="text" placeholder="Make" />
          </Col>
          <Col xs={3}>
            <Form.Control type="text" placeholder="Model" />
          </Col>
          <Col xs={3}>
            <Form.Control as="select" placeholder="type">
              <option>Select type...</option>
              <option>Pull up</option>
              <option>Single Door</option>
              <option>Double Door</option>
            </Form.Control>
          </Col>
        </Row>
      </ListGroup.Item>
      {items.map(({ id, name, fix }) => makeItem(id, name, fix))}
      <ListGroup.Item>
        <Row>
          <Col xs={12}>
            <Form.Control rows="3" as="textarea" placeholder="Comment" />
            <Button className="my-2" variant="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default GarageMotor;
