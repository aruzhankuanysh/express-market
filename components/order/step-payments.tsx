import {
  ButtonGroup,
  Card,
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
import FirstStep from "./first-step";
import SecondStep from "./second-step";

const BtnPay = ({}): JSX.Element => {
  const [modalShow, setModalShow] = useState(false);
  
  
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <>
      <Button
        className="btn_orange_gradient w-100 rounded-pill"
        onClick={() => setModalShow(true)}
      >
        Перейти к оплате
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-center p-4">
          <FirstStep step={step} nextStep={nextStep} />
          <SecondStep step={step} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BtnPay;
