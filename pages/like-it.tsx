import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import MenuSideNav from "@/components/catalog/menu-side-nav";
import MenuSpecialOffers from "@/components/catalog/menu-offers";
import Advice from "@/components/catalog/menu-advice";
import Catalog from "@/components/catalog/menu-catalog";

export default function LikeIt() {
  return (
    <>
      <Header />
      <Container id="comp_content">
        <Advice />
      </Container>
    </>
  );
}
