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

const SurveyItem = ({
  id,
  name,
  description,
  alarmFormData,
  setFormData,
  SurveyName,
}) => {
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
      id={`${SurveyName}popover-${name}${id}`}
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
            id={`${SurveyName}present-${id}${name}`}
            onChange={(e) =>
              handleChange(`${SurveyName}--${name}--present`, e.target.checked)
            }
            label="Present"
            checked={alarmFormData[`${SurveyName}--${name}--present`] || false} //changed this line
          />
        </Col>

        <Col className="d-flex align-items-center my-1" md={2}>
          <Form.Check
            id={`${SurveyName}damaged-${id}${name}`}
            onChange={(e) =>
              handleChange(`${SurveyName}--${name}--damaged`, e.target.checked)
            }
            label="Damaged"
            checked={alarmFormData[`${SurveyName}--${name}--damaged`] || false} //changed this line
          />
        </Col>

        <Col className="my-1" md={2}>
          <Form.Control
            id={`${SurveyName}type-${id}${name}`}
            type="text"
            placeholder="Type"
            onChange={(e) =>
              handleChange(`${SurveyName}--${name}--type`, e.target.value)
            }
            value={alarmFormData[`${SurveyName}--${name}--type`] || ""} // added this line
          />
        </Col>

        <Col className="my-1" md={4}>
          <Form.Control
            id={`${SurveyName}findings-${id}${name}`}
            as="textarea"
            placeholder="Findings"
            onChange={(e) =>
              handleChange(`${SurveyName}--${name}--findings`, e.target.value)
            }
            value={alarmFormData[`${SurveyName}--${name}--findings`] || ""} // added this line
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const Survey = ({ SurveyName, SurveyItems }) => {
  const [alarmFormData, setFormData] = useState({});
  const [other, setOther] = useState([]);
  const [otherText, setOtherText] = useState("");
  const dispatch = useDispatch();
  const makeItem = (id, name, description) => (
    <SurveyItem
      key={`${SurveyName}-${name}-${id}`}
      id={`${SurveyName}${id}`}
      name={name}
      description={description}
      alarmFormData={alarmFormData}
      setFormData={setFormData}
      SurveyName={SurveyName}
    />
  );

  const handleSubmit = () => {
    console.log(otherText);
    setOtherText("");

    if (Object.keys(alarmFormData).length !== 0) {
      dispatch(addSurveyItem(alarmFormData));
      setFormData({});
    } else {
      alert("Please fill in at least one field");
    }

    if (other.length !== 0 && Array.isArray(other) && other[0].includes(".")) {
      other.forEach((item, index) => {
        const info = item.split(/(?<=\.)\s*/);
        const formattedString = `item: ${SurveyName}. name: ${info[0]} damaged: ${info[1]} type: ${info[2]} findings: ${info[3]}`;
        console.log(formattedString);
        dispatch(addOther(formattedString));
      });
    } else {
      if (other.includes(".")) {
        const info = other.split(/(?<=\.)\s*/);
        const formattedString = `item: ${SurveyName}. name: ${info[0]} damaged: ${info[1]} type: ${info[2]} findings: ${info[3]}`;
        console.log(formattedString);
        dispatch(addOther(formattedString));
      } else {
        if (other.length !== 0) {
          dispatch(
            addOther(`item: ${SurveyName}. Other description: ` + other)
          );
        }
      }
    }
  };
  const items = SurveyItems;

  const handleChange = (field, value, name) => {
    setFormData({
      ...alarmFormData,
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
            <h2>{`${SurveyName}`}:</h2>
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Make"
              id={`${SurveyName}mmake`}
              onChange={(e) =>
                handleChange("make", e.target.value, `${SurveyName}`)
              }
              value={alarmFormData[`${SurveyName}_make`] || ""} //changed this line
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Model"
              id={`${SurveyName}model`}
              onChange={(e) =>
                handleChange("model", e.target.value, `${SurveyName}`)
              }
              value={alarmFormData[`${SurveyName}_model`] || ""} //changed this line
            />
          </Col>
        </Row>
      </ListGroup.Item>

      {items.map(({ id, name, fix }) => makeItem(id, name, fix))}
      <ListGroup.Item>
        <Row>
          <Col className="d-flex align-items-center my-1" md={12}>
            <strong>Other: </strong>
          </Col>
          <Col className="d-flex align-items-center my-1" md={12}>
            <Form.Control
              value={otherText}
              as="textarea"
              rows={5}
              id={`${SurveyName}-other`}
              onChange={(e) => {
                handleOther(e.target.value);
                setOtherText(e.target.value);
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

export default Survey;
