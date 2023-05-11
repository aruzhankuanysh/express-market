import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./product-card";
import { useRouter } from "next/router";

const AdviceSlide = ({}): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <Row className="mb-5">
        <Container>
          <Row className="justify-content-between align-items-center mb-4">
            <Col sm='auto'>
              <h1 className="fw-bolder">Вам понравится</h1>
            </Col>
            <Col sm='auto'>
              <Button className="btn_grey rounded-pill" onClick={() => router.push(`/like-it`)}>
                <h5 className="mb-1">Все &gt;</h5>
              </Button>
            </Col>
          </Row>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={30}
            grabCursor={true}
            loop={true}
            className="mySwiper"
          >
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
          </Swiper>
        </Container>
      </Row>
    </>
  );
};

export default AdviceSlide;
