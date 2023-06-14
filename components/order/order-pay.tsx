import {
  ButtonGroup,
  Container,
  Form,
  InputGroup,
  ToggleButton,
} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Image, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderPay = ({}): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("0");
  const [tipValue, setTipValue] = useState("4");
  const radios = [
    { name: "Онлайн банковской картой", value: "0" },
    { name: "Наличными курьеру", value: "1" },
  ];
  const tips = [
    { name: " 0₸", value: "3" },
    { name: " 200₸", value: "4" },
    { name: " 500₸", value: "5" },
    { name: " 700₸", value: "6" },
    { name: "Другая сумма", value: "7" },
  ];
  return (
    <>
      <h4>Способ оплаты</h4>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={checked ? "outline-success" : "outline-danger"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <Row className="my-3">
        <Form.Label htmlFor="promo">
          <h4>Промокод</h4>
        </Form.Label>
        <Col>
          <Form.Control
            id="promo"
            placeholder=""
            aria-label="promocode"
            aria-describedby="basic-addon1"
          />
        </Col>
        <Col>
          <Button style={{height:"52px"}} className="btn_orange_gradient">Применить</Button>
        </Col>
      </Row>

      <Row className="my-3">
        <Form.Label htmlFor="promo">
          <h4>Чаевые курьеру</h4>
        </Form.Label>
        <ButtonGroup>
          {tips.map((tip, indx) => (
            <ToggleButton
              key={indx}
              id={`tip-radio-${indx}`}
              type="radio"
              variant={checked ? "outline-danger" : "outline-success"}
              name="tip"
              value={tip.value}
              checked={tipValue === tip.value}
              onChange={(e) => setTipValue(e.currentTarget.value)}
            >
              {tip.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Row>
    </>
  );
};

export default OrderPay;
