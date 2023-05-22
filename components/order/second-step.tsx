import { Container, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

const SecondStep = ({ step }: any): JSX.Element => {

  return (
    <>
      <Container
        id={"step-1"}
        className={`px-sm-5 mt-5 ${step === 2 ? "" : "d-none"}`}
      >
        <Col sm="5" className="mx-auto">
          <Form.Control
            type="number"
            className="col-5"
            placeholder="0 ₸"
            aria-label="number"
            aria-describedby="basic-addon1"
          />
          <Button
            className="btn_orange_gradient rounded-3 mt-4 mx-auto"
          >
            Оплатить
          </Button>
        </Col>
      </Container>
    </>
  );
}
export default SecondStep;
