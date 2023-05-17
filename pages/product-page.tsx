import { NextPage } from "next";
import Advice from "@/components/catalog/menu-advice-slide";
import Header from "@/components/header";
import { Container, Breadcrumb, Row, Col, Form } from "react-bootstrap";
import Footer from "@/components/footer";
import Slider from "@/components/slider";
import Counter from "@/components/ui-elements/count-button";

const Index: NextPage = () => {
  const images = ["img/bagette-diagonal.png", "img/bagette-vertical.svg"];
  const productsTags = [
    {
      tag: "-40%",
    },
    {
      tag: "Новинка",
    },
    {
      tag: "Испекли сами",
    },
  ];
  return (
    <>
      <Header />
      <Container style={{ padding: "15px" }} className="product_page_wrapper">
        <Container style={{ padding: "0" }} className="my-5">
          <h6 className="text-secondary">Главная &gt; Вам понравится</h6>

          <Container style={{ padding: "0" }}>
            {productsTags.map((productTag) => (
              <a className="me-2 product_tag">{productTag.tag}</a>
            ))}
          </Container>
          <h1 style={{ fontSize: "64px", fontWeight: "700" }}>
            Багет пшеничный из лавки
          </h1>

          <Container fluid style={{ padding: "0" }}>
            <Row>
              <Col>250г</Col>
            </Row>
            <Row>
              <Col>
                <Slider images={images} />
              </Col>
              <Col>
                <Container fluid style={{ padding: "0" }}>
                  <Container
                    className="d-flex count_container"
                    style={{ flexDirection: "row" }}
                  >
                    <div className="ms-3 mt-2" style={{ display: "flex" }}>
                      <h2 className=" no-background me-3">305₸</h2>
                      <h4 className="position-relative mt-2 text-secondary">
                        350 ₸
                        <a className="text-strikethrough no-background">
                          _______
                        </a>
                      </h4>
                    </div>
                    <div>
                      <Counter />
                    </div>
                  </Container>
                  <Row className="mt-4">
                    <Col >
                      <h3
                        className="mt-4"
                        style={{
                          padding: "0",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        На 100 граммов
                      </h3>
                    </Col>
                  </Row>

                  <Row className="my-4" style={{ width: "300px" }}>
                    <Col>
                      <h4>233</h4>
                      <span className="text_grey">ккал</span>
                    </Col>
                    <Col>
                      <h4>1</h4>
                      <span className="text_grey">ккал</span>
                    </Col>
                    <Col>
                      <h4>23</h4>
                      <span className="text_grey">ккал</span>
                    </Col>
                    <Col>
                      <h4>36</h4>
                      <span className="text_grey">ккал</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h3
                        className="mt-4"
                        style={{
                          padding: "0",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        О товаре
                      </h3>
                    </Col>
                  </Row>
                  <Col className="mt-4">
                    <span className="text_grey">Описание</span>
                    <br />
                    Классика французской кухни — багет на пшеничной муке с
                    хрустящей корочкой и нежным, слегка пористым мякишем.
                  </Col>
                  <Col className="mt-4">
                    <span className="text_grey">Состав</span> <br />
                    Мука пшеничная хлебопекарная высшего сорта, вода питьевая,
                    соль пищевая, дрожжи хлебопекарные прессованные,улучшитель
                    хлебопекарный лучшитель хлебопекарный (мука пшеничная
                    обжаренная,антиокислитель аскорбиновая кислота, ферменты
                    (ксиланаза ,амилоглюкозидаза, альфа-амилаза)), улучшитель
                    хлебопекарный (мука пшеничная, стабилизатор карбонат
                    кальция, эмульгатор (Е472е), антиокислитель аскорбиновая
                    кислота, вещество для обработки муки L-цистеин, ферменты
                    (альфа-амилазы, ксиланаза, липаза)).
                  </Col>
                  <Col className="mt-4">
                    <span className="text_grey">
                      Срок годности, условия хранения
                    </span>
                    <br />2 д., от 0 °C до +35 °C
                  </Col>
                  <Col className="mt-4">
                    <span className="text_grey">Производитель, страна</span>
                    <br />
                    ООО «Партия Еды», Россия
                  </Col>
                  <Col className="mt-4">
                    <span className="text_grey">Бренд</span>
                    <br />
                    Из Лавки
                  </Col>
                </Container>
              </Col>
            </Row>
          </Container>
        </Container>
        <Advice />
      </Container>
      <Footer />
    </>
  );
};

export default Index;
