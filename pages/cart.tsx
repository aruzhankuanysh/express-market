import { NextPage } from "next";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Advice from "@/components/catalog/menu-advice-slide";
import PageContent from "@/components/page-content";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { decProduct, incProduct, removeProduct } from "@/store/cartSlice";

const Index: NextPage = () => {

  const discount = useAppSelector(state => state.cart.discount);
  const totalPrice = useAppSelector(state => state.cart.total);
  const cartProduct = useAppSelector(state => state.cart.cart);
  const dicpath = useAppDispatch();

  const [finalPrice, setFinalPrice] = useState(totalPrice);

  // const deliveryPercentage = (totalPrice / 10000) * 100;
  // const deliveryDifference = 10000 - totalPrice;
  // const deliveryText =
  //   totalPrice >= 10000
  //     ? "Бесплатная доставка"
  //     : `${deliveryDifference} UZS до бесплатной доставки`;

  useEffect(() => {
    setFinalPrice(totalPrice - discount)
  }, [totalPrice, discount]);

  const router = useRouter();
  return (
    <PageContent>
      <Container
        className="cart_wrapper"
        style={{ maxWidth: "1256px", height: "100vh" }}
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
            {/* <Container className="delivery_wrapper">
              <p>Доставка 1000 UZS</p>
              <h5>{deliveryText}</h5>
              <ProgressBar
                className="delivery_progress mt-4"
                variant="danger"
                now={deliveryPercentage}
              />
            </Container> */}
            {(Array.isArray(cartProduct) ? cartProduct : []).map((productItem, index) => (
              <Container>
                <Row className="mt-5">
                  <Col style={{ maxWidth: "120px" }} lg="2">
                    <Image height={50} src={`data:image/png;base64,${productItem?.item?.images}`} alt="prod_icon" />
                  </Col>
                  <Col lg="7" sm="6" xxs="5">
                    <Row style={{ fontWeight: "600" }}>{productItem?.item?.name}</Row>
                    <Row>
                      <div className="cart_product_count  mt-3">
                        <button
                          className="ms-3 "
                          onClick={() => dicpath(decProduct(productItem.item))}
                        >
                          -
                        </button>
                        <span>{productItem.count} </span>
                        <button
                          className="me-3 "
                          onClick={() => dicpath(incProduct(productItem.item))}
                        >
                          +
                        </button>
                      </div>
                    </Row>
                  </Col>
                  <Col lg="3" xxs="2">
                    <Row>
                      <Button className="" onClick={() => {console.log("ggg"); dicpath(removeProduct(productItem.item))}}>
                        <Image
                          // className="mb-5"
                          style={{ height: "20px" }}
                          src="/img/delete.svg"
                        />
                      </Button>
                    </Row>
                    <Row>
                      <p className="mt-3" style={{ fontWeight: "700" }}>
                        {productItem?.item?.price * productItem.count} сумм
                      </p>
                    </Row>
                  </Col>
                </Row>
              </Container>
            ))}
          </Col>
          <Col lg="4" className=" mt-4">
            <Container>
              <h2>Ваш заказ</h2>
              <p className="pricing">Доставка 25-35 мин</p>
              <Row className="mb-3">
                <Col style={{ fontWeight: "600" }}>Товары</Col>
                <Col style={{ textAlign: "right", fontWeight: "600" }}>
                  {totalPrice} UZS
                </Col>
              </Row>

              {discount > 0 ? 
              <Row className="mb-3">
                <Col style={{ fontWeight: "600" }}>Скидки</Col>
                <Col className="text-danger" style={{ textAlign: "right", fontWeight: "600" }}>
                  -{discount} UZS
                </Col>
              </Row> : null}

              <Row className="mb-0">
                <Col style={{ fontWeight: "600" }}>Стоимость доставки</Col>
                <Col style={{ textAlign: "right", fontWeight: "600" }}>
                  0 UZS
                </Col>
              </Row>
              {/* <p className="pricing">{deliveryText}</p> */}
              <Row>
                <Col style={{ fontWeight: "600" }}>
                  <h5>К оплате</h5>
                </Col>
                <Col style={{ textAlign: "right", fontWeight: "600" }}>
                  {finalPrice} UZS
                </Col>
              </Row>
              <Button className="btn_orange_gradient payment_button rounded-5 mt-4">
                Перейти к оплате
              </Button>
            </Container>
          </Col>
        </Row>
        <Container className="mt-5">
          <Advice />
        </Container>
      </Container>
    </PageContent>
  );
};

export default Index;
