import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  ListGroup,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

const AlarmItem = ({ id, name, description }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);
  const handleTouchStart = () => setShowDescription(true);
  const handleTouchEnd = () => setShowDescription(false);

  const popover = (
    <Popover
      id={`popover-${id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {description}
    </Popover>
  );

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
          <Form.Check label="Damaged" />
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

const Alarm = () => {
  const makeItem = (id, name, description) => (
    <AlarmItem key={id} id={id} name={name} description={description} />
  );

  const items = [
    {
      id: 1,
      name: "Power Supply",
      fix: "Check power supply and ensure proper functioning.",
    },
    {
      id: 2,
      name: "Battery",
      fix: "Test and replace the backup battery if needed.",
    },
    {
      id: 3,
      name: "Panel",
      fix: "Examine the main control panel for issues and verify secure connections.",
    },
    {
      id: 4,
      name: "Keypad",
      fix: "Test keypad functionality and check connections.",
    },
    {
      id: 5,
      name: "PIR (Indoor/Outdoor)",
      fix: "Test PIR motion sensors and ensure proper positioning.",
    },
    {
      id: 6,
      name: "Receiver",
      fix: "Inspect the receiver unit for signal reception and antenna integrity.",
    },
    {
      id: 7,
      name: "Expander",
      fix: "Inspect and test additional modules connected to the system.",
    },
    {
      id: 8,
      name: "Wiring",
      fix: "Examine system wiring for damage, loose connections, or shorts.",
    },
    {
      id: 9,
      name: "Zones/Devices",
      fix: "Check individual zones and devices for proper configuration.",
    },
    {
      id: 10,
      name: "Communication Module",
      fix: "Verify operational status of the communication module.",
    },
  ];

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row>
          <Col xs={4}>
            <h2>Cameras:</h2>
          </Col>
          <Col xs={4}>
            <Form.Control type="text" placeholder="Make" />
          </Col>
          <Col xs={4}>
            <Form.Control type="text" placeholder="Model" />
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

export default Alarm;
