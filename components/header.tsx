import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import SearchBar from "./ui-elements/search-bar";
import Login from "./authorize/login";
import AdressBar from "./ui-elements/address-bar";
import DropdownMenu from "./ui-elements/dropdown-menu";
import DropdownCart from "./ui-elements/dropdown-cart";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCategory } from "@/store/categorySlice";
import { setStocks } from "@/store/stockSlice";
import AppService from "@/specs/gosuService";
import { IcartImg, removeProduct, setImages } from "@/store/cartSlice";
import { Product } from "@/specs/gosuTypes";

function Header(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  const resetImagesState = () => {
    if (cart.products) {
      let img_list: IcartImg[] = [];
      cart.products.forEach(async (product, index) => {
        const res = await AppService.getProduct(product.item.id);
        if (res) {
          const prod_buf:Product = res["Items"][0]
          img_list = [...img_list, {id: prod_buf.id, src: prod_buf.images[0]}];
        } else {
          dispatch(removeProduct(product.item))
        }
        dispatch(setImages(img_list));
      });
    }
  }

  useEffect(() => {
    AppService.getCategory().then((res) => {
      if (res) {
        dispatch(setCategory(res["Category"]));
      }
    });
    AppService.getStocks().then((res) => {
      if (res) {
        dispatch(setStocks(res["Stock"]));
      }
    });
  }, []);

  useEffect(() => {
    resetImagesState();
  }, [cart.products?.length]);

  return (
    <>
      <Navbar className="d-block d-lg-none header_container mb-4 " >
        <Container className="d-flex ps-3 ">
          <Row className="mobile_header" style={{ width: "100%" }}>
            <Col  >
              <DropdownMenu />
            </Col>
            <Col >
              <Image
                fluid
                src="/img/express-logo.svg"
                alt="express-logo"
                style={{ height: "42px", cursor: "pointer", minWidth:"100px" }}
                onClick={() => {
                  router.push("/");
                }}
              />
            </Col>
            <Col className="pe-0"  style={{ display: "flex", justifyContent: "end" }}>
              <DropdownCart />
            </Col>
          </Row>
        </Container>
      </Navbar>

      <Navbar
        bg="light"
        expand="lg"
        className="header_container mb-4 px-4 py-3 d-none d-lg-flex"
      >
        <Container className="d-flex ps-3">
          <Row>
            <Col>
              <Image
                fluid
                src="/img/express-logo.svg"
                alt="express-logo"
                style={{ height: "42px", cursor: "pointer", minWidth:"80px" }}
                onClick={() => {
                  router.push("/");
                }}
              />
            </Col>
            <Col md="auto">
              <DropdownMenu />
            </Col>
          </Row>
        </Container>

        <SearchBar />

        <Nav
          className="nav d-flex align-items-center justify-content-end "
          style={{
            flexWrap: "nowrap",
            fontSize: "14px",
            letterSpacing: "-0.5px",
          }}
        >
          <AdressBar />
          <DropdownCart />
          <Login />
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
