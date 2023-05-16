import { NextPage } from "next";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useState } from "react";
import { useRouter } from "next/router";
import Advice from "@/components/catalog/menu-advice-slide";

const Index: NextPage = () => {
  const [cartProduct, setCartProduct] = useState([
    {
      img: "/img/product_pineapple.png",
      name: "Груша Конференс",
      price: 500,
      weight: 500,
      count: 1,
    },
    {
      img: "/img/product_pineapple.png",
      name: "Груша не Конференс",
      price: 2300,
      weight: 500,
      count: 1,
    },
  ]);
  const discount = 1500;

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

  const totalPrice = cartProduct.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  const removeProduct = (index: number) => {
    const updatedCartProduct = [...cartProduct];
    updatedCartProduct.splice(index, 1);
    setCartProduct(updatedCartProduct);
  };

  const deliveryPercentage = (totalPrice / 10000) * 100;
  const deliveryDifference = 10000 - totalPrice;
  const deliveryText =
    totalPrice >= 10000
      ? "Бесплатная доставка"
      : `${deliveryDifference} UZS до бесплатной доставки`;

  const finalPrice =
    totalPrice >= 10000 ? totalPrice - discount : totalPrice + 3000 - discount;

  const router = useRouter();
  return (
    <>
      <Header />
      <Container
        className="cart_wrapper"
        style={{ maxWidth: "1256px", height: "100%" }}
      >
        <h6
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`/`)}
          className="text-secondary mt-5"
        >
          &lt; Вернуться в каталог
        </h6>
        <Row className="mb-5">
          <Col lg="6" className="me-4">
            <h1 className="my-4" style={{ fontWeight: "700" }}>
              Корзина
            </h1>
            <Container className="delivery_wrapper">
              <p>Доставка 1000 UZS</p>
              <h5>{deliveryText}</h5>
              <ProgressBar
                className="delivery_progress mt-4"
                variant="danger"
                now={deliveryPercentage}
              />
            </Container>
            {cartProduct.map((productItem, index) => (
              <Container>
                <Row className="mt-5">
                  <Col lg="3">
                    <img src={productItem.img} alt="" />
                  </Col>
                  <Col lg="5">
                    <Row style={{ fontWeight: "600" }}>{productItem.name}</Row>
                    <Row>
                      <div className="cart_product_count  mt-3">
                        <button
                          className="ms-3 "
                          onClick={() => decrement(index)}
                        >
                          -
                        </button>
                        <span>{productItem.count} </span>
                        <button
                          className="me-3 "
                          onClick={() => increment(index)}
                        >
                          +
                        </button>
                      </div>
                    </Row>
                  </Col>
                  <Col >
                    <Button  onClick={() => removeProduct(index)}><img className="ms-4" style={{height:"20px"}} src="/img/delete.svg"/></Button>
                    <p className="mt-3" style={{ fontWeight: "700" }}>{productItem.price * productItem.count} UZS</p>
                  </Col>
                </Row>
              </Container>
            ))}
          </Col>
          <Col lg="4" className="ms-5 ">
            <Container>
              <h2>Ваш заказ</h2>
              <p className="pricing">Доставка 25-35 мин</p>
              <Row className="mb-3">
                <Col style={{ fontWeight: "600" }}>Товары</Col>
                <Col style={{ textAlign: "right", fontWeight: "600" }}>
                  {totalPrice} UZS
                </Col>
              </Row>
              <Row className="mb-3">
                <Col style={{ fontWeight: "600" }}>Скидки</Col>
                <Col
                  className="text-danger"
                  style={{ textAlign: "right", fontWeight: "600" }}
                >
                  -{discount} UZS
                </Col>
              </Row>
              <Row className="mb-0">
                <Col style={{ fontWeight: "600" }}>Стоимость доставки</Col>
                <Col style={{ textAlign: "right", fontWeight: "600" }}>
                  3000 UZS
                </Col>
              </Row>
              <p className="pricing">{deliveryText}</p>
              <Row>
                <Col style={{ fontWeight: "600" }}>
                  <h5>К оплате</h5>
                </Col>
                <Col style={{ textAlign: "right", fontWeight: "600" }}>
                  {finalPrice} UZS
                </Col>
              </Row>
              <Button className="btn_orange_gradient payment_button rounded-5 mt-4">Перейти к оплате</Button>
            </Container>
          </Col>
        </Row>
        <Container className="mt-5">
          <Advice/>
        </Container>
        
      </Container>
      <Footer/>
    </>
  );
};

export default Index;
