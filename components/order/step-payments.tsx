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

const BtnPay = ({}): JSX.Element => {
  const [modalShow, setModalShow] = useState(false);
  const [deliveryPaymentType, setDeliveryPaymentType] = useState(1);
  const [deliveryType, setDeliveryType] = useState("DeliveryByCourier");
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
          <h4>Вы хотите изменить чаевые?</h4>
          <p>Введите сумму</p>
          <Col sm="5" className="mx-auto">
            <Form.Control
              type="number"
              className="col-5"
              placeholder="0 ₸"
              aria-label="number"
              aria-describedby="basic-addon1"
            />
            <Button className="btn_orange_gradient rounded-3 mt-4 mx-auto">Применить</Button>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BtnPay;
