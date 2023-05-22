import { Container, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Button, Image, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FirstStep = ({ step, nextStep }: any): JSX.Element  => {

  const addTips = async () => {
    nextStep();
  };

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
            className="col-5"
            placeholder="0 ₸"
            aria-label="number"
            aria-describedby="basic-addon1"
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
