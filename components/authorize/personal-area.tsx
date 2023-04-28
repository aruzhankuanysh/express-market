import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
  Table,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const PersonalArea = (): JSX.Element => {
  // const authState = useSelector(selectAuthState);

  // const [gender. setGender] = useState(authState?.user?.gender ?? "male");
  // const [phone, setPhone] = useState(authState?.user?.phone ?? "");
  // const [name, setName] = useState(authState?.user?.name ?? "");
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Профиль", value: "1" },
    { name: "История заказов", value: "2" },
  ];

  const [orders, setOrders] = useState([]);

  //   const dispatch = useDispatch();
  const router = useRouter();

  // const [birthday, setBirthday] = useState<Date>(() => (authState.user?.birthday ? new Date(authState.user?.birthday.split("T")[0]) : new Date()));
  // const [selectedBirthday, setSelectedBirthday] =  useState<Date>(() => (authState.user?.birthdate ? new Date(authState.user?.birthdate.split("T")[0]) : new Date()));

  const creationStatus = {
    Error: "Отмена",
    InProgress: "В Работе",
    Succes: "Создан",
  };

  function combineClasses(...classes: (string | undefined | false)[]): string {
    return classes.filter((c): c is string => typeof c === "string").join(" ");
  }

  // const UpdateData = async () => {
  //     const result = await getEmitHelpers(authState.authToken);
  //     if(result) {
  //         dispatch(setUser(result?.user));
  //         dispatch(setAuthState(true));
  //     } else {
  //         dispatch(setAuthState(false));
  //         router.push('/');
  //     }
  // }

  // useEffect(() => {
  //     if(authState?.user?.birthdate){
  //         setSelectedBirthday( new Date (authState.user?.birthdate.split("T")[0]))
  //     } else {
  //         setSelectedBirthday(birthday)
  //     }
  // },[birthday, authState?.user])
  // useEffect(() => {
  //     if (authState?.authState === false) {
  //       dispatch(setAccessToken(""));
  //       router.push('/');
  //     }
  //     UpdateData()
  //   }, [])

  //   useEffect(() => {
  //     setGender(authState?.user?.gender ?? "male");
  //     setPhone(authState?.user?.phone ?? "");
  //     setName(authState?.user?.name ?? "");
  //   }, [authState?.user])
  //   const [active, setActive] = useState(1);

  //   const handleChange = (value) => {
  //     setActive(value);
  //     const toggleBtn = document.querySelector('.toggle_btn');
  //     if (value === 1) {
  //       toggleBtn.classList.add('profile');
  //       toggleBtn.classList.remove('history');
  //     } else {
  //       toggleBtn.classList.add('history');
  //       toggleBtn.classList.remove('profile');
  //     }
  //   };

  return (
    <>
      <Container>
        <Row className="my-4">
          <h1>Профиль</h1>
        </Row>
        <ButtonGroup>
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
              className={combineClasses(
                "toggle_btn",
                radioValue === radio.value && ("selected-radio" as const)
              )}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <Form.Group className="form_wrapper">
          <Form.Label>Ваше имя</Form.Label>
          <Form.Control className="form_input" />
        </Form.Group>
        <Form.Group className="form_wrapper">
          <Form.Label>Мобильный телефон</Form.Label>
          <Form.Control className="form_input" />
        </Form.Group>
        <Form.Group className="form_wrapper">
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control className="form_input" />
        </Form.Group>
        <Form.Group className="form_wrapper" controlId="exampleForm.ControlInput1">
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control className="form_input" placeholder="yourmail@gmail.com"/>
        </Form.Group>
        <Col md={{ span: 3, offset: 3 }} className="my-5 save_btn_wrap" style={{ maxWidth: '149px !important' }}>
          <Button className="gradient_btn save_btn" >Сохранить</Button>
        </Col>
        <Col>
            <Button className="btn_primary logout_btn">Выйти из аккаунта</Button>
        </Col>
      </Container>
    </>
  );
};

export default PersonalArea;
