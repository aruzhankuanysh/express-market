import AppService from "@/specs/gosuService";
import {
  setAccessToken,
  setAuthState,
  setRefreshTokens,
} from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
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

  const dispath = useAppDispatch();

  const handlerVerCode = (value: string) => {
    if (value.length < 5) {
      setCode(value);
    } else {
      AppService.postLogin(`998${auth.user?.phone ?? ""}`, value).then((response) => {
        if (response?.Token?.accessToken) {
          dispath(setAccessToken(response.Token?.accessToken ?? ""));
          dispath(setRefreshTokens(response.Token?.refreshToken ?? ""));
          dispath(setAuthState(true));
          onBack(-1);
          onClose();
          router.push("/personal-area");
        } else {
          dispath(setAuthState(false));
        }
      });
    }
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
            Код выслан на +998{auth.user?.phone}
          </p>
        </Row>
        {showButton ? (
          <Row>
            <Button onClick={() => {}} className="get_code_btn my-3">
              Получить новый код
            </Button>
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
