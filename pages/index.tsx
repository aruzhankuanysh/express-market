import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
import { Container, Row, Col } from "react-bootstrap";
import TopMenu from "@/components/top-menu";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Container className="main_container" fluid>
        <Header />
        <Container>
          <Row>
            <Col></Col>

            <Col>
              <TopMenu />
            </Col>
          </Row>
        </Container>
        <Footer />
      </Container>
    </>
  );
}
