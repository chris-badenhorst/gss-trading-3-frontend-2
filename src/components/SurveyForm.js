import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GateMotor from "./GateMotor";
import GarageMotor from "./GarageMotor";
import ElectricFence from "./ElectricFence";
import Camera from "./Camera";
import SwimmingPoolPump from "./SwimmingPoolPump";
import BoreHole from "./BoreHole";
import Alarm from "./Alarm";
import { selectItems, previousForm, nextForm } from "../features/FormSlice";
import { useSelector, useDispatch } from "react-redux";

const SurveyForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const handleNext = () => {
    if (items.length === 0){
      alert("Please add at least one item");
    }else{
      dispatch(nextForm())
    }
  }

  const handlePrevious = () => {
    dispatch(previousForm())
  }
  return (
    <div>
      <Tabs
        defaultActiveKey="Gate Motor"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Gate Motor" title="Gate Motor">
          <GateMotor />
        </Tab>
        <Tab eventKey="Garage Motor" title="Garage Motor">
          <GarageMotor />
        </Tab>
        <Tab eventKey="Electric Fence" title="Electric Fence">
          <ElectricFence />
        </Tab>
        <Tab eventKey="Cameras" title="Cameras">
          <Camera />
        </Tab>
        <Tab eventKey="Alarm" title="Alarm">
          <Alarm />
        </Tab>
        <Tab eventKey="Swimming Pool Pump" title="Swimming Pool Pump">
          <SwimmingPoolPump />
        </Tab>
        <Tab eventKey="Bore Hole" title="Bore Hole">
          <BoreHole />
        </Tab>
      </Tabs>
      <Row>
        <Col xs={6}><Button onClick={handlePrevious}>&lt;|Prev</Button></Col>
        <Col className="d-flex justify-content-end" xs={6}><Button onClick={handleNext}>Next &gt;|</Button></Col>
      </Row>
    </div>
  );
};

export default SurveyForm;
