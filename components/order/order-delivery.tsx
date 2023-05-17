import { Container, Form, InputGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Image, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderDelivery = ({}): JSX.Element => {
  return (
    <>
      <Form.Label htmlFor="phone-number">
        <h4>Адрес</h4>
        <h6>Улица, дом</h6>
      </Form.Label>
      <Form.Select
        id={"city"}
        aria-label="Default select"
        className="border-0 delivery-form"
      >
        <option key="1">1</option>
        <option key="2">2</option>
        <option key="3">3</option>
        <option key="4">4</option>
        <option key="5">5</option>
      </Form.Select>
      <Row className="mt-2 mb-3">
        <Col>
          <Form.Label htmlFor="home">
            <h6>Кв/офис</h6>
          </Form.Label>
          <Form.Control
            id="home"
            placeholder=""
            aria-label="phone"
            aria-describedby="basic-addon1"
          />
        </Col>
        <Col>
          <Form.Label htmlFor="Entrance">
            <h6>Подъезд</h6>
          </Form.Label>
          <Form.Control
            id="Entrance"
            placeholder=""
            aria-label="phone"
            aria-describedby="basic-addon1"
          />
        </Col>
        <Col>
          <Form.Label htmlFor="Floor">
            <h6>Этаж</h6>
          </Form.Label>
          <Form.Control
            id="Floor"
            placeholder=""
            aria-label="phone"
            aria-describedby="basic-addon1"
          />
        </Col>
        <Col>
          <Form.Label htmlFor="intercom">
            <h6>Домофон</h6>
          </Form.Label>
          <Form.Control
            id="intercom"
            placeholder=""
            aria-label="phone"
            aria-describedby="basic-addon1"
          />
        </Col>
      </Row>
    </>
  );
};

export default OrderDelivery;
