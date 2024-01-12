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

const CameraItem = ({ id, name, description }) => {
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

const Camera = () => {
  const makeItem = (id, name, description) => (
    <CameraItem key={id} id={id} name={name} description={description} />
  );

  const items = [
    {
      id: 1,
      name: "DVR ",
      fix: "Verify power supply, check connections, and reboot the DVR if necessary. Ensure the DVR is functioning correctly.",
    },
    {
      id: 2,
      name: "DVR-Channel ",
      fix: "Check for error messages on specific channels, ensure proper camera connections, and troubleshoot individual channel settings.",
    },
    {
      id: 3,
      name: "Camera",
      fix: "Re-seat connections, clean camera lenses, and check for proper power supply. Replace or repair malfunctioning cameras.",
    },
    {
      id: 4,
      name: "BNC Connectors",
      fix: " Re-attach or replace damaged BNC connectors. Ensure proper termination and secure connections.",
    },
    {
      id: 5,
      name: "Flyleets",
      fix: "est flyleets for proper functioning.",
    },

    {
      id: 6,
      name: "Cabling",
      fix: "Replace damaged cables, ensure proper cable routing, and check for signal continuity. Test flyleets for proper functioning.",
    },
    {
      id: 7,
      name: "Power Supply",
      fix: "Use a multimeter to measure power output. Replace faulty power supplies or connectors. Ensure stable and adequate power to all components.",
    },
    {
      id: 8,
      name: "Baluns",
      fix: "Re-seat connectors, replace damaged baylens, and ensure proper signal transmission through baluns.",
    },
    {
      id: 9,
      name: "Network ",
      fix: "Ensure network cables are connected properly, check IP configurations, and troubleshoot any network-related issues. Verify that the cameras can be accessed remotely if needed.",
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

export default Camera;
