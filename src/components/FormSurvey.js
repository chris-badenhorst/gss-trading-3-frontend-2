import React from "react";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GateMotor from "./GateMotor";
import GarageMotor from "./GarageMotor";
import ElectricFence from "./ElectricFence";
import Camera from "./Camera";
import SwimmingPoolPump from "./SwimmingPoolPump";
import BoreHole from "./BoreHole";
import Alarm from "./Alarm";
import { nextForm, previousForm } from "../features/FormSlice";

const FormSurvey = () => {
  return (
    <div>
      <Tabs defaultActiveKey="Gate Motor" id="uniqueFormTabs" className="mb-3">
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
    </div>
  );
};

export default FormSurvey;
