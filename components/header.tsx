import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import SearchBar from "./ui-elements/search-bar";
import Login from "./authorize/login";
import AdressBar from "./ui-elements/address-bar";
// import Cart from "@/components/cart";
import DropdownMenu from "./ui-elements/dropdown-menu";
import DropdownCart from "./ui-elements/dropdown-cart";
import { useEffect } from "react";
import { getCategory, getStocks } from "@/specs/gosuService";
import { useAppDispatch } from "@/store/store";
import { setCategory } from "@/store/categorySlice";
import { setStocks } from "@/store/stockSlice";

function Header(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategory().then((res) => {
      // console.log(res["Category"]);
      if (res) {
        dispatch(setCategory(res["Category"]));
      }
    });
    getStocks().then((res) => {
      console.log(res["Stock"]);
      if (res) {
        dispatch(setStocks(res["Stock"]));
      }
    });
  }, []);

  return (
    <>
      <Navbar className="d-block d-lg-none header_container mb-4   ">
        <Container className="d-flex ps-3 ">
          <Row className="mobile_header" style={{ width: "100%" }}>
            <Col>
              <DropdownMenu />
            </Col>
            <Col>
              <Image
                fluid
                src="/img/express-logo.svg"
                alt="express-logo"
                style={{ height: "42px", cursor: "pointer" }}
                onClick={() => {
                  router.push("/");
                }}
              />
            </Col>
            <Col style={{ display: "flex", justifyContent: "center" }}>
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
                style={{ height: "42px", cursor: "pointer" }}
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
          {/* Нужно деоделать модальное окно */}
          <AdressBar />
          <DropdownCart />
          <Login />
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
