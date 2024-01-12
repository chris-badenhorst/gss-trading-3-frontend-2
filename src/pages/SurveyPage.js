import React from "react";
import { Container } from "react-bootstrap";
import JobCardHeader from "../components/JobCardHeader";
import GarageMotor from "../components/GarageMotor";
import GateMotor from "../components/GateMotor";
import ElectricFence from "../components/ElectricFence";
import Camera from "../components/Camera";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alarm from "../components/Alarm";
import SwimmingPoolPump from "../components/SwimmingPoolPump";
import BoreHole from "../components/BoreHole";

const SurveyPage = () => {
  const number = 4;

  return (
    <Container>
      <JobCardHeader />
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
    </Container>
  );
};

export default SurveyPage;
