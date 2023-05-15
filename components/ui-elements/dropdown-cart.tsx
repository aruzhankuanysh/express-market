import { Dropdown, Button, Container, Row, Col } from "react-bootstrap";
import Cart from "../cart";
import { useState } from "react";

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
  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  const totalPrice = cartProduct.reduce(
    (total, product) => total + product.price,
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

  return (
    <Dropdown
      align={{ lg: "end" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Dropdown.Toggle
        as={Button}
        className="cart_btn btn_orange_gradient rounded-4 height-3 ms-4 px-4"
      >
        <img
          className=""
          src="img/cart.svg"
          alt=""
          style={{ height: "25px" }}
        />
        <h5 className="m-0 ps-3">{totalPrice} UZS</h5>
      </Dropdown.Toggle>
      <Dropdown.Menu show={show} className="dropdown_cart_wrapper">
        <h3>Каталог</h3>
        {cartProduct.map((productItem, index) => (
          <Container  fluid key={productItem.name}>
            <Row className="d-flex">
              <Col lg="3">
                <img src={productItem.img} alt="" />
              </Col>
              <Col>
                <h5>{productItem.name}</h5>
                <div className="product_params" >
                  <p className="me-2">{productItem.price} UZS</p>
                  <p >{productItem.weight} г</p>
                </div>
              </Col>
              <Col>
                <div className="cart_counter">
                  <button className="ms-3 " onClick={() => decrement(index)}>
                    -
                  </button>
                  <span>{productItem.count} </span>
                  <button className="me-3 " onClick={() => increment(index)}>
                    +
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownCart;
