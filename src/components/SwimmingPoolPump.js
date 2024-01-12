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

const SwimmingPoolPumpItem = ({ id, name, description }) => {
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

const SwimmingPoolPump = () => {
  const makeItem = (id, name, description) => (
    <SwimmingPoolPumpItem
      key={id}
      id={id}
      name={name}
      description={description}
    />
  );

  const items = [
    {
      id: 1,
      name: "Visual Inspection",
      fix: "Examine the pump for any visible signs of damage, loose connections, or debris.Check for leaks around the pump and plumbing connections.",
    },
    {
      id: 2,
      name: "Prime ",
      fix: "Ensure the pump is properly primed with water.Fill the pump basket with water to ensure the pump is not running dry.",
    },
    {
      id: 3,
      name: "Strainer Basket",
      fix: "Inspect the strainer basket for debris and clean it if necessary.Make sure the basket is properly seated in its housing.",
    },
    {
      id: 4,
      name: "Impeller",
      fix: " Remove the pump cover and inspect the impeller for any clogs or obstructions. Rotate the impeller manually to check for any resistance.",
    },
    {
      id: 5,
      name: "Pool Skimmer and Drain",
      fix: "Check the skimmer and main drain for any blockages.Remove any debris that might be restricting water flow",
    },

    {
      id: 6,
      name: "Motor Capacitor",
      fix: "Inspect the receiver unit to confirm that it is receiving signals from sensors. Ensure antennas are intact and properly positioned.",
    },
    {
      id: 7,
      name: "Wiring and Connections",
      fix: "Check the electrical connections for any signs of corrosion or loose wires.Ensure all wiring is properly connected and secured.",
    },
    {
      id: 8,
      name: "Power Supply",
      fix: "Verify that there is power reaching the pump.Test the power supply with a multimeter.",
    },
    {
      id: 9,
      name: "DB Board",
      fix: "Inspect the DB board for any tripped breakers or blown fuses.Reset any tripped breakers and replace blown fuses.",
    },
    {
      id: 10,
      name: "GFCI",
      fix: "If the pump is connected to a GFCI outlet, ensure it hasn't tripped.Reset the GFCI if necessary.",
    },
    {
      id: 10,
      name: "Pressure Gauge",
      fix: "Check the pressure gauge on the filter system for abnormal readings.High pressure may indicate a clogged filter.",
    },
    {
      id: 10,
      name: "Check Valve",
      fix: "Check the check valve for proper operation.Replace the check valve if it's stuck or not functioning.",
    },
    {
      id: 10,
      name: "Motor Bearings",
      fix: "If the motor is making unusual noises, inspect the motor bearings for wear.Lubricate or replace the bearings as needed.",
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

export default SwimmingPoolPump;
