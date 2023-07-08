import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import BtnPay from "./step-payments";
import { useAppSelector } from "@/store/store";

const OrderProducts = ({
  handlerPostOrder,
  tipValue,
  setTipValue,
}: any): JSX.Element => {
  const discount = useAppSelector((state) => state.cart.discount);
  const totalPrice = useAppSelector((state) => state.cart.total);

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
              <h5>
                {finalPrice +
                  (parseInt(tipValue).toString() === "NaN"
                    ? 0
                    : parseInt(tipValue))}{" "}
                UZS
              </h5>
            </Col>
          </Row>
          <BtnPay
            handlerPostOrder={handlerPostOrder}
            tipValue={tipValue}
            setTipValue={setTipValue}
          />
        </Card.Footer>
      </Card>
    </>
  );
};

export default OrderProducts;
