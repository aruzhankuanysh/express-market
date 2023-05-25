import { Dropdown, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { decProduct, incProduct } from "@/store/cartSlice";
import PlaceImg from "./place-img";
import { MiniProduct, Product } from "@/specs/gosuTypes";
import AppService from "@/specs/gosuService";

function DropdownCart(): JSX.Element {
  const [show, setShow] = useState(false);

  const dispath = useAppDispatch();

  const handleClick = () => {
    setShow(true);
  };

  const totalPrice = useAppSelector(state => state.cart.total);
  const cartProduct = useAppSelector(state => state.cart.products);
  const cartProductImg = useAppSelector(state => state.cart.images);

  const getImg = (prodId: string) => {
    if (cartProductImg) {
      const index = cartProductImg.findIndex(prod => prod.id === prodId);
      if (index >= 0) {
        return cartProductImg[index].src;
      }
      return "";
    }
  }

  // const deliveryDifference = 10000 - totalPrice;
  // const deliveryText = totalPrice >= 10000 ? "Бесплатная доставка" : `${deliveryDifference} UZS до бесплатной доставки`;

  const router = useRouter();

  return (
    <Dropdown align="end" onClick={handleClick}>
      <Dropdown.Toggle as={Button} className="cart_btn btn_orange_gradient rounded-4 height-3 ms-4 px-4">
        <Image src="/img/cart.svg" alt="cart_icon" style={{ height: "25px" }} />
        <h5 className="m-0 ps-3">{totalPrice} UZS</h5>
      </Dropdown.Toggle>
      <Dropdown.Menu show={show} className="dropdown_cart_wrapper">
        <h3>Каталог</h3>
        <Container fluid style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2)" }}>
          {(Array.isArray(cartProduct) ? cartProduct : []).map((productItem, index) => (
            <Row key={productItem.item.id} className="d-flex">
              <Col lg="3">
                <PlaceImg img_src={`data:image/png;base64,${getImg(productItem.item.id)}`} alt="prod_img"/>
              </Col>
              <Col>
                <p style={{ fontSize: "15px", fontWeight: "500" }}>
                  {productItem.item.name}
                </p>
                <div className="product_params">
                  <p className="me-2">{productItem.item.price} UZS</p>
                  <p>{productItem.item.weight} г</p> {/*units - надо определять*/}
                </div>
              </Col>
              <Col>
                <Row></Row>
                <Row>
                  <div className="cart_counter">
                    <button className="ms-3 " onClick={() => {
                      dispath(decProduct(productItem.item))
                    }}>
                      -
                    </button>
                    <span className="mx-2">{productItem.count} </span>
                    <button className="me-3 " onClick={() => {
                      dispath(incProduct(productItem.item))
                    }}>
                      +
                    </button>
                  </div>
                </Row>
              </Col>
            </Row>
          ))}
        </Container>
        {/* <Container className="mt-4">
          <Row>
            <Col>
              <img
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  padding: "15px",
                  borderRadius: "15px",
                }}
                src="/img/cart-logo.svg"
                alt=""
              />
            </Col>
            <Col lg="9">
              <p style={{ fontSize: "15px", fontWeight: "500" }}>
                Доставка 30-40 мин
              </p>
              <Row>
                <Col>5 UZS</Col>
                <Col lg="9"> {deliveryText} </Col>
              </Row>
            </Col>
          </Row>
        </Container> */}
        <Button
          onClick={() => router.push(`/cart`)}
          className="btn_orange_gradient open_cart_btn rounded-5 mt-4"
        >
          <p className="m-3">Перейти в корзину</p>
          <p className="m-3">{totalPrice} UZS</p>
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownCart;
