import AppService from "@/specs/gosuService";
import { User, registerUser } from "@/specs/gosuTypes";
import { setUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
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
  const auth = useAppSelector((state) => state.auth);

  const handlerSendCode = () => {
    dispath(setUser({ ...auth.user, phone: phoneNumber }));

    let d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setMilliseconds(0);

    const user: registerUser = {
      Name: "Новый пользователь",
      Sex: "Мужской",
      Birthday: d.toISOString().replace("0Z", ""),
      Phone: `998${phoneNumber}`,
      Legal: "false",
    };

    AppService.getUser(`998${phoneNumber}`).then((res) => {
      if (res?.client) {
        const db_user: User = {
          id: res.client.ClientId,
          name: res.client.Name,
          role: "USER",
          email: "",
          gender: res.client.Sex,
          birthdate: res.client.Birthday,
          phone: phoneNumber,
        };

        dispath(setUser(db_user));
      } else {
        AppService.registerUser(user).then((res) => {
          if (res) {
            AppService.getUser(`998${phoneNumber}`).then((res) => {
              if (res?.client) {
                const db_user: User = {
                  id: res.client.ClientId,
                  name: res.client.Name,
                  role: "USER",
                  email: "",
                  gender: res.client.Sex,
                  birthdate: res.client.Birthday,
                  phone: phoneNumber,
                };

                dispath(setUser(db_user));
              }
            });
          }
        });
      }
    });

    onBack(1);
    onClose();
  };

  // const handlerSelectEmail = () => {
  //   onBack(2);
  //   onClose();
  // }

  const router = useRouter();

  const handlePhoneNumberChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 9) {
      setPhoneNumber(inputValue);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header style={{ border: "none" }} closeButton />
      <Modal.Body>
        <Row>
          <Image className="login_logo" src="/img/login_logo.svg" />
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
              +998
            </Form.Label>
            <Form.Control
              type="tel"
              className="phone_num"
              value={phoneNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPhoneNumber(e.target.value);
                handlePhoneNumberChange(e);
              }}
              maxLength={9}
            />
          </Form.Group>
          <Row>
            <Button
              disabled={!(phoneNumber.length >= 9 && phoneNumber.length < 10)}
              className="sms_btn animate_button"
              onClick={() => handlerSendCode()}
            >
              Получить код по СМС
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginPhone;
