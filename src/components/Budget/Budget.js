import { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

function Budget(props) {
  const [disabledState, disableButton] = useState(true);
  const checkBudget = (event) => {
    if (event.target.value > 100000) {
      event.target.value = 100000;
    }
    if (event.target.value >= 300 && event.target.value <= 100000) {
      disableButton(false);
    } else {
      disableButton(true);
    }
    props.onBudget(event.target.value);
  };
  return (
    <div>
      <div>
        <Form.Label>Enter Your Budget(min 300, max 100.000)</Form.Label>
        <Row>
          <Col xs="auto">
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <FormControl
                onInput={checkBudget}
                type="number"
                min="300"
                max="100000"
                step="50"
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              disabled={disabledState}
              onClick={props.moveToCity}
            >
              Select Cities
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Budget;
