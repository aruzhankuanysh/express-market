import { Button, Col, Image, Row } from "react-bootstrap";

function Cart(): JSX.Element {
  return (
    <>
      <Button className="cart_btn btn_orange_gradient rounded-4 height-3 ms-4 px-4">
        <Image className="" src="img/cart.svg" alt="" style={{height:'25px'}} />
        <h5 className="m-0 ps-3">0$</h5>
      </Button>
    </>
  );
}

export default Cart;