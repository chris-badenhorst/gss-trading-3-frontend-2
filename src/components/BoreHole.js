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

const BoreHoleItem = ({
  id,
  name,
  description,
  BoreHoleFormData,
  setFormData,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);

  const handleChange = (field, value) => {
    setFormData({
      ...BoreHoleFormData,
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
            id={`BoreHolepresent-${id}${name}`}
            onChange={(e) =>
              handleChange(`BoreHole--${name}--present`, e.target.checked)
            }
            label="Present"
            checked={BoreHoleFormData[`BoreHole--${name}--present`] || false} //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`BoreHoledamaged-${id}${name}`}
            onChange={(e) =>
              handleChange(`BoreHole--${name}--damaged`, e.target.checked)
            }
            label="Damaged"
            checked={BoreHoleFormData[`BoreHole--${name}--damaged`] || false} //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`BoreHoletype-${id}${name}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`BoreHole--${name}--type`, e.target.value)
            }
            value={BoreHoleFormData[`BoreHole--${name}--type`] || ""} // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`BoreHolefindings-${id}${name}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(`BoreHole--${name}--findings`, e.target.value)
            }
            value={BoreHoleFormData[`BoreHole--${name}--findings`] || ""} // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const BoreHole = () => {
  const [BoreHoleFormData, setFormData] = useState({});
  const [other, setOther] = useState([]);
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  const otherItems = useSelector(selectOther);
  const makeItem = (id, name, description) => (
    <BoreHoleItem
      key={`BoreHole-${name}-${id}`}
      id={`${id}`}
      name={name}
      description={description}
      BoreHoleFormData={BoreHoleFormData}
      setFormData={setFormData}
    />
  );

  const handleSubmit = () => {
    if (Object.keys(BoreHoleFormData).length !== 0) {
      dispatch(addSurveyItem(BoreHoleFormData));
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
      ...BoreHoleFormData,
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
            <h2>BoreHole:</h2>
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Make"
              id={`BoreHolemake`}
              onChange={(e) => handleChange("make", e.target.value, "BoreHole")}
              value={BoreHoleFormData["BoreHole_make"] || ""} //changed this line
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
              value={BoreHoleFormData["BoreHole_model"] || ""} //changed this line
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
              id={`BoreHole-other`}
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

export default BoreHole;
