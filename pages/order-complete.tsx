import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MenuSideNav from "@/components/catalog/menu-side-nav";
import { Form, InputGroup } from "react-bootstrap";
import OrderDelivery from "@/components/order/order-complete";

const OrderCompletePage = function () {
  return (
    <>
      <Header />
      <Container id="comp_content">
        <Row>
          <Col xs="9" lg="9" xl="9">
            <h1 className="fw-bold mb-4">Оформление заказа</h1>
            <Form>
              <Form.Label htmlFor="phone-number">
                <h4>Контактный нoмер</h4>
              </Form.Label>
              <InputGroup className="mb-3 col-4">
                <InputGroup.Text id="basic-addon1">+7</InputGroup.Text>
                <Form.Control
                  id="phone-number"
                  placeholder=""
                  aria-label="phone"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Form>

            <OrderDelivery />
            
          </Col>
          <Col xs="3" lg="3" xl="3" className="">
            <h5>Каталог</h5>
            <MenuSideNav />
          </Col>
        </Row>
      </Container>
      <Container></Container>
      <Footer />
    </>
  );
};
export default OrderCompletePage;
