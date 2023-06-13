import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const MenuSpecialOffers = ({}): JSX.Element => {
  return (
    <>
      <Row className="mb-5   mx-1 d-none d-sm-flex">
        <Col
          lg="6"
          className="position-relative ps-0"
          style={{
            background: "url(/img/discounts.svg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            width: "53.4%",
          }}
        >
          <Button
            className="position-absolute bg-transparent border-0 text-light p-0 d-grid text-start"
            style={{ width: "100%", height: "100%" }}
          >
            <h2 className="fw-bold p-4 h2-responsive">Скидки и кешбек</h2>
            {/* <Image fluid src='/img/discounts.svg' /> */}
          </Button>
        </Col>
        <Col className="">
          <Button className="position-relative text-light p-0 mb-3">
            <h2 className="position-absolute fw-bold p-4 h2-responsive">
              Так еще вкуснее
            </h2>
            <Image fluid src="/img/tastier.svg" />
          </Button>
          <Button className="position-relative text-light p-0">
            <Col xs={12} md={6}>     
              <h2 className="position-absolute fw-bold p-4 h2-responsive">
                Без сахара
              </h2>
            </Col>

            <Image fluid src="/img/sugarless.svg" />
          </Button>
        </Col>
      </Row>
      <Container className="d-block d-sm-none">
        <Row>
          <Col className="">
          <Button className="position-relative text-light p-0 mb-3">
            <h2 className="position-absolute fw-bold p-4 h2-responsive">
              Скидки и кешбек
            </h2>
            <Image fluid src="/img/discounts.svg" />
          </Button>
          <Button className="position-relative text-light p-0 mb-3">
            <h2 className="position-absolute fw-bold p-4 h2-responsive">
              Так еще вкуснее
            </h2>
            <Image fluid src="/img/tastier.svg" />
          </Button>
          <Button className="position-relative text-light p-0">
            <Col xs={12} md={6}>     
              <h2 className="position-absolute fw-bold p-4 h2-responsive">
                Без сахара
              </h2>
            </Col>

            <Image fluid src="/img/sugarless.svg" />
          </Button>
        </Col></Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default MenuSpecialOffers;
