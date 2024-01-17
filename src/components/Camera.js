import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  ListGroup,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addSurveyItem, selectItems } from "../features/FormSlice";

const CameraItem = ({ id, name, description, cameraFormData, setFormData }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);

  const handleChange = (field, value) => {
    setFormData({
      ...cameraFormData,
      [`${field}`]: value,
    });
  };

  const popover = (
    <Popover
      id={`Camerapopover-${name}${id}`}
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
            trigger={["hover", "focus"]}
            placement="right"
            overlay={popover}
          >
            <strong>{name}:</strong>
          </OverlayTrigger>
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`Camerapresent-${id}`}
            onChange={(e) =>
              handleChange(`Camera--${name}--present`, e.target.checked)
            }
            label="Present"
            checked={cameraFormData[`Camera--${name}--present`] || false} //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`Cameradamaged-${id}`}
            onChange={(e) =>
              handleChange(`Camera--${name}--damaged`, e.target.checked)
            }
            label="Damaged"
            checked={cameraFormData[`Camera--${name}--damaged`] || false} //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`Cameratype-${id}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`Camera--${name}--type`, e.target.value)
            }
            value={cameraFormData[`Camera--${name}--type`] || ""} // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`Camerafindings-${id}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(`Camera--${name}--findings`, e.target.value)
            }
            value={cameraFormData[`Camera--${name}--findings`] || ""} // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const Camera = () => {
  const [cameraFormData, setFormData] = useState({});
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  useEffect(() => {
    console.log(surveyItems);
  }, [surveyItems]);

  const makeItem = (id, name, description) => (
    <CameraItem
      key={`Camera-${name}-${id}`}
      id={`${id}`}
      name={name}
      description={description}
      cameraFormData={cameraFormData}
      setFormData={setFormData}
    />
  );

  const handleSubmit = () => {
    if (Object.keys(cameraFormData).length !== 0){
      dispatch(addSurveyItem(cameraFormData));
      setFormData({});
    }else{
      alert("Please fill in atleast one field");}}

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

  const handleChange = (field, value, name) => {
    setFormData({
      ...cameraFormData,
      [`${name}_${field}`]: value,
    });
  };

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row>
          <Col xs={4}>
            <h2>Camera:</h2>
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Make"
              id={`Cameramake`}
              onChange={(e) => handleChange("make", e.target.value, "Camera")}
              value={cameraFormData["Camera_make"] || ""} //changed this line
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Model"
              id={`Cameramodel`}
              onChange={(e) => handleChange("model", e.target.value, "Camera")}
              value={cameraFormData["Camera_model"] || ""} //changed this line
            />
          </Col>
        </Row>
      </ListGroup.Item>

      {items.map(({ id, name, fix }) => makeItem(id, name, fix))}

      <ListGroup.Item>
        <Row>
          <Button
            type="submit"
            className="my-2"
            variant="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Camera;
