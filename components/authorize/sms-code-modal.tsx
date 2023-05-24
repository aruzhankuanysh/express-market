import AppService from "@/specs/gosuService";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import React, { useState, useEffect, useReducer } from "react";
import { Button, Modal, Form, Row } from "react-bootstrap";

type SmsModalProps = {
  onClose: () => void;
  show: boolean;
  onBack: (value: number) => void;
};

const SmsModal: React.FC<SmsModalProps> = ({ onClose, show, onBack }) => {
  const [timeRemaining, setTimeRemaining] = useState(1 * 60); // Время в секундах
  const [showButton, setShowButton] = useState(false);
  const [code, setCode] = useState("");

  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();

  let interval: NodeJS.Timeout | null;

  useEffect(() => {
    if (show) {
      setTimeRemaining(5 * 60);
      setShowButton(false);

      // Создаем интервал для обратного отсчета
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            // Если время истекло, очищаем интервал и показываем кнопку
            clearInterval(interval!);
            setShowButton(true);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else {
      // Если модальное окно закрыто, очищаем интервал и сбрасываем состояния
      clearInterval(interval!);
      setTimeRemaining(5 * 60);
      setShowButton(false);
    }

    // Очистка интервала при размонтировании компонента
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [show]);

  const handlerBack = () => {
    onBack(0);
    onClose();
  };

  const handlerVerCode = (value: string) => {
    setTimeout(() => {
      if (value.length < 6) {
        setCode(value);
      } else {
        onBack(-1);
        onClose();
        AppService.registerUser({
          Name: "Новый пользователь", //Полное ФИО клиента
          Sex: "Мужской", //Пол
          Birthday: "1981-03-02T00:00:00", //Дата рождения
          Phone: `9${auth?.user?.phone}`, //Номер телефона
          Legal: "false",
        }).then((res) => {
          if (res) {
            console.log(res);
            // router.push("/");
          }
        });
        router.push("/personal-area");
      }
    }, 50);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header style={{ border: "none" }} closeButton />
      <Modal.Body>
        <Row style={{ width: "80%", margin: "auto" }}>
          <h2>Введите код из SMS</h2>
        </Row>
        <Row style={{ width: "80%", margin: "auto" }}>
          <Form.Control
            value={code}
            onChange={(e) => handlerVerCode(e.target.value)}
          />
        </Row>
        <Row>
          <p className="mt-3" style={{ textAlign: "center" }}>
            Код выслан на +9{auth.user?.phone}
          </p>
        </Row>
        {showButton ? (
          <Row>
            <Button className="get_code_btn">Получить новый код</Button>
          </Row>
        ) : (
          <Row>
            <p style={{ textAlign: "center" }}>
              Получить новый код можно через{" "}
              {AppService.formatTime(timeRemaining)}
            </p>
          </Row>
        )}

        <Button
          style={{ fontSize: "14px" }}
          variant="secondary"
          onClick={() => handlerBack()}
        >
          Назад
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SmsModal;
