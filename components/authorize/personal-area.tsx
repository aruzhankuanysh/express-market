import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  ToggleButton,
  Modal
} from "react-bootstrap";
import MyDateTimePicker from "../datetimepicker";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { OrderData, User, registerUser, updateUser } from "@/specs/gosuTypes";
import {
  setAccessToken,
  setAuthState,
  setRefreshTokens,
  setUser,
} from "@/store/authSlice";
import { useRouter } from "next/router";
import AppService from "@/specs/gosuService";

const maxTitleLength = 15;

const PersonalArea = (): JSX.Element => {
  const [isProfileDisabled, setProfileDisabled] = useState(false);
  const [isOrdersDisabled, setOrdersDisabled] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [showInput, setShowInput] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const truncateTitleSmallScreens = (title: string) => {
    const smallScreenSize = 768;
    if (windowWidth <= smallScreenSize && title.length > maxTitleLength) {
      return `${title.substring(0, maxTitleLength)}...`;
    }
    return title;
  };
  const auth = useAppSelector((state) => state.auth);

  const router = useRouter();

  const [birthday, setBirthday] = useState<Date>(
    auth.user?.birthdate ? new Date(auth.user?.birthdate) : new Date()
  );
  const [name, setName] = useState(auth.user?.name ?? "");
  const [phone, setPhone] = useState(auth.user?.phone ?? "");
  const [email, setEmail] = useState(auth.user?.email ?? "");
  const [sex, setSex] = useState(auth.user?.gender ?? "Мужской");

  useEffect(() => {
    setBirthday(
      auth.user?.birthdate ? new Date(auth.user?.birthdate) : new Date()
    );
    setPhone(auth.user?.phone ?? "");
    setName(auth.user?.name ?? "");
    setEmail(auth.user?.email ?? "");
    setSex(auth.user?.gender ?? "Мужской");
  }, [auth.user]);

  const dispatch = useAppDispatch();

  const handlerSave = () => {
    let d = birthday;
    d.setHours(0);
    d.setMinutes(0);
    d.setMilliseconds(0);

    const user: updateUser = {
      Name: name,
      Sex: sex,
      Birthday: d.toISOString().replace("0Z", ""),
      Token: auth.authToken,
    };

    AppService.putUser(user).then((response) => {
      if (response) {
        AppService.getUser(`998${phone}`).then((res) => {
          if (res?.client) {
            const db_user: User = {
              id: res.client.ClientId,
              name: res.client.Name,
              role: "USER",
              email: "",
              gender: res.client.Sex,
              birthdate: res.client.Birthday,
              phone: phone,
            };

            dispatch(setUser(db_user));
          }
        });
      } else {
        AppService.postRefresh(auth.refreshToken).then((response) => {
          if (response?.token?.accessToken) {
            dispatch(setAccessToken(response?.token?.accessToken));
            dispatch(setRefreshTokens(response?.token?.refreshToken));
          }
        });
      }
    });
  };

 

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (orderId: string) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      AppService.deleteOrder(orderToDelete)
        .then((response) => {
          if (response) {
            console.log("Заказ удален");
          } else {
            console.log("Failed to delete order.");
          }
        })
        .catch((error) => {
          console.error("An error occurred while deleting the order:", error);
        });
      handleCloseDeleteModal();
      setShowOrderDetails(false)
      setShowInput(true);
      setRadioValue('1')
    }
  };

  const handlerExit = () => {
    dispatch(setUser(null));
    dispatch(setAccessToken(""));
    dispatch(setRefreshTokens(""));
    dispatch(setAuthState(false));
    router.push("/");
  };

  const radios = [
    { name: "Профиль", value: "1" },
    { name: "История заказов", value: "2" },
  ];

  const [ordersHistory, setOrdersHistory] = useState<OrderData[]>([]);

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

  const handleOrderClick = (orderId: string) => {
    setSelectedOrder(orderId);
    handleOrderDetailsClick(orderId);
  };

  const handleOrderDetailsClick = (orderId: string) => {
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

  useEffect(() => {
    if (auth?.user?.id && auth?.user?.id.length > 0) {
      AppService.postOrdersHistory(auth?.user?.id).then((response) => {
        if (response) {
          const Orders: OrderData[] = response?.Orders ?? [];
          setOrdersHistory(Orders);
        }
      });
    }
  }, [auth?.user?.id]);

  return (
    <>
       <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение удаления</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены, что хотите удалить этот заказ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Отмена
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="mb-5 px-0">
        <Container className="px-0" style={{ maxWidth: "1000px" }}>
          <Row className="my-4 ">
            <h1>Профиль</h1>
          </Row>

          {auth.authState && (
            <ButtonGroup style={{ maxWidth: "350px", }}>
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
                    "toggle_btn mobile-text ",
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
          )}
          {showInput && (
            <Container>
              <Form.Group className="form_wrapper">
                <Form.Label xs={12} sm={6}>
                  Ваше имя*
                </Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form_input"
                />
              </Form.Group>

              <Form.Group className="form_wrapper">
                <Form.Label style={{ marginRight: "-4%" }}>
                  Мобильный телефон*{" "}
                </Form.Label>
                <Col style={{ maxWidth: "320px" }}>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">+998</InputGroup.Text>
                    <Form.Control
                      type="number"
                      id="phone-number"
                      placeholder=""
                      aria-label="phone"
                      aria-describedby="basic-addon1"
                      className="form_input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
              <Form.Group className="form_wrapper">
                <Form.Label style={{ marginRight: "22%" }}>
                  Дата рождения
                </Form.Label>
                <MyDateTimePicker
                  birthday={birthday}
                  setBirthday={setBirthday}
                />
              </Form.Group>

              <Row className="my-5 save_btn_wrap">
                <Col>
                  <Button
                    onClick={() => handlerSave()}
                    className="gradient_btn save_btn"
                  >
                    {" "}
                    Сохранить
                  </Button>
                </Col>
              </Row>
              <Col>
                <Button
                  onClick={() => {handlerExit(); router.push("/");}}
                  className="btn_primary logout_btn"
                >
                  Выйти
                </Button>
              </Col>
            </Container>
          )}
          {showOrders && auth.authState && (
            <>
              <Container className="orders_group">
                <Row
                  className="mt-5 pb-4"
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                    maxWidth: "1000px",
                  }}
                >
                  <Col className="mobile-text-small">Номер заказа</Col>
                  <Col className="mobile-text-small">Дата оформления</Col>
                  {/* <Col className="mobile-text-small">Статус</Col> */}
                  <Col className="mobile-text-small">Сумма</Col>
                </Row>
                {(Array.isArray(ordersHistory) ? ordersHistory : []).map(
                  (order) => (
                    <Container key={order.IdOrder}>
                      <Row className="mt-4">
                        <Col xxs="4">
                          <p
                            className="mobile-text-small"
                            style={{
                              textDecoration:"underline",
                              cursor: "pointer",
                            }}
                            onClick={() => {handleOrderClick(order.IdOrder);} }
                          >
                            {order.IdOrder}
                          </p>
                        </Col>
                        <Col className="mobile-text-small" xxs="4">
                          {order.DateOrder.split("T")[0]}
                        </Col>
                        {/* <Col className="mobile-text-smallest">{order.StatusOrder}</Col> */}
                        <Col className="mobile-text-small" xxs="4">{order.SumOrder} UZS</Col>
                      </Row>
                    </Container>
                  )
                )}
              </Container>
            </>
          )}
          {selectedOrder && showOrderDetails && (
            <Container className="order_details">
              {ordersHistory.map((order) => {
                let home = "";
                let comment = "";
                if (order?.Comment.includes('"adress"')) {
                  home = JSON.parse(order?.Comment ?? "{}")?.adress?.Дом ?? "";
                  comment = JSON.parse(order?.Comment ?? "{}")?.comment ?? "";
                }
                if (order.IdOrder === selectedOrder) {
                  return (
                    <Container
                      style={{ fontWeight: "500" }}
                      className="mt-5 p-0"
                      key={order.IdOrder}
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
                          <Button onClick={() => handleShowDeleteModal(order.IdOrder)} className="btn-primary back_btn">Отменить заказ</Button>
                        </Col>
                      </Row>
                      <Row className="my-4">
                        <Col>
                          <h1 className="mobile-heading">Заказ {order.IdOrder}</h1>
                        </Col>
                        <Col>
                          <h2 className="text-danger mobile-heading">{order.StatusOrder}</h2>
                        </Col>
                      </Row>
                      <Container
                        className="d-flex details_container px-1 p-lg-4 "
                        style={{
                          boxShadow: "-1px 0px 13px rgba(0, 0, 0, 0.25)",
                          borderRadius: "7px",
                        }}
                      >
                        <Row style={{ textAlign: "center" }}>
                          <Col>
                            <Row className="text-secondary">
                              <p className="mobile-text-small">Оформлен</p>
                            </Row>
                            <Row>
                              <p className="mobile-text-smallest">
                                {order.DateOrder.split("T")[0]}
                              </p>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{ textAlign: "center" }}>
                          <Col>
                            <Row className="text-secondary  px-3 px-lg-0">
                              <p className="mobile-text-small ">Cумма</p>
                            </Row>
                            <Row>
                              <p className="mobile-text-smallest">
                                {order.SumOrder} сум
                              </p>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{ textAlign: "center" }}>
                          <Col>
                            <Row className="text-secondary mobile-text-small">
                              <p className="mobile-text-small">Адрес</p>
                            </Row>
                            <Row style={{  textAlign: "center"  }}>
                              <p
                                className="mobile-text-smallest"
                                
                              >
                                {order.StockOrder}
                                {home}
                              </p>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{ textAlign: "center" }}>
                          <Col>
                            <Row
                              className="text-secondary mobile-text-small"
                              style={{ textAlign: "center" }}
                            >
                              <p className="mobile-text-small">
                                Комментарий 
                              </p>
                            </Row>
                            <Row>
                              <p className="mobile-text-smallest">{comment}</p>
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                      <Row
                        className="mt-5 pb-4 "
                        style={{
                          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                          maxWidth: "650px",
                        }}
                      >
                        <Col
                          className="mobile-text"
                          style={{ fontWeight: "700" }}
                          lg="6"
                          sm="4"
                          md="4"
                          xxs="4"
                        >
                          Название
                        </Col>
                        <Col
                          className="mobile-text"
                          style={{ fontWeight: "700", textAlign: "center" }}
                          lg="2"
                          sm="3"
                          md="3"
                          xxs="2"
                        >
                          Цена
                        </Col>
                        <Col
                          className="mobile-text"
                          style={{ fontWeight: "700", textAlign: "center" }}
                          lg="2"
                          sm="3"
                          md="3"
                          xxs="4"
                        >
                          Количество
                        </Col>
                        <Col
                          className="mobile-text"
                          style={{ fontWeight: "700", textAlign: "center" }}
                          lg="2"
                          sm="2"
                          md="2"
                          xxs="2"
                        >
                          Сумма
                        </Col>
                      </Row>
                      {(order?.ItemsOrder ?? []).map((item) => {
                        return (
                          <Row
                            className="mt-4 pb-4"
                            style={{
                              borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                              maxWidth: "650px",
                              fontSize: "15px",
                              fontWeight: "400",
                            }}
                          >
                            <Col
                              onClick={() =>
                                router.push(
                                  `/product-page?productId=${item.IdItem}`
                                )
                              }
                              className="text-danger mobile-text"
                              style={{
                                fontWeight: "600",
                                textDecorationLine: "underline",
                                cursor: "pointer",
                              }}
                              lg="6"
                              sm="4"
                              xxs="4"
                            >
                              {truncateTitleSmallScreens(item.NameItem)}
                            </Col>
                            <Col
                              className="mobile-text"
                              style={{ textAlign: "center" }}
                              lg="2"
                              sm="3"
                              xxs="2"
                            >
                              {item.PriceItem} сум
                            </Col>
                            <Col
                              className="mobile-text"
                              style={{ textAlign: "center" }}
                              lg="2"
                              sm="3"
                              xxs="4"
                            >
                              {item.QuantityItems}
                            </Col>
                            <Col
                              className="mobile-text"
                              style={{ textAlign: "center" }}
                              lg="2"
                              sm="2"
                              xxs="2"
                            >
                              {item.SummItem} сум
                            </Col>
                          </Row>
                        );
                      })}
                      <Row className="mt-3">
                        <Col className="mobile-text" xxs="8">
                          Чаевые:
                        </Col>
                        <Col className="mobile-text">{order.TipsOrder} сум</Col>
                      </Row>
                      <Row className="mt-3 ">
                        <Col
                          className="mobile-text"
                          xxs="8"
                          style={{ fontWeight: "700" }}
                        >
                          Итоговая сумма
                        </Col>
                        <Col
                          className="mobile-text"
                          style={{ fontWeight: "700" }}
                        >
                          {order.SumOrder} сум
                        </Col>
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
