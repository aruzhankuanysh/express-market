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
import BtnPay from "./step-payments";
import { useAppDispatch, useAppSelector } from "@/store/store";


const OrderProducts = ({handlerPostOrder, tipValue, setTipValue}:any): JSX.Element => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Онлайн банковской картой", value: "1" },
    { name: "Наличными курьеру", value: "2" },
  ];
  
  const tips = [
    { name: " 0₸", value: "1" },
    { name: " 200₸", value: "2" },
    { name: " 500₸", value: "3" },
    { name: " 700₸", value: "4" },
    { name: "Другая сумма", value: "5" },
  ];

  const discount = useAppSelector((state) => state.cart.discount);
  const totalPrice = useAppSelector((state) => state.cart.total);
  const cartProduct = useAppSelector((state) => state.cart.products);
  const dicpath = useAppDispatch();


  const [finalPrice, setFinalPrice] = useState(totalPrice);

  useEffect(() => {
    setFinalPrice(totalPrice - discount);
  }, [totalPrice, discount]);

  return (
    <>
      <Card className="border-0 bg-transparent">
        <Card.Header className="bg-transparent px-0">
          <h4>Ваш заказ</h4>
          <h6 className="text-secondary mb-0">Доставка 25–35 мин</h6>
        </Card.Header>
        <Card.Body className="px-0">
          <Row>
            <Col>
              <h6>Товары</h6>
            </Col>
            <Col sm="auto">
              <h6>{totalPrice} UZS</h6>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <h6>Стоимость доставки</h6>
            </Col>
            <Col sm="auto">
              <h6>5 ₸</h6>
            </Col>
            <h6 className="text-secondary mb-0">До бесплатной 10₸</h6>
          </Row> */}
        </Card.Body>
        <Card.Footer className="bg-transparent px-0">
          <Row>
            <Col>
              <h5>К оплате</h5>
            </Col>
            <Col sm="auto">
              <h5>{finalPrice} UZS</h5>
            </Col>
          </Row>
          <BtnPay handlerPostOrder={handlerPostOrder} tipValue={tipValue} setTipValue={setTipValue}/>
        </Card.Footer>
      </Card>
    </>
  );
};

export default OrderProducts;
