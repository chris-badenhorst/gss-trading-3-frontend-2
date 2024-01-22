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
import {
  addSurveyItem,
  selectItems,
  addOther,
  selectOther,
} from "../features/FormSlice";

const CameraItem = ({ id, name, description, CameraFormData, setFormData }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);

  const handleChange = (field, value) => {
    setFormData({
      ...CameraFormData,
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
            id={`Camerapresent-${id}${name}`}
            onChange={(e) =>
              handleChange(`Camera--${name}--present`, e.target.checked)
            }
            label="Present"
            checked={CameraFormData[`Camera--${name}--present`] || false} //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`Cameradamaged-${id}${name}`}
            onChange={(e) =>
              handleChange(`Camera--${name}--damaged`, e.target.checked)
            }
            label="Damaged"
            checked={CameraFormData[`Camera--${name}--damaged`] || false} //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`Cameratype-${id}${name}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`Camera--${name}--type`, e.target.value)
            }
            value={CameraFormData[`Camera--${name}--type`] || ""} // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`Camerafindings-${id}${name}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(`Camera--${name}--findings`, e.target.value)
            }
            value={CameraFormData[`Camera--${name}--findings`] || ""} // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const Camera = () => {
  const [CameraFormData, setFormData] = useState({});
  const [other, setOther] = useState([]);
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  const otherItems = useSelector(selectOther);
  const makeItem = (id, name, description) => (
    <CameraItem
      key={`Camera-${name}-${id}`}
      id={`${id}`}
      name={name}
      description={description}
      CameraFormData={CameraFormData}
      setFormData={setFormData}
    />
  );

  const handleSubmit = () => {
    if (Object.keys(CameraFormData).length !== 0) {
      dispatch(addSurveyItem(CameraFormData));
      setFormData({});
    } else {
      alert("Please fill in at least one field");
    }

    if (Array.isArray(other)) {
      other.forEach((item, index) => {
        // debugging process

        const info = item.split(" ");
        const formattedString = `name: ${info[0]} damaged: ${info[1]} type: ${info[2]} findings: ${info[3]}`;
        dispatch(addOther(formattedString));
      });
    } else {
      console.log('"other" is not an Array!');
    }

    console.log(otherItems[0]);
  };
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
      ...CameraFormData,
      [`${name}_${field}`]: value,
    });
  };

  const handleOther = (value) => {
    const survey_items = value.includes(",")
      ? value.split(",").map((item) => item.trim())
      : [value];

    setOther(survey_items);
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
              value={CameraFormData["Camera_make"] || ""} //changed this line
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Model"
              id={`Cameramodel`}
              onChange={(e) => handleChange("model", e.target.value, "Camera")}
              value={CameraFormData["Camera_model"] || ""} //changed this line
            />
          </Col>
        </Row>
      </ListGroup.Item>

      {items.map(({ id, name, fix }) => makeItem(id, name, fix))}
      <ListGroup.Item>
        <Row>
          <Col className="d-flex align-items-center my-1" md={2}>
            <strong>Other: </strong>
          </Col>

          <Col className="d-flex align-items-center my-1" md={10}>
            <Form.Control
              as="textarea"
              rows={5}
              id={`Camera-other`}
              onChange={(e) => {
                handleOther(e.target.value);
              }}
            />
          </Col>
        </Row>
      </ListGroup.Item>

      <ListGroup.Item>
        <Row>
          <Button
            type="submit"
            className="my-2"
            variant="primary"
            onClick={(e) => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Camera;
