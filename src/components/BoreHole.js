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

const BoreHoleItem = ({ id, name, description }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  const handleTouchStart = () => {
    setShowDescription(true);
  };

  const handleTouchEnd = () => {
    setShowDescription(false);
  };

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

const BoreHole = () => {
  const makeItem = (id, name, description) => (
    <BoreHoleItem key={id} id={id} name={name} description={description} />
  );

  const items = [
    {
      id: 1,
      name: "Depth Measurement",
      fix: "Measure the borehole depth using appropriate tools and ensure it aligns with the specifications.",
    },
    {
      id: 2,
      name: "Cabling  ",
      fix: "Inspect MSM cabling for wear, damage, or loose connections, checking for signs of rodent or environmental damage.",
    },
    {
      id: 3,
      name: "Controller",
      fix: "Inspect the borehole controller for power supply issues, loose connections, physical damage, and ensure appropriate settings.",
    },
    {
      id: 4,
      name: "Receiver ",
      fix: "Test the receiver unit for functionality and check communication between the controller and receiver.",
    },
    {
      id: 5,
      name: "DB Board",
      fix: "Examine the DB Board for tripped breakers, burnt components, or loose connections, ensuring electrical connections are secure.",
    },

    {
      id: 6,
      name: "Power Supply ",
      fix: "Verify the power supply to the borehole system and check for issues with the power source or electrical supply.",
    },
    {
      id: 7,
      name: "Pump ",
      fix: "Inspect the submersible pump for mechanical issues and check for blockages in the pump or borehole.",
    },
    {
      id: 8,
      name: "Motor ",
      fix: "Inspect the submersible  motor for mechanical issues and check for blockages in the pump or borehole.",
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

export default BoreHole;
