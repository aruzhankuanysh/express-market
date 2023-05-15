import CategoriesNav from "@/components/categories/categories-nav";
import Header from "@/components/header";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesMenu from '@/components/categories/categories-menu'

const Menu = (): JSX.Element => {
  return (
    <>
      <Header />
      <Container id="comp_content">
        {/* content */}
        <Row>
          <Col xs="3" lg="3" xl="3" className="pe-4">
            <CategoriesNav />
          </Col>
          <Col>
            <CategoriesMenu />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Menu;
