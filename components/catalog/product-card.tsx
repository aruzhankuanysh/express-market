import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card, Container, Image, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/router";

const ProductCard = ({}): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <Card className="rounded-4 btn_grey" style={{ width: "100%", cursor: "pointer" }} onClick={() => {router.push('/product-page')}}>
        <Card.Header className="position-relative bg-transparent border-0">
          <Card.Img variant="top" src="/img/water1.svg" />
          <div className="bg-orange position-absolute bottom-0 mb-4 rounded-4 text-light fw-bold action-tag px-3">-40%</div>
        </Card.Header>
        <Card.Body className="text-start">
          <Card.Title className='d-flex align-items-end'>
            <h2 className="text-danger me-3">305тг</h2>
            <h4 className="position-relative text-secondary">
              350 ₸
              <a className="text-strikethrough">_______</a>
            </h4>
          </Card.Title>
          <Card.Text className="pt-3">
            <span className="">Вода Святой Источник негазированная</span>
            <span className="text-secondary">1,5 л</span>
          </Card.Text>
          <Button className="btn_orange_gradient rounded-4 w-100 text-light py-2"><h4>В корзину</h4></Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
