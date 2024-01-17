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

const SwimmingPoolPumpItem = ({
  id,
  name,
  description,
  swimmingpoolpumpFormData,
  setFormData,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);

  const handleChange = (field, value) => {
    setFormData({
      ...swimmingpoolpumpFormData,
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
            id={`SwimmingPoolPumppresent-${id}`}
            onChange={(e) =>
              handleChange(`SwimmingPoolPump--${name}--present`, e.target.checked)
            }
            label="Present"
            checked={
              swimmingpoolpumpFormData[`SwimmingPoolPump--${name}--present`] ||
              false
            } //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`SwimmingPoolPumpdamaged-${id}`}
            onChange={(e) =>
              handleChange(`SwimmingPoolPump--${name}--damaged`, e.target.checked)
            }
            label="Damaged"
            checked={
              swimmingpoolpumpFormData[`SwimmingPoolPump--${name}--damaged`] ||
              false
            } //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`SwimmingPoolPumptype-${id}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`SwimmingPoolPump--${name}--type`, e.target.value)
            }
            value={
              swimmingpoolpumpFormData[`SwimmingPoolPump--${name}--type`] || ""
            } // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`SwimmingPoolPumpfindings-${id}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(
                `SwimmingPoolPump--${name}--findings`,
                e.target.value
              )
            }
            value={
              swimmingpoolpumpFormData[`SwimmingPoolPump--${name}--findings`] ||
              ""
            } // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const SwimmingPoolPump = () => {
  const [swimmingpoolpumpFormData, setFormData] = useState({});
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  useEffect(() => {
    console.log(surveyItems);
  }, [surveyItems]);

  const makeItem = (id, name, description) => (
    <SwimmingPoolPumpItem
      key={`SwimmingPoolPump-${name}-${id}`}
      id={`${id}`}
      name={name}
      description={description}
      swimmingpoolpumpFormData={swimmingpoolpumpFormData}
      setFormData={setFormData}
    />
  );

  const handleSubmit = () => {
    if (Object.keys(swimmingpoolpumpFormData).length !== 0){
      dispatch(addSurveyItem(swimmingpoolpumpFormData));
      setFormData({});
    }else{
      alert("Please fill in atleast one field");}}

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

  const handleChange = (field, value, name) => {
    setFormData({
      ...swimmingpoolpumpFormData,
      [`${name}_${field}`]: value,
    });
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
              value={swimmingpoolpumpFormData["SwimmingPoolPump_make"] || ""} //changed this line
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
              value={swimmingpoolpumpFormData["SwimmingPoolPump_model"] || ""} //changed this line
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

export default SwimmingPoolPump;
