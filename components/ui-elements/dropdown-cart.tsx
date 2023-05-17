import { Dropdown, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

function DropdownCart(): JSX.Element {
  const [show, setShow] = useState(false);
  const [cartProduct, setCartProduct] = useState([
    {
      img: "/img/product_pineapple.png",
      name: "Груша Конференс",
      price: 3150,
      weight: 500,
      count: 1,
    },
    {
      img: "/img/product_pineapple.png",
      name: "Груша не Конференс",
      price: 1252,
      weight: 500,
      count: 1,
    },
  ]);
  const handleClick = () => {
    setShow(true);
  };

  const totalPrice = cartProduct.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  const decrement = (index: number) => {
    const updatedCartProduct = [...cartProduct];
    if (updatedCartProduct[index].count > 1) {
      updatedCartProduct[index].count--;
    }
    setCartProduct(updatedCartProduct);
  };
  
  const increment = (index: number) => {
    const updatedCartProduct = [...cartProduct];
    updatedCartProduct[index].count++;
    setCartProduct(updatedCartProduct);
  };
  const deliveryDifference = 10000 - totalPrice;
  const deliveryText =
  totalPrice >= 10000 ? "Бесплатная доставка" : `${deliveryDifference} UZS до бесплатной доставки`;
  
  const router = useRouter();
  return (
    <Dropdown
      align="end"
      onClick={handleClick}
    >
      <Dropdown.Toggle
        as={Button}
        className="cart_btn btn_orange_gradient rounded-4 height-3 ms-4 px-4"
      >
        <img
          src="img/cart.svg"
          alt=""
          style={{ height: "25px" }}
        />
        <h5 className="m-0 ps-3">{totalPrice} UZS</h5>
      </Dropdown.Toggle>
      <Dropdown.Menu show={show} className="dropdown_cart_wrapper">
        <h3>Каталог</h3>
        <Container fluid style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2)" }}>

          {cartProduct.map((productItem, index) => (
            <Row className="d-flex">
              <Col lg="3">
                <img src={productItem.img} alt="" />
              </Col>
              <Col>
                <p style={{fontSize:"15px", fontWeight:"500"}}>{productItem.name}</p>
                <div className="product_params" >
                  <p className="me-2">{productItem.price} UZS</p>
                  <p >{productItem.weight} г</p>
                </div>
              </Col>
              <Col>
                <Row>

                </Row>
                <Row>
                  <div className="cart_counter">
                  <button className="ms-3 " onClick={() => decrement(index)}>
                    -
                  </button>
                  <span className="mx-2">{productItem.count} </span>
                  <button className="me-3 " onClick={() => increment(index)}>
                    +
                  </button>
                </div>
                </Row>
                
              </Col>
            </Row>
          ))}
        </Container>
        <Container className="mt-4">
          <Row>
            <Col >
                <img style={{backgroundColor:"rgba(0, 0, 0, 0.2)", padding:"15px", borderRadius:"15px"}} src="/img/cart-logo.svg" alt="" />
            </Col>
            <Col lg="9">
                <p style={{fontSize:"15px", fontWeight:"500"}}>Доставка 30-40 мин</p>
                <Row>
                    <Col>5 UZS</Col>
                    <Col lg="9"> {deliveryText} </Col>
                </Row>
            </Col>
          </Row>
        </Container>
          <Button onClick={() => router.push(`/cart`)} className="btn_orange_gradient open_cart_btn rounded-5 mt-4">
              <p className="m-3">Перейти в корзину</p>
              <p className="m-3">{totalPrice} UZS</p>
          </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownCart;
 