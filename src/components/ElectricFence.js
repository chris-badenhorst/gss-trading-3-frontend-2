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

const ElectricFenceItem = ({
  id,
  name,
  description,
  electricfenceFormData,
  setFormData,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);

  const handleChange = (field, value) => {
    setFormData({
      ...electricfenceFormData,
      [`${field}`]: value,
    });
  };

  const popover = (
    <Popover
      id={`ElectricFencepopover-${name}${id}`}
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
            id={`ElectricFencepresent-${id}`}
            onChange={(e) =>
              handleChange(`ElectricFence--${name}--present`, e.target.checked)
            }
            label="Present"
            checked={
              electricfenceFormData[`ElectricFence--${name}--present`] || false
            } //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`ElectricFencedamaged-${id}`}
            onChange={(e) =>
              handleChange(`ElectricFence--${name}--damaged`, e.target.checked)
            }
            label="Damaged"
            checked={
              electricfenceFormData[`ElectricFence--${name}--damaged`] || false
            } //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`ElectricFencetype-${id}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`ElectricFence--${name}--type`, e.target.value)
            }
            value={electricfenceFormData[`ElectricFence--${name}--type`] || ""} // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`ElectricFencefindings-${id}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(`ElectricFence--${name}--findings`, e.target.value)
            }
            value={
              electricfenceFormData[`ElectricFence--${name}--findings`] || ""
            } // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const ElectricFence = () => {
  const [electricfenceFormData, setFormData] = useState({});
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  useEffect(() => {
    console.log(surveyItems);
  }, [surveyItems]);

  const makeItem = (id, name, description) => (
    <ElectricFenceItem
      key={`ElectricFence-${name}-${id}`}
      id={`${id}`}
      name={name}
      description={description}
      electricfenceFormData={electricfenceFormData}
      setFormData={setFormData}
    />
  );

  const handleSubmit = () => {
    if (Object.keys(electricfenceFormData).length !== 0){
      dispatch(addSurveyItem(electricfenceFormData));
      setFormData({});
    }else{
      alert("Please fill in atleast one field");}}

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

  const handleChange = (field, value, name) => {
    setFormData({
      ...electricfenceFormData,
      [`${name}_${field}`]: value,
    });
  };

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row>
          <Col xs={4}>
            <h2>ElectricFence:</h2>
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Make"
              id={`ElectricFencemake`}
              onChange={(e) =>
                handleChange("make", e.target.value, "ElectricFence")
              }
              value={electricfenceFormData["ElectricFence_make"] || ""} //changed this line
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Model"
              id={`ElectricFencemodel`}
              onChange={(e) =>
                handleChange("model", e.target.value, "ElectricFence")
              }
              value={electricfenceFormData["ElectricFence_model"] || ""} //changed this line
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

export default ElectricFence;
