import React, { useState } from "react";
import { Button, Form, Modal, Image, Col, Row } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import CodeModal from "./first-step";

function Login(): JSX.Element {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<string | undefined>();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedPhoneNumber = e.target.value.replace(/\D/g, "");
    const truncatedPhoneNumber = cleanedPhoneNumber.slice(0, 11);
    const formattedPhoneNumber = truncatedPhoneNumber.replace(
        /(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
      );
    setPhoneNumber(formattedPhoneNumber);
  };
  return (
    <>
         <Button className='btn_grey ms-4 rounded-4 height-3 px-3' onClick={handleShow}>
           <span className="text_size"><h5>Войти</h5></span>
        </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="modal_header" closeButton/>
        <Image className="login_logo" src="img/login_logo.svg" />

        <Modal.Body>
          <Row>
            <h1 className="  modal_heading">
            Добро пожаловать в <br className="  d-block d-lg-none "/> Express Market!
          </h1>
          </Row>
          
          <Modal.Title className="modal_subheading my-3">
            Введите телефон для продолжения
          </Modal.Title>
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
            <Row onClick={handleClose}>
              {/* <CodeModal /> */}
            </Row>
            {/* <Button className="sms_btn">Получить код по СМС</Button> */}
            <Row >
              <Button  className="modal_login mt-3">Войти по почте</Button>
            </Row>
            
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
