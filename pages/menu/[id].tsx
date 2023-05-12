import Header from "@/components/header";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Menu = (): JSX.Element => {
  return (
    <>
      <Header />
      <Container>
        {/* content */}
        <Row id="comp-content">
          <Col className="menu-catalog-id">
            <Container
              fluid
              className="bg-light rounded-ys my-1 main-container"
            >
              <Row className="pt-5">
                <Col className="text-center text-module"></Col>
              </Row>
              <Row className="mt-4">
                <Col
                  xs="3"
                  lg="3"
                  xl
                  className="position-relative menu-catalog-nav overflow-hidden"
                ></Col>
                <Col xs="9" lg xl style={{ maxWidth: "100%" }}>
                  <Container fluid>
                    <Row></Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Menu;
