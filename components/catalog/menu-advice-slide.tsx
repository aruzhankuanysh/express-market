import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./product-card";
import { useRouter } from "next/router";

const AdviceSlide = ({}): JSX.Element => {
  const router = useRouter();
  const [slidesPerView, setSlidesPerView] = useState(Number);
  const updateSlidesPerView = () => {
    if (window.innerWidth < 576) {
      setSlidesPerView(3);
    } else if (window.innerWidth < 768) {
      setSlidesPerView(2);
    } else if (window.innerWidth < 992) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(4);
    }
  };
  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

 
  const products = [
    {
      id: "12324312",
      name: "water",
      description: "",
      brand_id: "123",
      category_id: "123",
      parent_category_id: "1231",
      weight: "123",
      fats: "1223",
      proteins: "123",
      carbohydrates: "1243",
      type_price: "123",
      price: 112530,
      images: [
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      ],
    },
    {
      id: "12344312",
      name: "water1",
      description: "",
      brand_id: "123",
      category_id: "123",
      parent_category_id: "1231",
      weight: "123",
      fats: "1223",
      proteins: "123",
      carbohydrates: "1243",
      type_price: "123",
      price: 11230,
      images: [
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      ],
    },
    {
      id: "123454312",
      name: "water2",
      description: "",
      brand_id: "123",
      category_id: "123",
      parent_category_id: "1231",
      weight: "123",
      fats: "1223",
      proteins: "123",
      carbohydrates: "1243",
      type_price: "123",
      price: 11230,
      images: [
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      ],
    },
    {
      id: "123134312",
      name: "water3",
      description: "",
      brand_id: "123",
      category_id: "123",
      parent_category_id: "1231",
      weight: "123",
      fats: "1223",
      proteins: "123",
      carbohydrates: "1243",
      type_price: "123",
      price: 11230,
      images: [
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      ],
    },
    {
      id: "1243234312",
      name: "water4",
      description: "",
      brand_id: "123",
      category_id: "123",
      parent_category_id: "1231",
      weight: "123",
      fats: "1223",
      proteins: "123",
      carbohydrates: "1243",
      type_price: "123",
      price: 11230,
      images: [
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      ],
    },
    {
      id: "141234312",
      name: "water5",
      description: "",
      brand_id: "123",
      category_id: "123",
      parent_category_id: "1231",
      weight: "123",
      fats: "1223",
      proteins: "123",
      carbohydrates: "1243",
      type_price: "123",
      price: 11230,
      images: [
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      ],
    },
    {
      id: "124234312",
      name: "water6",
      description: "",
      brand_id: "123",
      category_id: "123",
      parent_category_id: "1231",
      weight: "123",
      fats: "1223",
      proteins: "123",
      carbohydrates: "1243",
      type_price: "123",
      price: 11230,
      images: [
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      ],
    },
    {
      id: "123244312",
      name: "water6",
      description: "",
      brand_id: "123",
      category_id: "123",
      parent_category_id: "1231",
      weight: "123",
      fats: "1223",
      proteins: "123",
      carbohydrates: "1243",
      type_price: "123",
      price: 11230,
      images: [
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      ],
    },
   
   
   
  ];

  return (
    <>
      <Row className="mb-5">
        <Container>
          <Row className="justify-content-between align-items-center mb-4">
            <Col sm="auto">
              <h1 className="fw-bolder">Вам понравится</h1>
            </Col>
            <Col sm="auto">
              <Button
                className="btn_grey rounded-pill"
                onClick={() => router.push(`/like-it`)}
                style={{display:"flex",alignItems:"center",  }}
              >
                <h5 className="me-3 mt-1">Все </h5>
                <Image src="/img/arrow.svg"/>
              </Button>
            </Col>
          </Row>
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            slidesPerView={slidesPerView}
            spaceBetween={10}
            grabCursor={true}
            loop={true}
            speed={1200} 
            autoplay={{ delay: 4000 }}
            className="mySwiper"
          >
            {products.map((productCard) => {
              return (
                <SwiperSlide key={productCard.id} >
                  <ProductCard 
                    product={{
                      id: productCard.id,
                      name: productCard.name,
                      description: productCard.description,
                      brand_id: productCard.brand_id,
                      category_id: productCard.category_id,
                      parent_category_id: productCard.parent_category_id,
                      weight: productCard.weight,
                      fats: productCard.fats,
                      proteins: productCard.proteins,
                      carbohydrates: productCard.carbohydrates,
                      type_price: productCard.type_price,
                      price: productCard.price,
                      images: productCard.images,
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      </Row>
    </>
  );
};

export default AdviceSlide;
