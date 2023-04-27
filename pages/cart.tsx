import { Button, Col, Image, Row } from "react-bootstrap";

function Cart(): JSX.Element {
  return (
    <>
      <Button className="cart_btn">
        <Image src="cart.svg" />
        <p id="cart">300$</p>
      </Button>
    </>
  );
}

export default Cart;
