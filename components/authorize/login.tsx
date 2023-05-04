import React, { useState } from "react";
import { Button, Form, Modal, Image, Col, Row } from "react-bootstrap";
import PhoneInput from "react-phone-number-input/input";

function Login(): JSX.Element {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<string | undefined>();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn_primary btn_login" size="sm" onClick={handleShow}>
        <span className="text_size">Войти</span>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="modal_header" closeButton></Modal.Header>
        <Image className="login_logo" src="login_logo.svg" />

        <Modal.Body>
          <Modal.Title className="modal_heading">Добро пожаловать в Express Market!</Modal.Title>
          <Modal.Title className="modal_subheading mt-1">Введите телефон для продолжения</Modal.Title>
          <Form>

            <Form.Group as={Row} className="phone_num_row my-4">
              <Form.Label column className="phone_label" >
                +7
              </Form.Label>
              <Col className="phone_num" >
                <Form.Control className="phone_num"  />
              </Col>
            </Form.Group>
            <Button className="sms_btn" >Получить код по СМС</Button>
            <Button className="modal_login mt-3">Войти по почте</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
