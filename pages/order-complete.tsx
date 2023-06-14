import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Form, InputGroup } from "react-bootstrap";
import OrderDelivery from "@/components/order/order-delivery";
import OrderPay from "@/components/order/order-pay";
import OrderProducts from "@/components/order/order-products";
import PageContent from "@/components/page-content";

const OrderCompletePage = function () {
  

  return (
    <>
      <Container id="comp_content" style={{ minHeight: "80vh" }}>
        <Row>
          <Col xs="9" lg="9" xl="9">
            <h1 className="fw-bold mb-4">Оформление заказа</h1>
            <Form>
              <Form.Label htmlFor="phone-number">
                <h4>Контактный нoмер</h4>
              </Form.Label>
              <Col sm="4">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">+7</InputGroup.Text>
                  <Form.Control
                    id="phone-number"
                    placeholder=""
                    aria-label="phone"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>

              <OrderDelivery />

              <OrderPay />

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  <h4>Комментарий к заказу</h4>
                </Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Col>
          <Col xs="3" lg="3" xl="3" className="">
            <OrderProducts />
          </Col>
        </Row>
      </Container>
      <Container></Container>
    </>
  );
};
export default OrderCompletePage;
