import React, { useEffect } from "react";
import { Container, Row, Col, Table, Button, ListGroup } from "react-bootstrap";
import {
  getSurveys,
  selectLoading,
  selectObjects,
  selectError,
  selectResponse,
  deleteSurvey,
} from "../features/FormSlice";
import { useDispatch, useSelector } from "react-redux";

const QuotePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const objects = useSelector(selectObjects);
  const error = useSelector(selectError);
  const response = useSelector(selectResponse);

  const handleLoad = () => {
    dispatch(getSurveys());
    console.log(response);
  };
  const handleDelete = (id) => {
    dispatch(deleteSurvey(id));
    setTimeout(() => {
      dispatch(getSurveys());
    }, 150);
  };

  return (
    <Container>
      {response &&
        response.map((item) => (
          <div key={item.id}>
            <hr />
            <Row>
              <Col xs={6}>
                <h2>Survey: {item.id}</h2>
              </Col>
              <Col xs={6} className="d-flex justify-content-end">
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="danger"
                  className="my-2"
                >
                  Delete
                </Button>
              </Col>
            </Row>

            <Table striped bordered hover variant="primary">
              <tbody>
                <tr>
                  <td>Assessment Date</td>
                  <td>
                    {loading
                      ? "Loading..."
                      : error
                      ? error
                      : item.assessment_date}
                  </td>
                </tr>
                <tr>
                  <td>Responsible Employee</td>
                  <td>
                    {loading
                      ? "Loading..."
                      : error
                      ? error
                      : item.responsible_employee}
                  </td>
                </tr>
                <tr>
                  <td>Survey Number</td>
                  <td>
                    {loading
                      ? "Loading..."
                      : error
                      ? error
                      : item.survey_number}
                  </td>
                </tr>
                <tr>
                  <td>Present on Site</td>
                  <td>
                    {loading
                      ? "Loading..."
                      : error
                      ? error
                      : item.present_on_site}
                  </td>
                </tr>
                <tr>
                  <td>Premises Occupied or Vacant</td>
                  <td>
                    {loading
                      ? "Loading..."
                      : error
                      ? error
                      : item.premisis_occupaid_vacant}
                  </td>
                </tr>
                <tr>
                  <td>Survey Items</td>
                  <td>
                    {loading
                      ? "Loading..."
                      : error
                      ? error
                      : item.survey_items &&
                        item.survey_items.map((surveyItem, index) => (
                          <div key={index}>
                            {Object.entries(surveyItem).map(([key, value]) => (
                              <Row key={key}>
                                <Col xs={6}>{key}:</Col>
                                <Col xs={6}>{String(value)}</Col>
                              </Row>
                            ))}
                            <hr />
                          </div>
                        ))}
                  </td>
                </tr>
                <tr>
                  <td>other:</td>
                  <td>
                    {loading ? (
                      "Loading..."
                    ) : error ? (
                      error
                    ) : Array.isArray(item.other_items) &&
                      item.other_items.length > 0 ? (
                      <ListGroup>
                        {item.other_items.map((item_info, index) => {
                          if (item_info.includes(".")) {
                            const info = item_info.split(".");
                            return (
                              <ListGroup.Item variant="dark" key={index}>
                                {info[0]} <br />
                                {info[1]} <br />
                                {info[2]} <br />
                                {info[3]}
                              </ListGroup.Item>
                            );
                          } else {
                            return (
                              <ListGroup.Item variant="dark" key={index}>
                                {item_info}
                              </ListGroup.Item>
                            );
                          }
                        })}
                      </ListGroup>
                    ) : (
                      <Row>{item.other_items}</Row>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Comment</td>
                  <td>
                    {loading ? "Loading..." : error ? error : item.comment}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))}
      <Button onClick={handleLoad}>Load</Button>
    </Container>
  );
};

export default QuotePage;
