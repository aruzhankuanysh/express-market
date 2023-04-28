import { Col, Container, Image, Row } from "react-bootstrap";

function Footer(): JSX.Element {
  return (
    <>
      <Container fluid className="footer fixed-bottom">
        <Container>
          <Col className="mt-5 py-4">
            <Image src="express-logo.svg" />
          </Col>
          <Container fluid className="footer_wrapper">
            <Container>
              <Row>
                <Col className="footer_text mt-1">
                  Телефон доставки <br />
                  Г. Ташкент:
                </Col>
              </Row>
              <Col className="footer_text mt-1">+998 93 324 08 80</Col>
              <Col className="footer_text mt-1">+998 93 324 08 23</Col>
              <Col className="footer_text mt-4">
                <a href="">help@express.kz</a>
              </Col>
            </Container>
            <Container className="About_wrapper">
                <Row>
                    <Col>Главная</Col>
                    <Col>Акции</Col>
                    <Col>Доставка</Col>
                </Row>
                <Col>О нас</Col>
            </Container>
            <Container className="social_wrapper">
                <Row>
                    <Col><Image src="facebook.svg"/></Col>
                    <Col><Image src="instagram.svg"/></Col>
                    <Col><Image src="whatsapp.svg"/></Col>
                </Row>
            </Container>
          </Container>
        </Container>
        <Container fluid className="bottom_container mt-5">
            <Col className="mt-4  ml-5 bottom_container_col">
                © Gosu 2023. Все права защищены.
            </Col>
        </Container>
      </Container>
    </>
  );
}

export default Footer;
