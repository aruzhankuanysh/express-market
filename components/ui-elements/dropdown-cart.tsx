import { Dropdown, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { decProduct, incProduct } from "@/store/cartSlice";
import PlaceImg from "./place-img";
import { MiniProduct, Product } from "@/specs/gosuTypes";
import AppService from "@/specs/gosuService";

function DropdownCart(): JSX.Element {
  const [show, setShow] = useState(false);
  const [addScroll, setAddScroll] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const dispath = useAppDispatch();
  const maxTitleLength = 15;

  const handleClick = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
  };

  const totalPrice = useAppSelector((state) => state.cart.total);
  const cartProduct = useAppSelector((state) => state.cart.products);
  const cartProductImg = useAppSelector((state) => state.cart.images);

  const getImg = (prodId: string) => {
    if (cartProductImg) {
      const index = cartProductImg.findIndex(
        (prod: { id: string }) => prod.id === prodId
      );
      if (index >= 0) {
        return cartProductImg[index].src;
      }
      return "";
    }
  };

  useEffect(() => {
    if (cartProduct && cartProduct.length > 4) {
      setAddScroll(true);
    } else {
      setAddScroll(false);
    }
  }, [cartProduct]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    // Remove the listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const truncateTitleSmallScreens = (title: string) => {
    const smallScreenSize = 768;
    if (windowWidth <= smallScreenSize && title.length > maxTitleLength) {
      return `${title.substring(0, maxTitleLength)}...`;
    }
    return title;
  };

  // const deliveryDifference = 10000 - totalPrice;
  // const deliveryText = totalPrice >= 10000 ? "Бесплатная доставка" : `${deliveryDifference} UZS до бесплатной доставки`;

  const router = useRouter();

  return (
    <Dropdown
      align="end"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      show={show}
    >
      <div style={{position: "relative"}}>
        <Dropdown.Toggle
          as={Button}
          className="cart_btn btn_orange_gradient rounded-4 height-3 ms-4 px-4"
        >
          <Image src="/img/cart.svg" alt="cart_icon" style={{ height: "25px" }} />
          <h5 className="m-0 ps-3">{totalPrice} UZS</h5>
          <h4 className="d-block d-lg-none ms-2 mt-0" style={{backgroundColor:"rgba(141, 126, 126, 0.623)", borderRadius:"100%", position:"absolute", width:"18px", left:"44px", bottom:"19px", fontSize:"14px"}}>{cartProduct && cartProduct?.length > 0 ? <span >{cartProduct?.length ?? 0}</span> : null}</h4>
        </Dropdown.Toggle>
        
      </div>
      <Dropdown.Menu
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="dropdown_cart_wrapper fade_in "
      >
        <h3>Каталог</h3>
        <Container
          className={`p-0 ${addScroll ? "dropdown_cart_scroll" : ""}`}
          fluid
          style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.2)" }}
        >
          {(Array.isArray(cartProduct) ? cartProduct : []).map(
            (productItem, index) => (
              <Row key={productItem.item.id} className="d-flex">
                <Col lg="3" xxs="3" sm="3">
                  <PlaceImg
                    img_src={`data:image/png;base64,${getImg(
                      productItem.item.id
                    )}`}
                    alt="prod_img"
                  />
                </Col>
                <Col lg="4" xxs="5" sm="5">
                  <p
                    className="mobile-text"
                    style={{ fontSize: "15px", fontWeight: "500" }}
                  >
                    {truncateTitleSmallScreens(productItem.item.name)}
                  </p>
                  <div className="product_params">
                    <p className="me-2 mobile-text">
                      {productItem.item.price} UZS
                    </p>
                    <p className="mobile-text">{productItem.item.weight} г</p>{" "}
                    {/*units - надо определять*/}
                  </div>
                </Col>
                <Col>
                  <Row>
                    <div className="cart_counter">
                      <button
                        className="ms-3 "
                        onClick={() => {
                          dispath(decProduct(productItem.item));
                        }}
                      >
                        -
                      </button>
                      <span className="mx-2">{productItem.count} </span>
                      <button
                        className=""
                        onClick={() => {
                          dispath(incProduct(productItem.item));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </Row>
                </Col>
              </Row>
            )
          )}
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
          onClick={() => {
            router.push(`/cart`);
            handleClose();
          }}
          className="btn_orange_gradient open_cart_btn rounded-5 mt-4 mx-auto"
        >
          <p className="m-3 mobile-text">Перейти в корзину</p>
          <p className="m-3 mobile-text">{totalPrice} UZS</p>
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownCart;
