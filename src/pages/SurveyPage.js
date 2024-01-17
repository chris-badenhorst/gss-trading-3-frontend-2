import React from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { nextForm, previousForm } from "../features/FormSlice";
import FormJobCard from "../components/FormJobCard";
import SurveyForm from "../components/SurveyForm";
import FormComment from "../components/FormComment";

const SurveyPage = () => {
  const currentForm = useSelector((state) => state.form.form);
  const assessmentDate = useSelector((state) => state.form.assessmentDate);

  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(nextForm());
    console.log(assessmentDate);
  };

  const handlePrevious = () => {
    dispatch(previousForm());
  };

  const renderFormStep = () => {
    switch (currentForm) {
      case 1:
        return <FormJobCard />;
      case 2:
        return <SurveyForm />;
      case 3:
        return <FormComment />;
      default:
        return null;
    }
  };

  return (
    <Container>
      {renderFormStep()}
    </Container>
  );
};

export default SurveyPage;
