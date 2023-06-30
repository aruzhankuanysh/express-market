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

type Props = {
  radioValue: string;
  setRadioValue: Function;
  tipSum: string;
  setTipSum: Function;
};

const OrderPay = ({
  radioValue,
  setRadioValue,
  tipSum,
  setTipSum,
}: Props): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const [tipValue, setTipValue] = useState("1");
  const [] = useState("0");
  const radios = [
    // { name: "Онлайн банковской картой", value: "0" },
    { name: "Наличными курьеру", value: "0" },
  ];
  const tips = [
    { name: " 0", value: "1", sum: 0 },
    { name: " 200", value: "2", sum: 200 },
    { name: " 500", value: "3", sum: 500 },
    { name: " 700", value: "4", sum: 700 },
    { name: "Другая сумма", value: "5", sum: 0 },
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

      {/* <Row className="my-3">
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
          <Button style={{ height: "52px" }} className="btn_orange_gradient">
            Применить
          </Button>
        </Col>
      </Row> */}

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
              onChange={(e) => {
                setTipSum(tip.sum);
                setTipValue(e.target.value);
              }}
            >
              {tip.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {tipValue === "5" ? (
          <Row className="my-3">
            <Form.Control
              type="number"
              value={tipSum}
              className="col-5"
              placeholder="0 ₸"
              aria-label="number"
              aria-describedby="basic-addon1"
              onChange={(e) => setTipSum(parseInt(e.target.value))}
            />
          </Row>
        ) : null}
      </Row>
    </>
  );
};

export default OrderPay;
