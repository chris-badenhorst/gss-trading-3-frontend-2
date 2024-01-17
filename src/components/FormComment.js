import React, {useState} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData,
  selectResponsibleEmployee,
  selectAssessmentDate,
  selectComment,
  selectItems,
  selectMake,
  selectModel,
  selectPremisesOccupiedOrVacant,
  selectPresentOnSite,
  addSurvey,
  reset,
  previousForm,
} from "../features/FormSlice";

const FormComment = () => {
  
  const assessmentDate = useSelector(selectAssessmentDate);
  const responsibleEmployee = useSelector(selectResponsibleEmployee);
  const presentOnSite = useSelector(selectPresentOnSite);
  const premisesOccupiedOrVacant = useSelector(selectPremisesOccupiedOrVacant);
  const surveyItems = useSelector(selectItems);
  const comment = useSelector(selectComment);
  const model = useSelector(selectModel);
  const make = useSelector(selectMake);
  const [surveyComment, setSurveyComment] = useState(comment);
  const dispatch = useDispatch();
  const handleInputChange = (field, value) => {
    dispatch(updateFormData({ field, value }));
  };

  const handleSubmit = () => {
    if (surveyComment === ""){
      alert("Please enter a comment");
    }else{
      dispatch(addSurvey({assessmentDate, responsibleEmployee, presentOnSite, premisesOccupiedOrVacant,surveyItems,comment }))
      dispatch(reset())
    }
    
  };
  const handlePrevious = () => {
    dispatch(previousForm())
  };

  return (
    <div>
      <h2>Comment</h2>{" "}
      <Form.Control
        as="textarea"
        rows="3"
        value={surveyComment}
        onChange={(e) => {
          
          handleInputChange("comment", e.target.value);
          setSurveyComment(e.target.value);
        }}
        id="uniqueCommentTextarea"
      />
      <Button onClick={handleSubmit}>submit</Button>
      <Row>
        <Col>
          <Button onClick={handlePrevious}>Previos</Button>
        </Col>
      </Row>
    </div>
  );
};

export default FormComment;
