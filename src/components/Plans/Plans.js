import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import "./Plans.css";
import { createClient } from "pexels";

function Plans(props) {
  console.log(props.getCities[0]);
  console.log(props.getPlans);
  const queryArray = props.getCities.map((city) => {
    return city.label;
  });
  const [photoURLs, changePhotoURL] = useState([]);
  const client = createClient(
    "563492ad6f917000010000010e9f50dfeb924fe08893bc636e659eb6"
  );
  queryArray.map((query) => {
    return client.photos.search({ query, per_page: 3 }).then((photoList) => {
      changePhotoURL((prev) => [...prev, photoList.photos]);
    });
  });

  return (
    <div>
      <div className="otherStates">
        <Form.Label>Budget: {props.getBudget}$</Form.Label>
        <Button variant="primary" size="sm" onClick={props.moveToBudget}>
          Change Budget
        </Button>
      </div>
      <div className="otherStates">
        <Form.Label>
          Cities:{" "}
          {props.getCities.map((city) => {
            return (
              <span className="selectedCities" key={city.id}>
                {city.label}
              </span>
            );
          })}
        </Form.Label>
        <Button variant="primary" size="sm" onClick={props.moveToCity}>
          Change Cities
        </Button>
      </div>
      <div className="plans">
        {props.getPlans.map((plan, index) => {
          return (
            <Row key={index}>
              {plan.map((p) => {
                return (
                  <Col xs="auto">
                    <Form.Label key={p.id}>
                      {p.count} x day(s) - {p.label}
                    </Form.Label>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
      <Carousel className="carou">
        {photoURLs.map((photoURL) => {
          return (
            <Carousel.Item>
              <img src={photoURL.src.medium} alt="First slide" />
              <Carousel.Caption>
                <h3>{queryArray[0]}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Plans;
