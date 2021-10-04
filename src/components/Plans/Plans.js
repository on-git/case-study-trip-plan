import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import "./Plans.css";
import { createClient } from "pexels";

function Plans(props) {
  /*const queryArray = props.getCities.map((city) => {
    return city.label;
  });*/
  //const [photoURLs, changePhotoURL] = useState([]);
  /*queryArray.map((query) => {
    return client.photos.search({ query, per_page: 3 }).then((photoList) => {
      changePhotoURL((prev) => [...prev, photoList.photos]);
    });
  });*/
  const [photoURL, changePhotoURL] = useState("");
  const query = props.getCities[0].label;
  const client = createClient(
    "563492ad6f917000010000010e9f50dfeb924fe08893bc636e659eb6"
  );
  client.photos.search({ query, per_page: 1 }).then((photoList) => {
    changePhotoURL(photoList.photos[0].src.medium);
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
        <Form.Label className="adjustFont">Trip Plan</Form.Label>
        {props.getPlans.map((plan) => {
          return plan.map((p) => {
            return (
              <Row>
                <Form.Label key={p.id}>
                  {p.count} x day(s) - {p.label} - {p.count * p.price}$
                </Form.Label>
              </Row>
            );
          });
        })}
      </div>
      <Carousel className="carou">
        <Carousel.Item>
          <img src={photoURL} alt="First City" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Plans;
