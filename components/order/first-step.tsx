import { Container, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Button, Image, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FirstStep = ({ step, nextStep, setTips, tips }: any): JSX.Element  => {

  const addTips = async () => {
    nextStep();
  };

  const tipsList = [
    { name: " 0", value: "1" },
    { name: " 200", value: "2" },
    { name: " 500", value: "3" },
    { name: " 700", value: "4" },
    { name: "Другая сумма", value: "5" },
  ];

  return (
    <>
      <Container
        id={"step-1"}
        className={`px-sm-5 mt-5 ${step === 1 ? "" : "d-none"}`}
      >
        <h4>Вы хотите изменить чаевые?</h4>
        <p>Введите сумму</p>
        <Col sm="5" className="mx-auto">
          <Form.Control
            type="number"
            value={tips}
            className="col-5"
            placeholder="0 ₸"
            aria-label="number"
            aria-describedby="basic-addon1"
            onChange={(e) => setTips(e.target.value)}
          />
          <Button
            className="btn_orange_gradient rounded-3 mt-4 mx-auto"
            onClick={addTips}
          >
            Применить
          </Button>
        </Col>
      </Container>
    </>
  );
};
export default FirstStep;
