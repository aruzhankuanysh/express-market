import React, { useState } from "react";
import { Dropdown, Container, Row, Col, Image } from "react-bootstrap";
import MenuSideNav from "../catalog/menu-side-nav";
import SearchBar from "./search-bar";
import Login from "../authorize/login";
import AdressBar from "./address-bar";

function DropdownMenu() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Dropdown
      className="dropdowm_container"
      show={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      
      
    >
      <Dropdown.Toggle  className="burger_menu" disabled>
        <Image className="burger_menu_image" src="/img/burger.svg" />
      </Dropdown.Toggle>
      <Dropdown.Menu  className="dropdown_wrapper" >
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
