import React, { useState } from "react";
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
  selectOther,
  selectSurveyNumber,
} from "../features/FormSlice";

const FormComment = () => {
  const assessmentDate = useSelector(selectAssessmentDate);
  const responsibleEmployee = useSelector(selectResponsibleEmployee);
  const surveyNumber = useSelector(selectSurveyNumber);
  const presentOnSite = useSelector(selectPresentOnSite);
  const premisesOccupiedOrVacant = useSelector(selectPremisesOccupiedOrVacant);
  const surveyItems = useSelector(selectItems);
  const comment = useSelector(selectComment);
  const model = useSelector(selectModel);
  const other = useSelector(selectOther);
  const [surveyComment, setSurveyComment] = useState(comment);
  const dispatch = useDispatch();
  const handleInputChange = (field, value) => {
    dispatch(updateFormData({ field, value }));
  };

  const handleSubmit = () => {
    if (surveyComment === "") {
      alert("Please enter a comment");
    } else {
      dispatch(
        addSurvey({
          assessmentDate,
          responsibleEmployee,
          surveyNumber,
          presentOnSite,
          premisesOccupiedOrVacant,
          surveyItems,
          other,
          comment,
        })
      );
      dispatch(reset());
    }
  };
  const handlePrevious = () => {
    dispatch(previousForm());
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
      <Row>
        <Col>
          <Button className="mt-2 mb-5 " onClick={handleSubmit}>
            submit
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handlePrevious}>Previos</Button>
        </Col>
      </Row>
    </div>
  );
};

export default FormComment;
