import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  nextForm,
  updateFormData,
  selectResponsibleEmployee,
  selectPremisesOccupiedOrVacant,
  selectPresentOnSite,
  selectSurveyNumber,
} from "../features/FormSlice";
import { selectName } from "../features/UserSlice";

const FormJobCard = () => {
  const name = useSelector(selectName);
  const survey_Number = useSelector(selectSurveyNumber);
  const presentOnSite = useSelector(selectPresentOnSite);
  const premisesOccupiedOrVacant = useSelector(selectPremisesOccupiedOrVacant);
  const [surveyResponsibleEmployee, setSurveyResponsibleEmployee] =
    useState(name);
  const [surveyPresentOnSite, setSurveyPresentOnSite] = useState(presentOnSite);
  const [surveyNumber, setSurveyNumber] = useState(survey_Number);
  const [surveyPremisesOccupiedOrVacant, setSurveypremisesOccupiedOrVacant] =
    useState(premisesOccupiedOrVacant);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [responsibleEmployeeColor, setResponsibleEmployeeColor] = useState("");
  const [surveyNumberColor, setSurveyNumberColor] = useState("");
  const [presentOnSiteColor, setPresentOnSiteColor] = useState("");
  const [premisesOccupiedOrVacantColor, setPremisesOccupiedOrVacantColor] =
    useState("");

  const handleInputChange = (field, value) => {
    dispatch(updateFormData({ field, value }));
  };

  const handlePresentOnSiteToggle = (value) => {
    let newPresentOnSite;

    if (!presentOnSite.includes(value)) {
      newPresentOnSite = [...presentOnSite, value];
    } else {
      newPresentOnSite = presentOnSite.filter((item) => item !== value);
    }

    handleInputChange("presentOnSite", newPresentOnSite);
    setSurveyPresentOnSite(newPresentOnSite);
  };
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  let yyyy = today.getFullYear();

  // Create the object with the correct structure
  useEffect(() => {
    const assessmentDate = {
      today: `${yyyy}-${mm}-${dd}`, // Format as YYYY-MM-DD
    };

    // Dispatch the action with the created object
    dispatch(updateFormData({ assessmentDate }));
  }, []);

  today = dd + "/" + mm + "/" + yyyy;

  const handleNext = () => {
    const emptyItems = [];
    if (presentOnSite.length === 0) {
      emptyItems.push("present On Site");
      setPresentOnSiteColor("red");
    }
    if (premisesOccupiedOrVacant === "") {
      emptyItems.push("premises Occupied Or Vacant");
      setPremisesOccupiedOrVacantColor("red");
    }
    if (surveyNumber === "") {
      emptyItems.push("survey number");
      setSurveyNumberColor("red");
    }
    if (surveyNumber[8]) {
      setErrorMessage("Invalid survey is more than 8 numbers");
      setSurveyNumberColor("red");
      setTimeout(() => {
        setSurveyNumberColor("");
      }, 2500);
    } else {
      if (emptyItems.length !== 0) {
        const message =
          "Please fill out the following: " + emptyItems.join(", ");
        setErrorMessage(message); // Set error message in state
        setTimeout(() => {
          setErrorMessage("");
          setResponsibleEmployeeColor("");
          setSurveyNumberColor("");
          setPremisesOccupiedOrVacantColor("");
          setPresentOnSiteColor("");
        }, 2500);
      } else {
        setErrorMessage("");
        dispatch(nextForm());
      }
    }
  };

  return (
    <div>
      {errorMessage && <Alert variant={"danger"}>{errorMessage}</Alert>}
      <Row>
        <Col xs={12}>
          <h1>JOB CARD / DAMAGE REPORT: </h1>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={4}>
          <Form.Group as={Col} controlId="assessmentDate">
            <Form.Label>Assessment Date:</Form.Label>
            <Form.Control type="text" disabled placeholder={today} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group as={Col} controlId="responsibleEmployee">
            <Form.Label>Responsible Employee:</Form.Label>
            <Form.Control
              type="text"
              style={{ backgroundColor: responsibleEmployeeColor }}
              value={surveyResponsibleEmployee}
              disabled={true}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group as={Col} controlId="surveyNumber">
            <Form.Label>Survey Number:</Form.Label>
            <Form.Control
              style={{ backgroundColor: surveyNumberColor }}
              value={surveyNumber}
              onChange={(e) => {
                handleInputChange("surveyNumber", e.target.value);
                setSurveyNumber(e.target.value);
              }}
              type="text"
              placeholder="Enter survey number"
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row className="mb-5">
        <Col xs={12}>
          <h4 style={{ backgroundColor: presentOnSiteColor }}>
            Present on Site:
          </h4>
          <Form.Group controlId="presentOnSite">
            <Form.Check
              id="mrCheckbox"
              checked={presentOnSite.includes("MR")}
              onChange={() => handlePresentOnSiteToggle("MR")}
              label="MR"
            />
            <Form.Check
              id="mrsCheckbox"
              checked={presentOnSite.includes("MRS")}
              onChange={() => handlePresentOnSiteToggle("MRS")}
              label="MRS"
            />
            <Form.Check
              id="tenantCheckbox"
              checked={presentOnSite.includes("TENANT")}
              onChange={() => handlePresentOnSiteToggle("TENANT")}
              label="TENANT"
            />
            <Form.Check
              id="workerCheckbox"
              checked={presentOnSite.includes("WORKER")}
              onChange={() => handlePresentOnSiteToggle("WORKER")}
              label="WORKER"
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row className="mb-5">
        <Col>
          <h4>Is the premises occupied or vacant: </h4>
        </Col>
        <Col>
          <Form.Group controlId="premisesOccupiedOrVacant">
            <Form.Control
              style={{ backgroundColor: premisesOccupiedOrVacantColor }}
              value={surveyPremisesOccupiedOrVacant}
              onChange={(e) => {
                handleInputChange("premisesOccupiedOrVacant", e.target.value);
                setSurveypremisesOccupiedOrVacant(e.target.value);
              }}
              as="select"
            >
              <option value="" disabled>
                select
              </option>
              <option value="occupied">occupied</option>
              <option value="vacant">vacant</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
};

export default FormJobCard;
