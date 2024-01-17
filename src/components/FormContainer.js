import React from "react";
import { Button } from "react-bootstrap";
import { nextForm, previousForm } from "../features/FormSlice";
import { useDispatch } from "react-redux";

const FormContainer = (children) => {
  const dispatch = useDispatch();
  const handlePrevious = () => dispatch(previousForm());
  const handleNext = () => dispatch(nextForm());

  return (
    <div>
      {children}
      <div>
        <Button
          variant="primary"
          onClick={handlePrevious}
          id="uniquePreviousButton"
        >
          Previous
        </Button>
        <Button variant="primary" onClick={handleNext} id="uniqueNextButton">
          Next
        </Button>
      </div>
    </div>
  );
};

export default FormContainer;
