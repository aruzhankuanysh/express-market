import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Header from '@/components/header';
import Footer from '@/components/footer';
import MenuSideNav from '@/components/catalog/menu-side-nav';

export default function Home() {
  return (
    <>
      <Header />
      <Container id='comp_content'>
        <Row>
          <Col xs="3" lg="3" xl='3' className=''>
            <h5>Каталог</h5>
            <MenuSideNav />
          </Col>
          <Col xs="9" lg xl >
            <Container>
              <Row>
              </Row>
              <Row>

              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container >

      </Container>
      {/* <Footer /> */}
    </>
  )
}