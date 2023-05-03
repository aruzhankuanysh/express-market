import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container, Navbar } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';


const MenuSideNav = ({ r }): JSX.Element => {

  return (
    <>
      <Navbar>
        <Accordion defaultActiveKey="0" className='w-100'>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <img src="/img/aplle.svg" alt="" />
              Овощной прилавок
            </Accordion.Header>
            <Accordion.Body className='d-flex flex-column'>
              <Button className='text-start'>Овощи, грибы и зелень</Button>
              <Button className='text-start'>Фрукты и ягоды</Button>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <img src="/img/milk.svg" alt="" />
              Молочный прилавок
            </Accordion.Header>
            <Accordion.Body className='d-flex flex-column'>
              <Button className='text-start'>Молоко, масло и яйца</Button>
              <Button className='text-start'>Сыры</Button>
              <Button className='text-start'>Йогурты и десерты</Button>
              <Button className='text-start'>Молочное для детей</Button>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <img src="/img/bakery.svg" alt="" />
              Булочная
            </Accordion.Header>
            <Accordion.Body className='d-flex flex-column'>
              <Button className='text-start'>Молоко, масло и яйца</Button>
              <Button className='text-start'>Сыры</Button>
              <Button className='text-start'>Йогурты и десерты</Button>
              <Button className='text-start'>Молочное для детей</Button>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <img src="/img/water.svg" alt="" />
              Вода и напитки
            </Accordion.Header>
            <Accordion.Body className='d-flex flex-column'>
              <Button className='text-start'>Молоко, масло и яйца</Button>
              <Button className='text-start'>Сыры</Button>
              <Button className='text-start'>Йогурты и десерты</Button>
              <Button className='text-start'>Молочное для детей</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Navbar>
    </>
  );
}

export default MenuSideNav;