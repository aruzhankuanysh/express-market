import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/router";

const Catalog = ({}): JSX.Element => {
  const products = [
    {
      id: "1",
      title: "Овощной прилавок",
      categories: [
        {
          productId: "1",
          name: "Овощи, грибы и зелень",
          imageUrl: '/imgCategories/Rectangle12.svg'
        },
        {
          productId: "2",
          name: "Фрукты и ягоды",
          imageUrl: '/imgCategories/Rectangle13.svg'
        }
      ],
    },
    {
      id: "2",
      title: "Молочный прилавок",
      categories: [
        {
          productId: "2",
          name: "Молоко, масло и яйца",
          imageUrl: '/imgCategories/Rectangle12-1.svg'
        },
        {
          productId: "3",
          name: "Сыры",
          imageUrl: '/imgCategories/Rectangle13-1.svg'
        },
        {
          productId: "4",
          name: "Кефир, сметана, творог",
          imageUrl: '/imgCategories/Rectangle14.svg'
        },
        {
          productId: "3",
          name: "Йогурты и десерты",
          imageUrl: '/imgCategories/Rectangle15.svg'
        },
        {
          productId: "3",
          name: "Молочное для детей",
          imageUrl: '/imgCategories/Rectangle16.svg'
        },
      ],
    },
    {
      id: "3",
      title: "Булочная",
      categories: [
        {
          productId: "3",
          name: "Хлеб",
          imageUrl: '/imgCategories/Rectangle14-4.svg'
        },
        {
          productId: "3",
          name: "Выпечка",
          imageUrl: '/imgCategories/Rectangle14-2.svg'
        },
        {
          productId: "3",
          name: "Хлебцы",
          imageUrl: '/imgCategories/Rectangle14-3.svg'
        },
      ],
    },
    {
      id: "4",
      title: "Вода и напитки",
      categories: [
        {
          productId: "3",
          name: "Вода",
          imageUrl: '/imgCategories/Rectangle12-2.svg'
        },
        {
          productId: "3",
          name: "Соки и морсы",
          imageUrl: '/imgCategories/Rectangle13-2.svg'
        },
        {
          productId: "3",
          name: "Газировка и тоники",
          imageUrl: '/imgCategories/Rectangle14-1.svg'
        },
        {
          productId: "3",
          name: "Холодный чай и кофе",
          imageUrl: '/imgCategories/Rectangle15-1.svg'
        },
        {
          productId: "3",
          name: "Энергетики и пиво",
          imageUrl: '/imgCategories/Rectangle16-1.svg'
        },
      ],
    },
    {
      id: "5",
      title: "Сладкое и снеки",
      categories: [
        {
          productId: "3",
          name: "Снеки",
          imageUrl: '/imgCategories/Rectangle14-9.svg'
        },
        {
          productId: "3",
          name: "Шоколад и конфеты",
          imageUrl: '/imgCategories/Rectangle14-7.svg'
        },
        {
          productId: "3",
          name: "Торты, печенье, вафли",
          imageUrl: '/imgCategories/Rectangle14-8.svg'
        },
        {
          productId: "3",
          name: "Сухофрукты и орехи",
          imageUrl: '/imgCategories/Rectangle17-1.svg'
        },
        {
          productId: "3",
          name: "Пастила и мармелад",
          imageUrl: '/imgCategories/Rectangle14-10.svg'
        },
        {
          productId: "3",
          name: "Варенье, мед и пасты",
          imageUrl: '/imgCategories/Rectangle14-11.svg'
        },
        {
          productId: "3",
          name: "Леденцы и жвачка",
          imageUrl: '/imgCategories/Rectangle18-1.svg'
        },
      ],
    },
    {
      id: "6",
      title: "Мясо, птицы, рыба",
      categories: [
        {
          productId: "3",
          name: "Колбаса и сосиски",
          imageUrl: '/imgCategories/Rectangle17.svg'
        },
        {
          productId: "3",
          name: "Мясо и птица",
          imageUrl: '/imgCategories/Rectangle14-5.svg'
        },
        {
          productId: "3",
          name: "Рыба и морепродукты",
          imageUrl: '/imgCategories/Rectangle14-6.svg'
        },
        {
          productId: "3",
          name: "Закуски и паштеты",
          imageUrl: '/imgCategories/Rectangle18.svg'
        }
      ],
    },
    {
      id: "7",
      title: "Заморозка",
      categories: [
        {
          productId: "3",
          name: "Мороженое",
          imageUrl: '/imgCategories/Rectangle14-14.svg'
        },
        {
          productId: "3",
          name: "Пельмени и вареники",
          imageUrl: '/imgCategories/Rectangle14-12.svg'
        },
        {
          productId: "3",
          name: "Овощи и ягоды",
          imageUrl: '/imgCategories/Rectangle14-13.svg'
        },
        {
          productId: "3",
          name: "Десерты",
          imageUrl: '/imgCategories/Rectangle17-2.svg'
        },
        {
          productId: "3",
          name: "Полуфабрикаты",
          imageUrl: '/imgCategories/Rectangle14-15.svg'
        },
        {
          productId: "3",
          name: "Рыба и морепродукты",
          imageUrl: '/imgCategories/Rectangle14-16.svg'
        },
        {
          productId: "3",
          name: "Лед и кое-что еще",
          imageUrl: '/imgCategories/Rectangle18-2.svg'
        },
      ],
    },
  ];
  const router = useRouter();
  return (
    <>
      <Row className="mb-5">
        <Container>
          {products.map((product) => (
            <Row key={product.id} className="mb-5">
              <h1 className="mb-4">{product.title}</h1>
              {(product.categories ?? []).map((index) => (
                <Col key={index.productId} style={{padding: '0', minWidth: '20%'}}>
                    <Button 
                      className="catalog_button" 
                      style={{backgroundImage:`url(${index.imageUrl})`}}
                      onClick={() => router.push(`/menu/${index.productId}`)}
                    >
                      <h4>{index.name}</h4>
                    </Button>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </Row>
    </>
  );
};

export default Catalog;
