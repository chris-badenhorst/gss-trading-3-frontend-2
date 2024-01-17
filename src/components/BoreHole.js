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

const BoreHoleItem = ({
  id,
  name,
  description,
  boreholeFormData,
  setFormData,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);

  const handleChange = (field, value) => {
    setFormData({
      ...boreholeFormData,
      [`${field}`]: value,
    });
  };

  const popover = (
    <Popover
      id={`BoreHolepopover-${name}${id}`}
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
            id={`BoreHolepresent-${id}`}
            onChange={(e) =>
              handleChange(`BoreHole--${name}--present`, e.target.checked)
            }
            label="Present"
            checked={boreholeFormData[`BoreHole--${name}--present`] || false} //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`BoreHoledamaged-${id}`}
            onChange={(e) =>
              handleChange(`BoreHole--${name}--damaged`, e.target.checked)
            }
            label="Damaged"
            checked={boreholeFormData[`BoreHole--${name}--damaged`] || false} //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`BoreHoletype-${id}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`BoreHole--${name}--type`, e.target.value)
            }
            value={boreholeFormData[`BoreHole--${name}--type`] || ""} // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`BoreHolefindings-${id}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(`BoreHole--${name}--findings`, e.target.value)
            }
            value={boreholeFormData[`BoreHole--${name}--findings`] || ""} // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const BoreHole = () => {
  const [boreholeFormData, setFormData] = useState({});
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  useEffect(() => {
    console.log(surveyItems);
  }, [surveyItems]);

  const makeItem = (id, name, description) => (
    <BoreHoleItem
      key={`BoreHole-${name}-${id}`}
      id={`${id}`}
      name={name}
      description={description}
      boreholeFormData={boreholeFormData}
      setFormData={setFormData}
    />
  );

  const handleSubmit = () => {
    if (Object.keys(boreholeFormData).length !== 0){
      dispatch(addSurveyItem(boreholeFormData));
      setFormData({});
    }else{
      alert("Please fill in atleast one field");}}
   

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

  const handleChange = (field, value, name) => {
    setFormData({
      ...boreholeFormData,
      [`${name}_${field}`]: value,
    });
  };

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row>
          <Col xs={4}>
            <h2>BoreHole:</h2>
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Make"
              id={`BoreHolemake`}
              onChange={(e) => handleChange("make", e.target.value, "BoreHole")}
              value={boreholeFormData["BoreHole_make"] || ""} //changed this line
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Model"
              id={`BoreHolemodel`}
              onChange={(e) =>
                handleChange("model", e.target.value, "BoreHole")
              }
              value={boreholeFormData["BoreHole_model"] || ""} //changed this line
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

export default BoreHole;
