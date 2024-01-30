import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import GarageMotor from "./GarageMotor";
import { selectItems, previousForm, nextForm } from "../features/FormSlice";

import { useSelector, useDispatch } from "react-redux";
import Survey from "./Survey";

const SurveyForm = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const alarm = [
    {
      id: 1,
      name: "Power Supply",
      fix: "Check power supply and ensure proper functioning. Use a multimeter to measure voltage.",
    },
    {
      id: 2,
      name: "Battery",
      fix: "Test and replace the backup battery if needed. Use a battery tester to assess capacity.",
    },
    {
      id: 3,
      name: "Panel",
      fix: "Examine the main control panel for issues and verify secure connections. Tighten loose connections and inspect for physical damage.",
    },
    {
      id: 4,
      name: "Keypad",
      fix: "Test keypad functionality and check connections. Clean keypad contacts and inspect for visible damage.",
    },
    {
      id: 5,
      name: "PIR (Indoor/Outdoor)",
      fix: "Test PIR motion sensors and ensure proper positioning. Adjust sensor angles and check for obstructions.",
    },
    {
      id: 6,
      name: "Receiver",
      fix: "Inspect the receiver unit for signal reception and antenna integrity. Realign or replace the antenna if necessary.",
    },
    {
      id: 7,
      name: "Expander",
      fix: "Inspect and test additional modules connected to the system. Ensure proper module connections and functionality.",
    },
    {
      id: 8,
      name: "Wiring",
      fix: "Examine system wiring for damage, loose connections, or shorts. Replace damaged wires and secure connections.",
    },
    {
      id: 9,
      name: "Zones/Devices",
      fix: "Check individual zones and devices for proper configuration. Reconfigure settings as needed.",
    },
    {
      id: 10,
      name: "Communication Module",
      fix: "Verify operational status of the communication module. Reboot or replace the module if communication issues persist.",
    },
  ];

  const boreHole = [
    {
      id: 1,
      name: "Depth Measurement",
      fix: "Measure the borehole depth using appropriate tools and ensure it aligns with the specifications. Use depth measurement equipment.",
    },
    {
      id: 2,
      name: "Cabling ",
      fix: "Inspect MSM cabling for wear, damage, or loose connections, checking for signs of rodent or environmental damage. Replace damaged cables and secure connections.",
    },
    {
      id: 3,
      name: "Controller",
      fix: "Inspect the borehole controller for power supply issues, loose connections, physical damage, and ensure appropriate settings. Use a multimeter to check power supply and tighten loose connections.",
    },
    {
      id: 4,
      name: "Receiver ",
      fix: "Test the receiver unit for functionality and check communication between the controller and receiver. Reboot the receiver if needed.",
    },
    {
      id: 5,
      name: "DB Board",
      fix: "Examine the DB Board for tripped breakers, burnt components, or loose connections, ensuring electrical connections are secure. Reset tripped breakers and replace damaged components as necessary.",
    },
    {
      id: 6,
      name: "Power Supply ",
      fix: "Verify the power supply to the borehole system and check for issues with the power source or electrical supply. Use a multimeter to measure power output and address power source issues.",
    },
    {
      id: 7,
      name: "Pump ",
      fix: "Inspect the submersible pump for mechanical issues and check for blockages in the pump or borehole. Remove blockages and lubricate moving parts.",
    },
    {
      id: 8,
      name: "Motor ",
      fix: "Inspect the submersible motor for mechanical issues and check for blockages in the pump or borehole. Lubricate moving parts and ensure proper motor function.",
    },
  ];
  const camera = [
    {
      id: 1,
      name: "DVR ",
      fix: "Verify power supply, check connections, and reboot the DVR if necessary. Ensure the DVR is functioning correctly. Use a multimeter to measure power output.",
    },
    {
      id: 2,
      name: "DVR-Channel ",
      fix: "Check for error messages on specific channels, ensure proper camera connections, and troubleshoot individual channel settings. Reboot the DVR if issues persist.",
    },
    {
      id: 3,
      name: "Camera",
      fix: "Re-seat connections, clean camera lenses, and check for proper power supply. Replace or repair malfunctioning cameras. Use lens cleaning kit for maintenance.",
    },
    {
      id: 4,
      name: "BNC Connectors",
      fix: "Re-attach or replace damaged BNC connectors. Ensure proper termination and secure connections. Use a BNC crimping tool for replacements.",
    },
    {
      id: 5,
      name: "Flyleets",
      fix: "Test flyleets for proper functioning. Replace malfunctioning flyleets as needed.",
    },
    {
      id: 6,
      name: "Cabling",
      fix: "Replace damaged cables, ensure proper cable routing, and check for signal continuity. Test flyleets for proper functioning. Use cable tester for continuity checks.",
    },
    {
      id: 7,
      name: "Power Supply",
      fix: "Use a multimeter to measure power output. Replace faulty power supplies or connectors. Ensure stable and adequate power to all components.",
    },
    {
      id: 8,
      name: "Baluns",
      fix: "Re-seat connectors, replace damaged baylens, and ensure proper signal transmission through baluns. Use a screwdriver for re-seating and replacements.",
    },
    {
      id: 9,
      name: "Network ",
      fix: "Ensure network cables are connected properly, check IP configurations, and troubleshoot any network-related issues. Verify that the cameras can be accessed remotely if needed. Use a network cable tester for checking connections.",
    },
  ];

  const electric = [
    {
      id: 1,
      name: "Energizer",
      fix: "Check the energizer or the electric fence charger first. Ensure it's powered, and there are no issues with the unit itself. Use a multimeter for power verification.",
    },
    {
      id: 2,
      name: "Battery",
      fix: "Verify the condition of the battery powering the energizer. A weak or dead battery can lead to a loss of power. Use a battery tester for assessment.",
    },
    {
      id: 3,
      name: "HT-cable",
      fix: "Inspect the high-tension (HT) cable connecting the energizer to the fence. Look for any visible damage or loose connections. Replace damaged cables and secure connections.",
    },
    {
      id: 4,
      name: "Poles",
      fix: "Examine the fence poles for stability and proper spacing. A leaning or damaged pole can affect the fence's overall integrity. Reinforce or replace damaged poles.",
    },
    {
      id: 5,
      name: "Earthspikes",
      fix: "Ensure the earthspikes are properly installed and making good contact with the ground. Inadequate grounding can lead to the fence not working correctly. Improve grounding if necessary.",
    },
    {
      id: 6,
      name: "Warning Signs",
      fix: "Confirm the presence of warning signs. Missing or damaged signs can compromise safety and compliance. Replace missing or damaged signs.",
    },
    {
      id: 7,
      name: "Amount Lines",
      fix: "Check the number of fence lines and ensure they match the system's design. Missing or extra lines can cause issues. Adjust the number of lines to match the design.",
    },
    {
      id: 8,
      name: "Bobins",
      fix: "Inspect the insulators or bobins that secure the electric wires to the fence. Damaged insulators can result in a loss of electrical contact. Replace damaged insulators.",
    },
    {
      id: 9,
      name: "Tensioners",
      fix: "Assess the tensioners to make sure the wires are adequately tensioned. Loose wires can reduce the fence's effectiveness. Adjust tensioners as needed.",
    },
    {
      id: 10,
      name: "Keypad",
      fix: "If there's an access control system, check the keypad for any faults or malfunctions. Clean and repair the keypad as needed.",
    },
    {
      id: 11,
      name: "Gate Contact",
      fix: "Examine the gate contact for proper installation and functionality. Ensure it's making a good connection when the gate is closed. Adjust or replace the gate contact if necessary.",
    },
    {
      id: 12,
      name: "Magnet",
      fix: "If there's a magnetic switch for the gate, check its alignment and functionality. Adjust or replace the magnet if necessary.",
    },
    {
      id: 13,
      name: "S-Hooks",
      fix: "Inspect the S-hooks for secure attachment of wires and components. Replace any loose or damaged S-hooks.",
    },
    {
      id: 14,
      name: "Farrels",
      fix: "Inspect the farrels for secure attachment of wires and components. Replace any loose or damaged farrels.",
    },
    {
      id: 15,
      name: "Receiver",
      fix: "If the system has a remote control or receiver, check its functionality and programming. Reconfigure or replace the receiver if needed.",
    },
  ];
  const gate = [
    {
      id: 1,
      name: "Anti Theft",
      fix: "Verify the functionality of the anti-theft mechanism. Adjust or replace components as necessary. Lubricate moving parts for smooth operation.",
    },
    {
      id: 2,
      name: "Lock",
      fix: "Test the lock mechanism for proper engagement and disengagement. Replace or lubricate the lock if needed. Ensure proper alignment of the lock.",
    },
    {
      id: 3,
      name: "Lid",
      fix: "Inspect the lid for any damage. Replace if necessary. Ensure the lid is securely in place.",
    },
    {
      id: 4,
      name: "Door Lock",
      fix: "Check the functionality of the door lock. Ensure it securely locks and unlocks. Repair or replace components as needed. Lubricate moving parts.",
    },
    {
      id: 5,
      name: "Pc Board",
      fix: "Inspect the main control board (PC Board) for visible damage. Check for loose connections and ensure all wiring is intact. Replace the PC Board if any components are faulty.",
    },
    {
      id: 6,
      name: "Power Supply",
      fix: "Use a multimeter to test the voltage at the gate motor's power supply input. If there is no power, check the circuit breaker or power source. Repair or replace the power supply components if necessary.",
    },
    {
      id: 7,
      name: "Battery",
      fix: "Check the battery voltage with a multimeter. If the battery is weak or dead, replace it with a fully charged one. Ensure proper battery connections.",
    },
    {
      id: 8,
      name: "Dos",
      fix: "Test and inspect the dosing system. Replace any faulty components or adjust settings as needed. Ensure proper dosing for smooth operation.",
    },
    {
      id: 9,
      name: "Casing",
      fix: "Inspect the outer casing for any visible damage or signs of wear. Replace or repair the casing as needed. Ensure the casing protects components adequately.",
    },
    {
      id: 10,
      name: "Reciever",
      fix: "Test the receiver unit with a compatible remote control. If it's not responding, replace the receiver unit. Ensure proper wiring and connections for effective communication.",
    },
    {
      id: 11,
      name: "Cable",
      fix: "Inspect the cables connecting various components. Check for damaged cables or loose connections. Replace damaged cables and secure connections. Ensure proper cable routing.",
    },
    {
      id: 12,
      name: "Wheels",
      fix: "Check the wheels for smooth operation. Lubricate or replace them if there is resistance or damage. Ensure proper alignment of the wheels.",
    },
    {
      id: 13,
      name: "Rack",
      fix: "Inspect the rack for proper alignment and any damage. Adjust or replace if necessary. Ensure the rack supports the gate movement smoothly.",
    },
    {
      id: 14,
      name: "i-5 beams",
      fix: "Check the infrared beams for proper alignment. Clean and align them, or replace if they are damaged. Ensure clear communication between beams.",
    },
    {
      id: 15,
      name: "Gate Contact",
      fix: " Ensure the gate contact is making a good connection when the gate is closed. Adjust or replace the gate contact if necessary. Ensure proper alignment with the gate.",
    },
    {
      id: 16,
      name: "Light",
      fix: "Test the light component. If it's not working, replace the light bulb or the entire light assembly. Check and repair wiring as needed. Ensure proper visibility in low-light conditions.",
    },
    {
      id: 17,
      name: "Day night",
      fix: "Ensure the day/night sensor is clean and unobstructed. Adjust sensitivity settings or replace if it's not functioning correctly. Ensure reliable day/night detection.",
    },
  ];

  const swimming = [
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
  ];

  const handleNext = () => {
    if (items.length === 0) {
      alert("Please add at least one item");
    } else {
      dispatch(nextForm());
    }
  };

  const handlePrevious = () => {
    dispatch(previousForm());
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="Gate Motor"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Gate Motor" title="Gate Motor">
          <Survey SurveyName={"Gate-Motor"} SurveyItems={gate} />
        </Tab>
        <Tab eventKey="Garage Motor" title="Garage Motor">
          <GarageMotor />
        </Tab>
        <Tab eventKey="Electric-Fence" title="Electric Fence">
          <Survey SurveyName={"Electric-Fence"} SurveyItems={electric} />
        </Tab>
        <Tab eventKey="Cameras" title="Cameras">
          <Survey SurveyName={"Camera"} SurveyItems={camera} />
        </Tab>
        <Tab eventKey="Alarm" title="Alarm">
          <Survey SurveyName={"Alarm"} SurveyItems={alarm} />
        </Tab>
        <Tab eventKey="Swimming Pool Pump" title="Swimming Pool Pump">
          <Survey SurveyName={"Swimming-Pool-Pump"} SurveyItems={swimming} />
        </Tab>
        <Tab eventKey="Bore Hole" title="Bore Hole">
          <Survey SurveyName={"Bore-Hole"} SurveyItems={boreHole} />
        </Tab>
      </Tabs>
      <Row>
        <Col xs={6}>
          <Button onClick={handlePrevious}>&lt;|Prev</Button>
        </Col>
        <Col className="d-flex justify-content-end" xs={6}>
          <Button onClick={handleNext}>Next &gt;|</Button>
        </Col>
      </Row>
    </div>
  );
};

export default SurveyForm;
