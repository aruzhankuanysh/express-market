import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import BurgMenu from "./ui-elements/burg-menu";
import SearchBar from "./ui-elements/search-bar";
import Login from "./authorize/login";
import AdressBar from "./ui-elements/address-bar";
import Cart from "@/pages/cart";

function Header(): JSX.Element {
  const router = useRouter();
  return (
    <>
    
      <Navbar bg="light" expand="lg" className="my-3 header_container">
        <Container fluid>
          <Container className="header_menu d-flex justify-content-start pl-3 flex-grow-1" style={{ marginRight: '40px' }}>
            <Row>
              <Col>
                <Image src="express-logo.svg"></Image>
              </Col>
              <Col>
              {/* Нужно деоделать модальное окно */}
                <BurgMenu /> 
              </Col>
            </Row>
          </Container>

          <div className="d-flex align-items-center flex-grow-1 mr-3">
            <SearchBar />
          </div>

          <Nav className="nav ml-auto d-flex align-items-center justify-content-end " style={{ flexWrap: 'nowrap', fontSize: '14px', letterSpacing: '-0.5px' }}>
            {/* Нужно деоделать модальное окно */}
            <AdressBar />
            <Cart />
            <Login />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
