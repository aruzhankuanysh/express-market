import { useAppSelector } from "@/store/store";
import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Container,
  Row,
  Col,
  Image,
  Navbar,
  Button,
} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import SearchBar from "./search-bar";
import Login from "../authorize/login";
import { useRouter } from "next/router";
import AdressBar from "./address-bar";

function DropdownMenu() {
  const categories = useAppSelector((state) => state.category);
  const router = useRouter();

  useEffect(() => {
    // console.log(categories.categories);
  }, [categories.categories]);
  const [show, setshow] = useState(false);

  const handleMouseEnter = () => {
    setshow(true);
  };

  const handleMouseLeave = () => {
    setshow(false);
  };

  const handleClick = () => {
    setshow(!show);
  };

  const handleClose = () => {
    setshow(false);
  };

  return (
    <Dropdown
      className="dropdowm_container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      show={show}
    >
      <Dropdown.Toggle className="burger_menu" 
       onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      >
        <Image className="burger_menu_image" src="/img/burger.svg" 
       
        />
      </Dropdown.Toggle>
      <Dropdown.Menu          
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="dropdown_wrapper fade_in"
        style={{top:"45px", boxShadow:"0px 0px 11px rgba(0, 0, 0, 0.25)", width:"90vw", maxWidth:"320px"}}
      >
        <Container className="px-4">
          <Row className="my-4 d-flex d-lg-none ">
            <Col className="dropdown_nav" >
              <AdressBar />
            </Col>
            <Col className="dropdown_nav">
              <Login />                  
            </Col>
          </Row>
          <Row className="d-block d-lg-none ">
            <SearchBar />
          </Row>

          <h1 className="mt-3" style={{ width: "80%", margin: "auto" }}>
            Каталог
          </h1>
          <Navbar id="indexCategorie">
            <Accordion defaultActiveKey="0" className="w-100">
              {(Array.isArray(categories.categories)
                ? categories.categories
                : []
              ).map((main_category) => (
                <Accordion.Item
                  eventKey={main_category.category_id}
                  key={main_category.category_id}
                >
                  <Accordion.Header>
                    <img
                      style={{ width: "40px" }}
                      className="me-1"
                      src={`/imgCategories/${main_category.category_id}.svg`}
                      alt={`category_img_${main_category.name_category}`}
                    />
                    {main_category.name_category}
                  </Accordion.Header>
                  <Accordion.Body
                    className="d-flex flex-column"
                    style={{ paddingLeft: "30px" }}
                  >
                    {(main_category.children_category ?? []).map(
                      (children_category) => (
                        <Accordion
                          defaultActiveKey="child-0"
                          key={children_category.category_id}
                        >
                          <Accordion.Item
                            eventKey={`child-${children_category.category_id}`}
                          >
                            <Accordion.Header>
                              {children_category.name_category}
                            </Accordion.Header>
                            <Accordion.Body
                              className="d-flex flex-column"
                              style={{ paddingLeft: "30px" }}
                            >
                              {(children_category.brand ?? []).map((brand) => (
                                <Button
                                  key={`brand-${brand.category_id}`}
                                  className="text-start"
                                  onClick={() => {
                                    router.push(
                                      `/catalog/${main_category.category_id}?children=${children_category.category_id}&brand=${brand.category_id}`
                                    );
                                    handleClose();
                                  }}
                                >
                                  {brand.name_category}
                                </Button>
                              ))}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      )
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Navbar>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;
