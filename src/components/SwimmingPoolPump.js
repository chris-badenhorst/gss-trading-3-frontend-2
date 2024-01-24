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

const SwimmingPoolPumpItem = ({
  id,
  name,
  description,
  SwimmingPoolPumpFormData,
  setFormData,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);

  const handleChange = (field, value) => {
    setFormData({
      ...SwimmingPoolPumpFormData,
      [`${field}`]: value,
    });
  };

  const popover = (
    <Popover
      id={`SwimmingPoolPumppopover-${name}${id}`}
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
            id={`SwimmingPoolPumppresent-${id}${name}`}
            onChange={(e) =>
              handleChange(
                `SwimmingPoolPump--${name}--present`,
                e.target.checked
              )
            }
            label="Present"
            checked={
              SwimmingPoolPumpFormData[`SwimmingPoolPump--${name}--present`] ||
              false
            } //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`SwimmingPoolPumpdamaged-${id}${name}`}
            onChange={(e) =>
              handleChange(
                `SwimmingPoolPump--${name}--damaged`,
                e.target.checked
              )
            }
            label="Damaged"
            checked={
              SwimmingPoolPumpFormData[`SwimmingPoolPump--${name}--damaged`] ||
              false
            } //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`SwimmingPoolPumptype-${id}${name}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`SwimmingPoolPump--${name}--type`, e.target.value)
            }
            value={
              SwimmingPoolPumpFormData[`SwimmingPoolPump--${name}--type`] || ""
            } // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`SwimmingPoolPumpfindings-${id}${name}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(
                `SwimmingPoolPump--${name}--findings`,
                e.target.value
              )
            }
            value={
              SwimmingPoolPumpFormData[`SwimmingPoolPump--${name}--findings`] ||
              ""
            } // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const SwimmingPoolPump = () => {
  const [SwimmingPoolPumpFormData, setFormData] = useState({});
  const [other, setOther] = useState([]);
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  const otherItems = useSelector(selectOther);
  const makeItem = (id, name, description) => (
    <SwimmingPoolPumpItem
      key={`SwimmingPoolPump-${name}-${id}`}
      id={`${id}`}
      name={name}
      description={description}
      SwimmingPoolPumpFormData={SwimmingPoolPumpFormData}
      setFormData={setFormData}
    />
  );

  const handleSubmit = () => {
    if (Object.keys(SwimmingPoolPumpFormData).length !== 0) {
      dispatch(addSurveyItem(SwimmingPoolPumpFormData));
      setFormData({});
    } else {
      alert("Please fill in at least one field");
    }

    if (other.length !== 0 && Array.isArray(other) && other[0].includes(".")) {
      other.forEach((item, index) => {
        const info = item.split(" ");
        const formattedString = `name: ${info[0]} damaged: ${info[1]} type: ${info[2]} findings: ${info[3]}`;
        dispatch(addOther(formattedString));
      });
    } else {
      if (other.includes(".")) {
        const info = other.split(" ");
        const formattedString = `name: ${info[0]} damaged: ${info[1]} type: ${info[2]} findings: ${info[3]}`;
        dispatch(addOther(formattedString));
      } else {
        if (other.length !== 0) {
          dispatch(addOther(other));
        } else {
          if (Array.isArray(other) && other.length !== 0) {
            dispatch(addOther(other));
          } else {
            console.log('"other" is not an Array!');
          }
        }
      }
    }
  };
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

  const handleChange = (field, value, name) => {
    setFormData({
      ...SwimmingPoolPumpFormData,
      [`${name}_${field}`]: value,
    });
  };

  const handleOther = (value) => {
    if (value !== "") {
      const survey_items = value.includes(",")
        ? value.split(",").map((item) => item.trim())
        : value;

      setOther(survey_items);
    }
  };

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row>
          <Col xs={4}>
            <h2>SwimmingPoolPump:</h2>
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Make"
              id={`SwimmingPoolPumpmake`}
              onChange={(e) =>
                handleChange("make", e.target.value, "SwimmingPoolPump")
              }
              value={SwimmingPoolPumpFormData["SwimmingPoolPump_make"] || ""} //changed this line
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Model"
              id={`SwimmingPoolPumpmodel`}
              onChange={(e) =>
                handleChange("model", e.target.value, "SwimmingPoolPump")
              }
              value={SwimmingPoolPumpFormData["SwimmingPoolPump_model"] || ""} //changed this line
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
              id={`SwimmingPoolPump-other`}
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

export default SwimmingPoolPump;
