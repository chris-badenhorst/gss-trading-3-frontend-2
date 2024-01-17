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

const AlarmItem = ({ id, name, description, alarmFormData, setFormData }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);

  const handleChange = (field, value) => {
    setFormData({
      ...alarmFormData,
      [`${field}`]: value,
    });
  };

  const popover = (
    <Popover
      id={`Alarmpopover-${name}${id}`}
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
            id={`Alarmpresent-${id}`}
            onChange={(e) =>
              handleChange(`Alarm--${name}--present`, e.target.checked)
            }
            label="Present"
            checked={alarmFormData[`Alarm--${name}--present`] || false} //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`Alarmdamaged-${id}`}
            onChange={(e) =>
              handleChange(`Alarm--${name}--damaged`, e.target.checked)
            }
            label="Damaged"
            checked={alarmFormData[`Alarm--${name}--damaged`] || false} //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`Alarmtype-${id}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`Alarm--${name}--type`, e.target.value)
            }
            value={alarmFormData[`Alarm--${name}--type`] || ""} // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`Alarmfindings-${id}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(`Alarm--${name}--findings`, e.target.value)
            }
            value={alarmFormData[`Alarm--${name}--findings`] || ""} // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const Alarm = () => {
  const [alarmFormData, setFormData] = useState({});
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  useEffect(() => {
    console.log(surveyItems);
  }, [surveyItems]);

  const makeItem = (id, name, description) => (
    <AlarmItem
      key={`Alarm-${name}-${id}`}
      id={`${id}`}
      name={name}
      description={description}
      alarmFormData={alarmFormData}
      setFormData={setFormData}
    />
  );

  const handleSubmit = () => {
    if (Object.keys(alarmFormData).length !== 0){
      dispatch(addSurveyItem( alarmFormData));
      setFormData({});
    }else{
      alert("Please fill in atleast one field");
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
    // ... (other items)
  ];

  const handleChange = (field, value, name) => {
    setFormData({
      ...alarmFormData,
      [`${name}_${field}`]: value,
    });
  };

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row>
          <Col xs={4}>
            <h2>Alarm:</h2>
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Make"
              id={`Alarmmake`}
              onChange={(e) => handleChange("make", e.target.value, "Alarm")}
              value={alarmFormData["Alarm_make"] || ""} //changed this line
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Model"
              id={`Alarmmodel`}
              onChange={(e) => handleChange("model", e.target.value, "Alarm")}
              value={alarmFormData["Alarm_model"] || ""} //changed this line
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

export default Alarm;
