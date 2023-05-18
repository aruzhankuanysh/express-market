import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row } from "react-bootstrap";

type SmsModalProps = {
  onClose: () => void;
  show: boolean;
  onBack: () => void;
};

const SmsModal: React.FC<SmsModalProps> = ({ onClose, show, onBack }) => {
  const [timeRemaining, setTimeRemaining] = useState(1 * 60); // Время в секундах
  const [showButton, setShowButton] = useState(false);
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

  // Функция для форматирования времени в формат "мм:сс"
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header style={{ border: "none" }} closeButton />
      <Modal.Body>
        <Row style={{ width: "80%", margin: "auto" }}>
          <h2>Введите код из SMS</h2>
        </Row>
        <Row style={{ width: "80%", margin: "auto" }}>
          <Form.Control />
        </Row>
        <Row >
          <p className="mt-3" style={{textAlign:"center"}} >Код выслан на +9084325262873</p>
        </Row>
        {showButton ? (
          <Row >
            <Button  className="get_code_btn">Получить новый код</Button>
          </Row>
        ) : (
          <Row > <p style={{textAlign:"center"}}>Получить новый код можно через {formatTime(timeRemaining)}</p> </Row>
        )}

        <Button
          style={{ fontSize: "14px",}}
          variant="secondary"
          onClick={onBack}
        >
          Назад
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SmsModal;
