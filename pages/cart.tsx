import { NextPage } from "next";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Advice from "@/components/catalog/menu-advice-slide";
import PageContent from "@/components/page-content";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { decProduct, incProduct, removeProduct } from "@/store/cartSlice";
import PlaceImg from "@/components/ui-elements/place-img";

const Index: NextPage = () => {
  const discount = useAppSelector((state) => state.cart.discount);
  const totalPrice = useAppSelector((state) => state.cart.total);
  const cartProduct = useAppSelector((state) => state.cart.products);
  const cartProductImg = useAppSelector((state) => state.cart.images);
  const dicpath = useAppDispatch();

  const [finalPrice, setFinalPrice] = useState(totalPrice);

  // const deliveryPercentage = (totalPrice / 10000) * 100;
  // const deliveryDifference = 10000 - totalPrice;
  // const deliveryText =
  //   totalPrice >= 10000
  //     ? "Бесплатная доставка"
  //     : `${deliveryDifference} UZS до бесплатной доставки`;

  useEffect(() => {
    setFinalPrice(totalPrice - discount);
  }, [totalPrice, discount]);

  const getImg = (prodId: string) => {
    if (cartProductImg) {
      const index = cartProductImg.findIndex((prod) => prod.id === prodId);
      if (index >= 0) {
        return cartProductImg[index].src;
      }
      return "";
    }
  };

  const router = useRouter();

  return (
    <>
      <Container className="p-0" style={{ minHeight: "100vh" }}>
        <Container className="cart_wrapper" style={{ maxWidth: "1256px" }}>
          <h6
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/`)}
            className="text-secondary mt-5"
          >
            &lt; Вернуться в каталог
          </h6>
          <Row className="">
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
              {(cartProduct ?? []).map(
                (productItem, index) => (
                  <Container key={index+"prod"}>
                    <Row className="mt-5">
                      <Col style={{ maxWidth: "120px" }} lg="2">
                        <PlaceImg
                          img_src={`data:image/png;base64,${getImg(
                            productItem.item.id
                          )}`}
                          alt="prod_icon"
                        />
                      </Col>
                      <Col lg="7" sm="6" xxs="5">
                        <Row
                          className="mobile-text"
                          style={{ fontWeight: "600", minHeight:"30px" }}
                        >
                          {productItem?.item?.name}
                        </Row>
                        <Row>
                          <div className="cart_product_count  mt-1">
                            <button
                              className="ms-3  "
                              onClick={() =>
                                dicpath(decProduct(productItem.item))
                              }
                            >
                              -
                            </button>
                            <span className="mobile-text">
                              {productItem.count}
                            </span>
                            <button
                              className="me-3 "
                              onClick={() =>
                                dicpath(incProduct(productItem.item))
                              }
                            >
                              +
                            </button>
                          </div>
                        </Row>
                      </Col>
                      <Col lg="3" xxs="2">
                        <Row style={{display:"flex", justifyContent:"flex-end"}}>
                          <Button
                            style={{width:"10px", display:"flex", justifyContent:"space-around"}}
                            onClick={() =>
                              dicpath(removeProduct(productItem.item))
                            }
                          >
                            <Image
                              // className="mb-5"
                              style={{ height: "20px", margin:"auto" }}
                              src="/img/delete.svg"
                            />
                          </Button>
                        </Row>
                        <Row>
                          <p
                            className="mt-3 mobile-text p-0"
                            style={{ fontWeight: "700", textAlign:"end" }}
                          >
                            {productItem?.item?.price * productItem.count} сум
                          </p>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                )
              )}
            </Col>
            <Col lg="4" className=" mt-4">
              <Container>
                <h2>Ваш заказ</h2>
                <p className="pricing">Доставка 25-35 мин</p>
                <Row className="mb-3">
                  <Col style={{ fontWeight: "600" }}>Товары</Col>
                  <Col style={{ textAlign: "right", fontWeight: "600" }}>
                    {totalPrice} сум
                  </Col>
                </Row>

                {discount > 0 ? (
                  <Row className="mb-3">
                    <Col style={{ fontWeight: "600" }}>Скидки</Col>
                    <Col
                      className="text-danger"
                      style={{ textAlign: "right", fontWeight: "600" }}
                    >
                      -{discount} сум
                    </Col>
                  </Row>
                ) : null}  

                <Row className="mb-0">
                  <Col style={{ fontWeight: "600" }}>Стоимость доставки</Col>
                  <Col style={{ textAlign: "right", fontWeight: "600" }}>
                    0 сум
                  </Col>
                </Row>
                {/* <p className="pricing">{deliveryText}</p> */}
                <Row>
                  <Col style={{ fontWeight: "600" }}>
                    <h5>К оплате</h5>
                  </Col>
                  <Col style={{ textAlign: "right", fontWeight: "600" }}>
                    {finalPrice} сум
                  </Col>
                </Row>
                <Button
                  className="btn_orange_gradient payment_button rounded-5 mt-4 mobile-text"
                  onClick={() => {
                    router.push(`/order-complete`);
                  }}
                >
                  Перейти к оплате
                </Button>
              </Container>
            </Col>
          </Row>
        </Container>
        {/* <Container className=" p-1">
          <Advice />
        </Container> */}
      </Container>
    </>
  );
};

export default Index;
