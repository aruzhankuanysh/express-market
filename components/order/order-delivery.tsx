import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAppSelector } from "@/store/store";

type Props = {
  intercom: string;
  setIntercom: Function;
  floor: string;
  setFloor: Function;
  entrance: string;
  setEntrance: Function;
  apartment: string;
  setApartment: Function;
  home: string;
  setHome: Function;
};

const OrderDelivery = ({
  intercom,
  setIntercom,
  floor,
  setFloor,
  entrance,
  setEntrance,
  apartment,
  setApartment,
  home,
  setHome,
}: Props): JSX.Element => {
  const stocks = useAppSelector((state) => state.stock);

  return (
    <>
      <Row className="mt-2 mb-3">
        <h4>ЖК</h4>
        <span>{stocks?.currentStock?.StockName}</span>
        <Col>
          <Form.Label htmlFor="home">
            <h6 className="mobile-text">Дом*</h6>
          </Form.Label>
          <Form.Control
            id="home"
            placeholder=""
            aria-label="phone"
            aria-describedby="basic-addon1"
            value={home}
            onChange={(e) => setHome(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-2 mb-3">
        <Col>
          <Form.Label htmlFor="apartment">
            <h6 className="mobile-text">Кв/офис</h6>
          </Form.Label>
          <Form.Control
            type="number"
            id="apartment"
            placeholder=""
            aria-label="phone"
            aria-describedby="basic-addon1"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Label htmlFor="entrance">
            <h6 className="mobile-text">Подъезд</h6>
          </Form.Label>
          <Form.Control
            type="number"
            id="entrance"
            placeholder=""
            aria-label="phone"
            aria-describedby="basic-addon1"
            value={entrance}
            onChange={(e) => setEntrance(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Label htmlFor="floor">
            <h6 className="mobile-text">Этаж</h6>
          </Form.Label>
          <Form.Control
            type="number"
            id="floor"
            placeholder=""
            aria-label="phone"
            aria-describedby="basic-addon1"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Label htmlFor="intercom">
            <h6 className="mobile-text">Домофон</h6>
          </Form.Label>
          <Form.Control
            id="intercom"
            placeholder=""
            aria-label="phone"
            aria-describedby="basic-addon1"
            value={intercom}
            onChange={(e) => setIntercom(e.target.value)}
          />
        </Col>
      </Row>
    </>
  );
};

export default OrderDelivery;
