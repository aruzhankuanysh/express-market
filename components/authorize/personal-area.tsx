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
        <Row>
          <h1>Профиль</h1>
        </Row>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton id="tgb-radio-1" className="toggle_btn" value={1}        > Профиль </ToggleButton>
            <ToggleButton id="tbg-radio-2" className="toggle_btn" value={2}> История заказов </ToggleButton>
        </ToggleButtonGroup>
        <Form.Group className="form_wrapper">
          <Form.Label>Ваше имя</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className="form_wrapper">
          <Form.Label>Мобильный телефон</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className="form_wrapper">
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className="form_wrapper">
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control />
        </Form.Group>
      </Container>
    </>
  );
};

export default PersonalArea;
