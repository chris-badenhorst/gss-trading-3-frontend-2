import React, { useState, useEffect } from "react";
import { Row, Col, Form, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addSurveyItem, selectItems, addOther } from "../features/FormSlice";

const GarageMotor = () => {
  const [garagemotorFormData, setFormData] = useState({});
  const [other, setOther] = useState([]);
  const dispatch = useDispatch();
  const surveyItems = useSelector(selectItems);
  const handleSubmit = () => {
    if (Object.keys(garagemotorFormData).length !== 0) {
      dispatch(addSurveyItem(garagemotorFormData));
      setFormData({});
    } else {
      alert("Please fill in atleast one field");
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

  const handleChange = (field, value, name) => {
    setFormData({
      ...garagemotorFormData,
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
          <Col xs={3}>
            <h2>GarageMotor:</h2>
          </Col>
          <Col xs={3}>
            <Form.Control
              type="text"
              placeholder="Make"
              id={`GarageMotormake`}
              onChange={(e) =>
                handleChange("make", e.target.value, "GarageMotor")
              }
              value={garagemotorFormData["GarageMotor_make"] || ""} //changed this line
            />
          </Col>
          <Col xs={3}>
            <Form.Control
              type="text"
              placeholder="Model"
              id={`GarageMotormodel`}
              onChange={(e) =>
                handleChange("model", e.target.value, "GarageMotor")
              }
              value={garagemotorFormData["GarageMotor_model"] || ""} //changed this line
            />
          </Col>
          <Col xs={3}>
            <Form.Control
              as="select"
              placeholder="Type"
              id={`GarageMotortype`}
              onChange={(e) =>
                handleChange("type", e.target.value, "GarageMotor")
              }
              value={garagemotorFormData["GarageMotor_type"] || ""} //changed this line
            >
              <option value="" disabled>
                Select
              </option>
              <option vlaue="rollup">rollup</option>
              <option vlaue="single door">single door</option>
              <option vlaue="double door">double door</option>
            </Form.Control>
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col className="d-flex align-items-center my-1" md={2}>
            <strong>Other: </strong>
          </Col>

          <Col className="d-flex align-items-center my-1" md={10}>
            <Form.Control
              as="textarea"
              rows={5}
              id={`GarageMotor-other`}
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default GarageMotor;
