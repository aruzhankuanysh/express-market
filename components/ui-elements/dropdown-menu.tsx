import React, { useState } from "react";
import { Dropdown, Container, Row, Col, Image } from "react-bootstrap";
import MenuSideNav from "../catalog/menu-side-nav";
import SearchBar from "./search-bar";
import Login from "../authorize/login";
import AdressBar from "./address-bar";

function DropdownMenu() {
  const [show, setshow] = useState(false);

  const handleMouseEnter = () => {
    setshow(true);
  };

  const handleMouseLeave = () => {
    setshow(false);
  };

  const handleClick = () => {
    setshow(!show)
  }

  return (
    <Dropdown
      className="dropdowm_container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {e.stopPropagation(); handleClick()}}
      show={show} 

    >
      <Dropdown.Toggle   className="burger_menu" disabled>
        <Image className="burger_menu_image" src="/img/burger.svg" />
      </Dropdown.Toggle>
      <Dropdown.Menu  onClick={(e) => {e.stopPropagation()}}  className="dropdown_wrapper fade_in"  >
        <Container className="px-4">
        <Row className="my-4 d-flex d-lg-none ">
            <Col className="dropdown_nav">
              <AdressBar />
            </Col>
            <Col className="dropdown_nav">
              <Login />
            </Col>
          </Row>
          <Row className="d-block d-lg-none ">
            <SearchBar  />
          </Row>
          
          <h1 className="mt-3" style={{ width: "80%", margin: "auto" }}>Каталог</h1>
          <MenuSideNav />
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;
