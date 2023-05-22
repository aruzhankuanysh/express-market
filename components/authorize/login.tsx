import React, { useState } from "react";
import { Button, Form, Modal, Image, Col, Row } from "react-bootstrap";
import SmsModal from "./sms-code-modal";
import EmailCode from "./email-code-modal";

function Login(): JSX.Element {
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleFirstModalShow = () => {
    setShowFirstModal(true);
    setShowSecondModal(false);
    setShowThirdModal(false);

  }
  const handleFirstModalClose = () => setShowFirstModal(false);
  const handleSecondModalShow = () => {
    setShowFirstModal(false);
    setShowSecondModal(true);
  };
  const handleClose = () => {
    setShowSecondModal(false);
    setShowThirdModal(false);

  };

  const  handleThirdModalShow = () => {
    setShowFirstModal(false);
    setShowThirdModal(true);
  }


  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedPhoneNumber = e.target.value.replace(/\D/g, "");
    const truncatedPhoneNumber = cleanedPhoneNumber.slice(0, 11);
    const formattedPhoneNumber = truncatedPhoneNumber.replace(/(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <>
      <Button className="btn_grey ms-4 rounded-4 height-3 px-3" onClick={handleFirstModalShow}>
        <span className="text_size">
          Войти
        </span>
      </Button>

      <Modal show={showFirstModal} onHide={handleFirstModalClose} centered>
        <Modal.Header style={{border:"none"}} closeButton />
        <Modal.Body>
          <Image className="login_logo" src="img/login_logo.svg" />
          <Row>
            <h1 className="modal_heading">Добро пожаловать в Express Market!</h1>
          </Row>
          <Modal.Title className="modal_subheading my-3">Введите телефон для продолжения</Modal.Title>
          <Form>
            <Form.Group as={Row} className="phone_num_row my-4">
              <Form.Label column className="phone_label">
                +9
              </Form.Label>
              <Col className="phone_num">
                <Form.Control
                  type="tel"
                  className="phone_num"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  maxLength={14}
                />
              </Col>
            </Form.Group>
            <Row>
              <Button className="sms_btn" onClick={handleSecondModalShow}>
                Получить код по СМС
              </Button>
            </Row>
            <Row>
              <Button onClick={handleThirdModalShow} className="modal_login mt-3">Войти по почте</Button>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <EmailCode show={showThirdModal} onClose={handleClose }  onBack={handleFirstModalShow}/>
      <SmsModal show={showSecondModal} onClose={handleClose }  onBack={handleFirstModalShow}/>
    </>
  );
}

export default Login;