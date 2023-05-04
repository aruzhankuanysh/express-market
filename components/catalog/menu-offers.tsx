import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container, Image, Navbar } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const MenuSpecialOffers = ({  }): JSX.Element => {

  return (
    <>
      <Row className='mb-5'>
        <Col lg='6' className='position-relative ps-0' style={{background:'url(/img/discounts.svg)', backgroundRepeat:'no-repeat', backgroundSize:'contain', width:'53.4%'}}>
          <Button className='position-absolute bg-transparent border-0 text-light p-0 d-grid text-start' style={{width:'100%', height:'100%'}}>
            <h2 className='fw-bold p-4'>Скидки и кешбек</h2>
            {/* <Image fluid src='/img/discounts.svg' /> */}
          </Button>
        </Col>
        <Col className=''>
          <Button className='text-light p-0 mb-3'>
            <h2 className='position-absolute fw-bold p-4'>Так еще вкуснее</h2>
            <Image fluid src='/img/tastier.svg' />
          </Button>
          <Button className='text-light p-0'>
            <h2 className='position-absolute fw-bold p-4'>Без сахара</h2>
            <Image fluid src='/img/sugarless.svg' />
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default MenuSpecialOffers;