import { Button, Col, Image, Row } from "react-bootstrap";

function Cart(): JSX.Element {
  return (
    <>
      <Button className="cart_btn" >
        <Row>
          <Col>
            <Image  src="cart.svg" />
          </Col>
          <Col id="cart">300$</Col>
        </Row>
      </Button>
    </>
  );
}

export default Cart;
