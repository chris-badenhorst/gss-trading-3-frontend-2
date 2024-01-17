import React, {useEffect} from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { getSurveys, selectLoading, selectObjects, selectError, selectResponse } from "../features/FormSlice";
import { useDispatch, useSelector } from "react-redux";


const QuotePage = () => {

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const objects = useSelector(selectObjects);
  const error = useSelector(selectError);
  const response = useSelector(selectResponse);
  const handleLoad = () => {
    dispatch(getSurveys());
    console.log(response)
  }




  return (
    <Container>
      {response && response.map((item) => (
        <>
        <hr/>
        <h2>Survey: {item.id}</h2>
        <Table striped bordered hover variant="primary" key={item.id}>
          <tbody>
            <tr>
              <td>Assessment Date</td>
              <td>{loading ? "Loading..." : error ? error : item.assessment_date}</td>
            </tr>
            <tr>
              <td>Responsible Employee</td>
              <td>{loading ? "Loading..." : error ? error : item.responsible_employee}</td>
            </tr>
            <tr>
              <td>Present on Site</td>
              <td>{loading ? "Loading..." : error ? error : item.present_on_site}</td>
            </tr>
            <tr>
              <td>Premises Occupied or Vacant</td>
              <td>{loading ? "Loading..." : error ? error : item.premisis_occupaid_vacant}</td>
            </tr>
            <tr>
              <td>Survey Items</td>
              <td>
                {loading ? "Loading..." :
                  error ? error :
                    item.survey_items && item.survey_items.map((surveyItem, index) => (
                      <div key={index}>
                        {Object.entries(surveyItem).map(([key, value]) => (
                          <Row key={key}>
                            <Col xs={6}>{key}:</Col>
                            <Col xs={6}>{String(value)}</Col>                       
                           </Row>
                        ))}
                        <hr />
                      </div>
                    ))
                }
              </td>
            </tr>
            <tr>
              <td>Comment</td>
              <td>{loading ? "Loading..." : error ? error : item.comment}</td>
            </tr>
          </tbody>
          
        </Table>
        </>
      ))}
      <Button onClick={handleLoad}>Load</Button>
    </Container>
  );
};


export default QuotePage;
