import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../catalog/product-card";

export default function CategoriesProducts() {
  return (
    <>
          <Row className='mb-5'>
            <Col sm={3} className="mb-2 px-1" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={3} className="mb-2 px-1" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={3} className="mb-2 px-1" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={3} className="mb-2 px-1" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={3} className="mb-2 px-1" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={3} className="mb-2 px-1" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={3} className="mb-2 px-1" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
          </Row>
    </>
  );
};

