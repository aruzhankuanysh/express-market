import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import BurgMenu from "./ui-elements/burg-menu";
import SearchBar from "./ui-elements/search-bar";
import Login from "./authorize/login";
import AdressBar from "./ui-elements/address-bar";
import Cart from "@/components/cart";

function Header(): JSX.Element {
  const router = useRouter();
  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="header_container mb-4 px-4 py-3"
      >
        <Container className="d-flex ps-3">
          <Row>
            <Col>
              <Image
                fluid
                src="img/express-logo.svg"
                alt=""
                style={{ height: "42px" }}
              />
            </Col>
            <Col md="auto">
              {/* Нужно деоделать модальное окно */}
              <BurgMenu />
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
          <Cart />
          <Login />
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;