import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MenuSideNav from "@/components/catalog/menu-side-nav";
import MenuSpecialOffers from "@/components/catalog/menu-offers";
import AdviceSlide from "@/components/catalog/menu-advice-slide";
import Catalog from "@/components/catalog/menu-catalog";

export default function Home() {
  return (
    <>
      <Header />
      <Container id="comp_content">
        <Row>
          <Col xs="3" lg="3" xl="3" className="pe-4">
            <h5>Каталог</h5>
            <MenuSideNav />
          </Col>
          <Col xs="9" lg="9" xl="9" className="pe-0">
            <MenuSpecialOffers />
            <AdviceSlide />
            <Catalog />
          </Col>
        </Row>
      </Container>
      <Container></Container>
      <Footer />
    </>
  );
}
