import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Alert, Form, InputGroup } from "react-bootstrap";
import OrderDelivery from "@/components/order/order-delivery";
import OrderPay from "@/components/order/order-pay";
import OrderProducts from "@/components/order/order-products";
import PageContent from "@/components/page-content";
import { useState } from "react";
import AppService from "@/specs/gosuService";
import { ItemsOrder, Order } from "@/specs/gosuTypes";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { removeAllProducts } from "@/store/cartSlice";
import { useRouter } from "next/router";

const OrderCompletePage = function () {
  const [intercom, setIntercom] = useState("");
  const [floor, setFloor] = useState("1");
  const [entrance, setEntrance] = useState("");
  const [apartment, setApartment] = useState("");
  const [home, setHome] = useState("");

  const [comment, setComment] = useState("");

  const [phone, setPhone] = useState("");

  const [radioValue, setRadioValue] = useState("0");

  const [tipValue, setTipValue] = useState("1");

  const cartProduct = useAppSelector((state) => state.cart.products);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlerPostOrder = () => {
    if (phone.length >= 9 && phone.length <= 10 && home.length >= 1 && stocks.currentStock?.StockName) {
      let date = new Date();
      date.setMilliseconds(0);
      const dataComment = `adress : {Контактный-нoмер: "+998${phone}", Дом:"${home}", Кв-офис:"${apartment}", Подъезд:"${entrance}", Этаж:"${floor}", Домофон:"${intercom}"}`

      const items = (cartProduct ?? []).map((prod) => {
        const p: ItemsOrder = {
          IdItem: prod.item.id,
          QuantityItem: prod.count,
          PriceItem: prod.item.price
        }
        return p;
      })
      const order: any = {
        Orders: {
          DateOrder: date.toISOString().replace("0Z", ""),
          Stock: stocks.currentStock?.StockName,
          Comment: `{${dataComment}, comment : ${comment}}`,
          ClientId: "",
          TypePrices: "Прайс-лист",
          ItemsOrder: items
        }
      }
      console.log("🚀 ~ file: order-complete.tsx:49 ~ handlerPostOrder ~ order:", order)
      AppService.postOrder(order).then((response) => {
        if (response?.Order?.IdOrder) {
          console.log("🚀 ~ file: order-complete.tsx:31 ~ AppService.postOrder ~ response:", response)
          dispatch(removeAllProducts());
          router.push("/")
        }
      })
    }
  };

  const stocks = useAppSelector((state) => state.stock);

  return (
    <>
      <Container id="comp_content" style={{ minHeight: "80vh" }}>
        <Row>
          <Col xs="9" lg="9" xl="9">
            <h1 className="fw-bold mb-4">Оформление заказа</h1>
            <Form>
              <Form.Label htmlFor="phone-number">
                <h4>Контактный нoмер*</h4>
              </Form.Label>
              <Col sm="4">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">+998</InputGroup.Text>
                  <Form.Control
                    type="number"
                    id="phone-number"
                    placeholder=""
                    aria-label="phone"
                    aria-describedby="basic-addon1"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <OrderDelivery
                intercom={intercom}
                setIntercom={setIntercom}
                floor={floor}
                setFloor={setFloor}
                entrance={entrance}
                setEntrance={setEntrance}
                apartment={apartment}
                setApartment={setApartment}
                home={home}
                setHome={setHome}
              />

              <OrderPay
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                tipSum={tipValue}
                setTipSum={setTipValue}
              />

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  <h4>Комментарий к заказу</h4>
                </Form.Label>
                <Form.Control
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col xs="3" lg="3" xl="3" className="">
            <OrderProducts
              handlerPostOrder={handlerPostOrder}
              tipValue={tipValue}
              setTipValue={setTipValue}
            />
          </Col>
        </Row>
        <Row>
          <Alert variant={"warning"} className="bg-transparent border-none">
            {!(phone.length >= 9 && phone.length <= 10 )? (
              <p>
                <i className="bi bi-exclamation-circle-fill text-warning"></i>{" "}
                Укажите номер телефона
              </p>
            ) : null}
            {!(home.length >= 1)? (
              <p>
                <i className="bi bi-exclamation-circle-fill text-warning"></i>{" "}
                Укажите номер дома
              </p>
            ) : null}
          </Alert>
        </Row>
      </Container>
      <Container></Container>
    </>
  );
};
export default OrderCompletePage;
