import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./product-card";

const Advice = ({}): JSX.Element => {
  return (
    <>
      <Row className="mb-5">
        <Container>
          <h1 className="fw-bolder mb-4">Вам понравится</h1>

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

export default Advice;
