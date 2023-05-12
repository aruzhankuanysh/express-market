import CategoriesNav from "@/components/catalog/categories-nav";
import Header from "@/components/header";
import { Col, Container, Row } from "react-bootstrap";

const Menu = (): JSX.Element => {
  return (
    <>
      <Header />
      <Container id="comp_content">
        {/* content */}
        <Row>
          <Col>
            <CategoriesNav />
          </Col>
          <Col>
            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Menu;
