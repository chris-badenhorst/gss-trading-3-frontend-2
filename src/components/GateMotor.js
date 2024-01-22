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

const GateMotorItem = ({
  id,
  name,
  description,
  GateMotorFormData,
  setFormData,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);

  const handleChange = (field, value) => {
    setFormData({
      ...GateMotorFormData,
      [`${field}`]: value,
    });
  };

  const popover = (
    <Popover
      id={`GateMotorpopover-${name}${id}`}
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
            id={`GateMotorpresent-${id}${name}`}
            onChange={(e) =>
              handleChange(`GateMotor--${name}--present`, e.target.checked)
            }
            label="Present"
            checked={GateMotorFormData[`GateMotor--${name}--present`] || false} //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`GateMotordamaged-${id}${name}`}
            onChange={(e) =>
              handleChange(`GateMotor--${name}--damaged`, e.target.checked)
            }
            label="Damaged"
            checked={GateMotorFormData[`GateMotor--${name}--damaged`] || false} //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`GateMotortype-${id}${name}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`GateMotor--${name}--type`, e.target.value)
            }
            value={GateMotorFormData[`GateMotor--${name}--type`] || ""} // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`GateMotorfindings-${id}${name}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(`GateMotor--${name}--findings`, e.target.value)
            }
            value={GateMotorFormData[`GateMotor--${name}--findings`] || ""} // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const GateMotor = () => {
  const [GateMotorFormData, setFormData] = useState({});
  const [other, setOther] = useState([]);
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  const otherItems = useSelector(selectOther);
  const makeItem = (id, name, description) => (
    <GateMotorItem
      key={`GateMotor-${name}-${id}`}
      id={`${id}`}
      name={name}
      description={description}
      GateMotorFormData={GateMotorFormData}
      setFormData={setFormData}
    />
  );

  const handleSubmit = () => {
    if (Object.keys(GateMotorFormData).length !== 0) {
      dispatch(addSurveyItem(GateMotorFormData));
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
  ];

  const handleChange = (field, value, name) => {
    setFormData({
      ...GateMotorFormData,
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
            <h2>GateMotor:</h2>
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Make"
              id={`GateMotormake`}
              onChange={(e) =>
                handleChange("make", e.target.value, "GateMotor")
              }
              value={GateMotorFormData["GateMotor_make"] || ""} //changed this line
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Model"
              id={`GateMotormodel`}
              onChange={(e) =>
                handleChange("model", e.target.value, "GateMotor")
              }
              value={GateMotorFormData["GateMotor_model"] || ""} //changed this line
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
              id={`GateMotor-other`}
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

export default GateMotor;
