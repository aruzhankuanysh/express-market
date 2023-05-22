import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import DateTimePicker from "../datetimepicker";

const PersonalArea = (): JSX.Element => {
  const [isProfileDisabled, setProfileDisabled] = useState(false);
  const [isOrdersDisabled, setOrdersDisabled] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [showInput, setShowInput] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const [birthday, setBirthday] = useState<Date>(); 
  // () => (authState.user?.birthdate ? new Date(authState.user?.birthdate.split("T")[0]) : new Date())
  const radios = [
    { name: "Профиль", value: "1" },
    { name: "История заказов", value: "2" },
  ];

  const ordersHistory = [
    {
      order_id: 121123,
      title:"Яблоки Amal Bio Голден делишес кг",
      date: "16 апр 2023г.",
      status: "Отменен",
      count:"1.123 кг",
      price: 123,
      address:
        "улица Гоголя, 117/127 / улица Гоголя, 117 (код домофона 5), кв.1 (2 подъезд, 1 этаж), 050000",
    },
    {
      order_id: 124123,
      date: "13 апр 2023г.",
      title:"Яблоки Amal Bio Голден делишес кг",
      status: "Ожидает доставки",
      count:"1.123 кг",
      price: 123,
      address:
        "улица Гоголя, 117/127 / улица Гоголя, 117 (код домофона 5), кв.1 (2 подъезд, 1 этаж), 050000",
    },
  ];

  const handleButtonClick = (value: string) => {
    if (value === "1") {
      setShowInput(true);
      setShowOrders(false);
      setShowOrderDetails(false);
      setSelectedOrder(null);
    } else if (value === "2") {
      setShowInput(false);
      setShowOrders(true);
      setShowOrderDetails(false);
      setSelectedOrder(null);
    }
  };

  const handleOrderClick = (orderId: number) => {
    setSelectedOrder(orderId);
    handleOrderDetailsClick(orderId);
  };

  const handleOrderDetailsClick = (orderId: number) => {
    setShowOrderDetails(true);
    setShowOrders(false);
  };

  const handleBackClick = () => {
    setShowOrderDetails(false);
    setShowOrders(true);
  };

  function combineClasses(...classes: (string | undefined | false)[]): string {
    return classes.filter((c): c is string => typeof c === "string").join(" ");
  }

  return (
    <>
      <Container className="mb-5">
        <Container style={{ maxWidth: "1000px" }}>
          <Row className="my-4 ">
            <h1>Профиль</h1>
          </Row>

          <ButtonGroup style={{maxWidth:"350px"}}>
            {radios.map((radio, idx) => (
              
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={
                  radioValue === radio.value ? "danger" : "outline-secondary"
                }
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
                onClick={() => handleButtonClick(radio.value)}
                className={combineClasses(
                  "toggle_btn ",
                  radioValue === radio.value && ("selected-radio" as const)
                )}
                disabled={
                  radio.value === "1" ? isProfileDisabled : isOrdersDisabled
                }
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          {showInput && (
            <Container>
              <Form.Group className="form_wrapper">
                <Form.Label xs={12} sm={6}>
                  Ваше имя
                </Form.Label>
                <Form.Control className="form_input" />
              </Form.Group>
              <Form.Group className="form_wrapper">
                <Form.Label>Мобильный телефон </Form.Label>
                <Form.Control className="form_input" type="tel" />
              </Form.Group>
              <Form.Group className="form_wrapper">
                <Form.Label style={{marginRight:"22%"}}>Дата рождения</Form.Label>
                <DateTimePicker  />
              </Form.Group>
              <Form.Group
                className="form_wrapper"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Электронная почта</Form.Label>
                <Form.Control
                  className="form_input"
                  placeholder="yourmail@gmail.com"
                />
              </Form.Group>
              <Row className="my-5 save_btn_wrap">
                <Col>
                  <Button className="gradient_btn save_btn"> Сохранить</Button>
                </Col>
              </Row>
              <Col>
                <Button className="btn_primary logout_btn">Выйти</Button>
              </Col>
            </Container>
          )}
          {showOrders && (
            <>
              <Container className="orders_group">
                <Row
                  className="mt-5 pb-4"
                  style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)", maxWidth:"1000px"}}
                >
                  <Col>Номер заказа</Col>
                  <Col>Дата оформления</Col>
                  <Col>Статус</Col>
                  <Col>Сумма</Col>
                </Row>
                {ordersHistory.map((order) => (
                  <Container key={order.order_id}>
                    <Row className="mt-4">
                      <Col>
                        <p
                          style={{
                            borderBottom: "1px solid",
                            width: "50px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOrderClick(order.order_id)}
                        >
                          {order.order_id}
                        </p>
                      </Col>
                      <Col>{order.date}</Col>
                      <Col>{order.status}</Col>
                      <Col>{order.price} UZS</Col>
                    </Row>
                  </Container>
                ))}
              </Container>
            </>
          )}
          {selectedOrder && showOrderDetails && (
            <Container className="order_details">
              {ordersHistory.map((order) => {
                if (order.order_id === selectedOrder) {
                  return (
                    <Container
                      style={{ fontWeight: "500" }}
                      className="mt-5 "
                      key={order.order_id}
                    >
                      <Row>
                        <Col>
                          <Button
                            className="btn-primary back_btn "
                            onClick={handleBackClick}
                          >
                            Назад
                          </Button>
                        </Col>
                        <Col>
                          <Button>Отменить заказ</Button>
                        </Col>
                      </Row>
                      <Row className="my-4">
                        <Col>
                          <h1>Заказ {order.order_id}</h1>
                        </Col>
                        <Col>
                          <h2 className="text-danger">{order.status}</h2>
                        </Col>
                      </Row>
                      <Container
                        className="d-flex details_container p-4"
                        style={{
                          boxShadow: "-1px 0px 13px rgba(0, 0, 0, 0.25)",
                          borderRadius: "7px",
                        }}
                      >
                        <Row style={{minWidth:"160px", textAlign:"center"}}>
                          <Col >
                            <Row className="text-secondary">
                              <p>Оформлен</p>
                            </Row>
                            <Row>
                              <p>{order.date}</p>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{minWidth:"160px,", textAlign:"center"}}>
                          <Col >
                            <Row className="text-secondary">
                              <p>Общая сумма</p>
                            </Row>
                            <Row>
                              <p>{order.price} сумм</p>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{minWidth:"160px", textAlign:"center"}}>
                          <Col >
                            <Row className="text-secondary">
                              <p>Адрес</p>
                            </Row>
                            <Row style={{maxWidth:"210px", }}> 
                              <p>{order.address}</p>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{minWidth:"180px", textAlign:"center"}}>
                          <Col >
                            <Row className="text-secondary" style={{textAlign:"center"}}>
                              <p>Комментарий к заказу</p>
                            </Row>
                            <Row>
                              <p>blablabla</p>
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                      <Row className="mt-5 pb-4" style={{borderBottom:"1px solid rgba(0, 0, 0, 0.2)", maxWidth:"650px"}}>
                        <Col style={{fontWeight:"700"}} lg="6" sm="6" xxs="4" >Название</Col>
                        <Col style={{fontWeight:"700", textAlign:"center"}} lg="2" sm="2" xxs="2">Цена</Col>
                        <Col  style={{fontWeight:"700", textAlign:"center"}} lg="2" sm="2" xxs="4" >Количество</Col>
                        <Col style={{fontWeight:"700", textAlign:"center"}} lg="2" sm="2" xxs="2" >Сумма</Col>
                      </Row>
                      <Row className="mt-4 pb-4" style={{borderBottom:"1px solid rgba(0, 0, 0, 0.2)", maxWidth:"650px", fontSize:"15px", fontWeight:"400"}}>
                        <Col className="text-danger" style={{fontWeight:"600", textDecorationLine:"underline"}} lg="6" sm="6" xxs="4">{order.title}</Col>
                        <Col style={{textAlign:"center"}} lg="2" sm="2" xxs="2">{order.price} сумм</Col>
                        <Col style={{textAlign:"center"}} lg="2" sm="2" xxs="4">{order.count}</Col>
                        <Col style={{textAlign:"center"}} lg="2" sm="2" xxs="2">1000 сумм</Col>
                      </Row>
                        <Row className="mt-3">
                          <Col xxs="8">Заказано товаров на сумму:</Col>
                          <Col>{order.price} сумм</Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xxs="8">Доставленные продукты:</Col>
                          <Col> 123 сумм</Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xxs="8">Стоимость доставки:</Col>
                          <Col>0 сумм</Col>
                        </Row >
                        <Row className="mt-3">
                          <Col xxs="8">Чаевые:</Col>
                          <Col>200 сумм</Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xxs="8" style={{fontWeight:"700"}} >Итоговая сумма</Col>
                          <Col style={{fontWeight:"700"}} >323 сумм</Col>
                        </Row>
                    </Container>
                    
                  );
                }
                return null;
              })}
            </Container>
          )}
        </Container>
      </Container>
    </>
  );
};

export default PersonalArea;
