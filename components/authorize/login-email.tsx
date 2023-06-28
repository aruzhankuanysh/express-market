import { setUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";

function LoginEmail({
  show,
  onClose,
  onBack,
}: {
  show: boolean;
  onClose: () => void;
  onBack: (value: number) => void;
}): JSX.Element {
  const [email, setEmail] = useState("");

  const dispath = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const handleEmailVer = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(email)) {
        return true;
    }
    return false;
  };

  const handlerSendCode = () => {
    dispath(setUser({ ...auth.user, email: email }));
    onBack(3);
    onClose();
  }

  const handlerSelectPhone = () => {
    onBack(0);
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header style={{ border: "none" }} closeButton />
      <Modal.Body>
        <Image className="login_logo" src="/img/login_logo.svg" />
        <Row>
          <h1 className="modal_heading">Добро пожаловать в Express Market!</h1>
        </Row>
        <Modal.Title className="modal_subheading my-3">
          Введите Email для продолжения
        </Modal.Title>
        <Form>
          <Form.Group as={Row} className="phone_num_row my-4">
            <Col className="email_add">
              <Form.Control
                type="email"
                className="email_add"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={40}
              />
            </Col>
          </Form.Group>
          <Row>
            <Button
              disabled={!handleEmailVer()}
              className="sms_btn"
              onClick={() => handlerSendCode()}
            >
              Получить код по Email
            </Button>
          </Row>
          <Row>
            <Button  onClick={() => handlerSelectPhone()} className="modal_login mt-3 animate_button">
              Войти по SMS
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginEmail;
