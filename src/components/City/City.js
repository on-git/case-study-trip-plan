import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { cityList } from "../../CityList";
import "./City.css";

function City(props) {
  const [cityArr, changeArr] = useState([]);
  const [budgetAlert, showBudgetAlert] = useState(false);
  const [cityAlert, showCityAlert] = useState(false);
  const fillCityArray = (checkedStat, city) => {
    if (checkedStat) {
      changeArr((prevArr) => [...prevArr, city]);
    } else {
      const newList = cityArr?.filter((item) => item.label !== city.label);
      changeArr(newList);
    }
  };
  const onSendCities = () => {
    const sum = cityArr.reduce((p_sum, a) => p_sum + a.price, 0);
    if (cityArr.length < 3) {
      showCityAlert(true);
    } else if (sum > props.getBudget) {
      showBudgetAlert(true);
    } else if (cityArr.length >= 3) {
      const newArr = cityArr.sort((a, b) => {
        return b.price - a.price;
      });
      prepareTravelList(newArr);
      props.onCities(newArr);
      props.moveToPlans();
    }
  };
  const prepareTravelList = (arr) => {
    let arrIndex = 0;
    let total = 0;
    const listCities = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].count = 0;
    }
    for (let i = 0; i < arr.length; i++) {
      total += arr[i].price;
      arr[i].count++;
    }
    otherFunc(total, arrIndex, arr);
    listCities.push([...arr]);
    /*let c = 1;
    let j = 1;
    for (let i = 0; i < arr.length - 1; i++) {
      listCities.push([...listCities[j - 1]]);
      if (c === 3) break;
      if (listCities[j][i].count > 1) {
        listCities[j][i].count -= 1;
        const val = cityList.findIndex((cit) => {
          return cit.label === listCities[j][i].label;
        });
        total -= cityList[val].price;
        console.log(total);
        arrIndex += 1;
        otherFunc(total, arrIndex, listCities[j]);
        //listCities.push([...arr]);
        c++;
        //arr[i].count += 1;
        j++;
      }
    }*/
    props.onPlans(listCities);
  };
  const otherFunc = (tot, arrIndex, tempArr) => {
    let index = arrIndex;
    for (tot; tot < props.getBudget; ) {
      if (props.getBudget - tot < tempArr[tempArr.length - 1].price) {
        break;
      }
      if (tot + tempArr[index].price <= props.getBudget) {
        tot += tempArr[index].price;
        tempArr[index].count++;
      }
      if (index === tempArr.length - 1) {
        index = arrIndex;
      } else {
        index++;
      }
    }
  };
  return (
    <div>
      <Modal show={budgetAlert} centered>
        <Modal.Body>
          <p>You do not have enough budget for those cities!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => showBudgetAlert(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={cityAlert} centered>
        <Modal.Body>
          <p>You should select 3 or more cities!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => showCityAlert(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <div className="budgetState">
        <Form.Label>Budget: {props.getBudget}$</Form.Label>
        <Button variant="primary" size="sm" onClick={props.moveToBudget}>
          Change Budget
        </Button>
      </div>
      <Form.Label>Select Cities You Want To Travel (min 3 cities)</Form.Label>
      <div className="cities">
        {cityList.map((city) => (
          <Row className="cityRow" key={city.id}>
            <Col xs="auto">
              <input
                className="cityInput"
                type="checkbox"
                name={city.label}
                value={city.price}
                onChange={(event) => {
                  fillCityArray(event.target.checked, city);
                }}
              />
              <label>{city.label}</label>
            </Col>
            <Col xs="auto">
              <label>{city.price}$ / day</label>
            </Col>
          </Row>
        ))}
      </div>
      <Button variant="primary" onClick={onSendCities} disabled={false}>
        Show Plans
      </Button>
    </div>
  );
}

export default City;
