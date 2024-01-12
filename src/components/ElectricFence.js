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

const ElectricFenceItem = ({ id, name, description }) => {
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

const ElectricFence = () => {
  const makeItem = (id, name, description) => (
    <ElectricFenceItem key={id} id={id} name={name} description={description} />
  );

  const items = [
    {
      id: 1,
      name: "Energizer",
      fix: "Check the energizer or the electric fence charger first. Ensure it's powered, and there are no issues with the unit itself.",
    },
    {
      id: 2,
      name: "Battery",
      fix: "Verify the condition of the battery powering the energizer. A weak or dead battery can lead to a loss of power.",
    },
    {
      id: 3,
      name: "HT-cable",
      fix: "Inspect the high-tension (HT) cable connecting the energizer to the fence. Look for any visible damage or loose connections.",
    },
    {
      id: 4,
      name: "Poles",
      fix: "Examine the fence poles for stability and proper spacing. A leaning or damaged pole can affect the fence's overall integrity.",
    },
    {
      id: 5,
      name: "Earthspikes",
      fix: "Ensure the earthspikes are properly installed and making good contact with the ground. Inadequate grounding can lead to the fence not working correctly.",
    },
    {
      id: 6,
      name: "Warning Signs",
      fix: "Confirm the presence of warning signs. Missing or damaged signs can compromise safety and compliance.",
    },
    {
      id: 7,
      name: "Amount Lines",
      fix: "Check the number of fence lines and ensure they match the system's design. Missing or extra lines can cause issues.",
    },
    {
      id: 8,
      name: "Bobins",
      fix: "Inspect the insulators or bobins that secure the electric wires to the fence. Damaged insulators can result in a loss of electrical contact.",
    },
    {
      id: 9,
      name: "Tensioners",
      fix: "Assess the tensioners to make sure the wires are adequately tensioned. Loose wires can reduce the fence's effectiveness.",
    },
    {
      id: 10,
      name: "Keypad",
      fix: "If there's an access control system, check the keypad for any faults or malfunctions.",
    },
    {
      id: 11,
      name: "Gate Contact",
      fix: "Examine the gate contact for proper installation and functionality. Ensure it's making a good connection when the gate is closed.",
    },
    {
      id: 12,
      name: "Magnet",
      fix: "If there's a magnetic switch for the gate, check its alignment and functionality.",
    },
    {
      id: 13,
      name: "S-Hooks",
      fix: "Inspect the S-hooks for secure attachment of wires and components.",
    },
    {
      id: 14,
      name: "Farrels",
      fix: "Inspect the farrels for secure attachment of wires and components.",
    },
    {
      id: 15,
      name: "Receiver",
      fix: "If the system has a remote control or receiver, check its functionality and programming.",
    },
  ];

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row>
          <Col xs={4}>
            <h2>Electric Fence:</h2>
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

export default ElectricFence;
