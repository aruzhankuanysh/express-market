import { NextPage } from "next";
import Advice from "@/components/catalog/menu-advice-slide";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "@/components/slider";
import Counter from "@/components/ui-elements/count-button";
import PageContent from "@/components/page-content";
import { useEffect, useState } from "react";
import { Product } from "@/specs/gosuTypes";
import { useRouter } from "next/router";
import AppService from "@/specs/gosuService";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { decProduct, incProduct } from "@/store/cartSlice";
import BreadCrumbs from "@/components/ui-elements/bread-crumbs";

const Index: NextPage = () => {
  const [product, setProduct] = useState<Product>();
  const [count, setCount] = useState(0);
  const route = useRouter();
  const dispatch = useAppDispatch();
  const cart_products = useAppSelector((state) => state.cart.products);

  const increment = () => {
    product ? dispatch(incProduct(product)) : null;
  }

  const decrement = () => {
    product ? dispatch(decProduct(product)) : null;
  }

  useEffect(() => {
    if(product && cart_products) {
      const prod_buf = cart_products.filter((p) => p.item.id === product.id)[0];
      setCount(prod_buf?.count ?? 0);
    }
  }, [cart_products, product])

  const productsTags = [
    // {
    //   tag: "-40%",
    // },
    // {
    //   tag: "Новинка",
    // },
    // {
    //   tag: "Испекли сами",
    // },
  ];

  useEffect(() => {
    AppService.getProduct(route.query["productId"]?.toString()).then((res) => {
      if (res) {
        setProduct(res["Items"][0]);
      }
    });
  }, [route.pathname, route.query]);

  return (
    <Container style={{ padding: "15px" }} className="product_page_wrapper">
      <Container style={{ padding: "0" }} className="my-5">
        {/* <h6 className="text-secondary">Главная &gt; Вам понравится</h6> */}
        <BreadCrumbs/>

        {/* <Container style={{ padding: "0" }}>
          {productsTags.map((productTag) => (
            <a className="me-2 product_tag">{productTag.tag}</a>
          ))}
        </Container> */}
        <h1 style={{ fontSize: "64px", fontWeight: "700" }}>
          {product?.name}
        </h1>

        <Container fluid style={{ padding: "0" }}>
          <Row>
            <Col>{product?.weight} г</Col>
          </Row>
          <Row>
            <Col>
              <Slider images={product?.images ?? []} />
            </Col>
            <Col>
              <Container fluid style={{ padding: "0" }}>
                <Container
                  className="d-flex count_container"
                  style={{ flexDirection: "row" }}
                >
                  <div className="ms-3 mt-2" style={{ display: "flex" }}>
                    <h2 className=" no-background me-3">{product?.price} сум</h2>
                    {/* <h4 className="position-relative mt-2 text-secondary">
                      {product?.price} сум
                      <b className="text-strikethrough no-background">
                        _______
                      </b>
                    </h4> */}
                  </div>
                  <div>
                    <Counter count={count} increment={increment} decrement={decrement} />
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
                    <h4>{ ((product?.proteins ? parseInt(product?.proteins) : 0) * 4) + ((product?.fats ? parseInt(product?.fats) : 0) * 9) + ((product?.carbohydrates ? parseInt(product?.carbohydrates) : 0) * 4)}</h4>
                    <span className="text_grey">ккал</span>
                  </Col>
                  <Col>
                    <h4>{product?.fats}</h4>
                    <span className="text_grey">жир.</span>
                  </Col>
                  <Col>
                    <h4>{product?.proteins}</h4>
                    <span className="text_grey">белк.</span>
                  </Col>
                  <Col>
                    <h4>{product?.carbohydrates}</h4>
                    <span className="text_grey">углев.</span>
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
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
      <Advice />
    </Container>
  );
};

export default Index;
