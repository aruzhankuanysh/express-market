import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import ProductCard from "./product-card";

const Advice = ({}): JSX.Element => {
  return (
    <>
      <Row className="mb-5">
        <Container>
          <h6 className="text-secondary">Главная &gt; Вам понравится</h6>
          <h1 className="fw-bolder mb-4">Вам понравится</h1>
          <Row>
            {/* <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col>
            <Col sm={2} className="mb-4" style={{minWidth: '20%'}}>
              <ProductCard />
            </Col> */}
          </Row>
        </Container>
      </Row>
    </>
  );
};

export default Advice;
