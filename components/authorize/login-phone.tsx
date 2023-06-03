import { setUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";

function LoginPhone({
  show,
  onClose,
  onBack,
}: {
  show: boolean;
  onClose: () => void;
  onBack: (value: number) => void;
}): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispath = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedPhoneNumber = e.target.value.replace(/\D/g, "");
    const truncatedPhoneNumber = cleanedPhoneNumber.slice(0, 11);
    const formattedPhoneNumber = truncatedPhoneNumber.replace(
      /(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
    setPhoneNumber(formattedPhoneNumber);
  };

  const handlerSendCode = () => {
    dispath(setUser({ ...auth.user, phone: phoneNumber }));
    onBack(1);
    onClose();
  }

  const handlerSelectEmail = () => {
    onBack(2);
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header style={{ border: "none" }} closeButton />
      <Modal.Body>
        <Row>
         <Image  className="login_logo" src="/img/login_logo.svg" />
        </Row>
        <Row className="mt-4">
          <h1 className="modal_heading ">Добро пожаловать в Express Market!</h1>
        </Row>
        <Modal.Title className="modal_subheading my-3">
          Введите телефон для продолжения
        </Modal.Title>
        <Form>
          <Form.Group as={Row} className="phone_num_row my-4">
            <Form.Label column className="phone_label">
              +9
            </Form.Label>
              <Form.Control
                type="tel"
                className="phone_num"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={14}
              />
          </Form.Group>
          <Row>
            <Button
              disabled={!(phoneNumber.length >= 11)}
              className="sms_btn"
              onClick={() => handlerSendCode()}
            >
              Получить код по СМС
            </Button>
          </Row>
          <Row>
            <Button onClick={() => handlerSelectEmail()} className="modal_login mt-3">
              Войти по почте
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginPhone;
