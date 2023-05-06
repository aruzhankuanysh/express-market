import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
import { Container, Row, Col } from "react-bootstrap";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import MenuSideNav from '@/components/catalog/menu-side-nav';
import MenuSpecialOffers from '@/components/catalog/menu-offers';
import Advice from '@/components/catalog/menu-advice';

export default function Home() {
  return (
    <>
      <Header />
      <Container id='comp_content'>
        <Row>
          <Col xs="3" lg="3" xl='3' className='pe-4'>
            <h5>Каталог</h5>
            <MenuSideNav />
          </Col>
          <Col xs="9" lg='9' xl='9' className='pe-0'>

            <MenuSpecialOffers />
            <Advice />


          </Col>
        </Row>
      </Container>
      <Container >

      </Container>
      <Footer/>
    </>
  );
}
