import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const CategoriesNav = ({}): JSX.Element => {
  const categories = [
    {
      productId: "1",
      name: "Овощи, грибы и зелень",
      imageUrl: "/imgCategories/Rectangle12.svg",
      catalogs: [
        {
          catalogId: "1",
          catalogName: "Помидоры",
          catalogProducts: [
            {
              prodId: "1",
              prodName: "Помидоры черри",
              prodPrice: "100",
            },
            {
              prodId: "2",
              prodName: "Помидоры кокт",
              prodPrice: "100",
            },
            {
              prodId: "3",
              prodName: "Помидоры сливовидные",
              prodPrice: "100",
            },
          ],
        },
        {
          catalogId: "2",
          catalogName: "Огурцы",
          catalogProducts: [
            {
              prodId: "1",
              prodName: "Огурцы1",
              prodPrice: "100",
            },
            {
              prodId: "2",
              prodName: "Огурцы2",
              prodPrice: "100",
            },
            {
              prodId: "3",
              prodName: "Огурцы3",
              prodPrice: "100",
            },
            {
              prodId: "4",
              prodName: "Огурцы4",
              prodPrice: "100",
            },
            {
              prodId: "5",
              prodName: "Огурцы5",
              prodPrice: "100",
            },
          ],
        },
        {
          catalogId: "3",
          catalogName: "Авакадо",
          catalogProducts: [
            {
              prodId: "1",
              prodName: "Авакадо1",
              prodPrice: "100",
            },
            {
              prodId: "2",
              prodName: "Авакадо2",
              prodPrice: "100",
            },
            {
              prodId: "3",
              prodName: "Авакадо3",
              prodPrice: "100",
            },
            {
              prodId: "4",
              prodName: "Авакадо4",
              prodPrice: "100",
            },
            {
              prodId: "5",
              prodName: "Авакадо5",
              prodPrice: "100",
            },
          ],
        },
        {
          catalogId: "4",
          catalogName: "Картошки и батат",
          catalogProducts: [
            {
              prodId: "1",
              prodName: "Красный картофель",
              prodPrice: "100",
            },
            {
              prodId: "2",
              prodName: "картофель мытый",
              prodPrice: "100",
            },
            {
              prodId: "3",
              prodName: "картофель Беби",
              prodPrice: "100",
            },
            {
              prodId: "4",
              prodName: "Картофель молодой",
              prodPrice: "100",
            },
          ],
        },
      ],
    },
    {
      productId: "2",
      name: "Фрукты и ягоды",
      imageUrl: "/imgCategories/Rectangle13.svg",
      catalogs: [
        {
          catalogId: "1",
          catalogName: "aiaiai",
          catalogProducts: [
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
          ],
        },
        {
          catalogId: "1",
          catalogName: "aiaiai",
          catalogProducts: [
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
          ],
        },
        {
          catalogId: "1",
          catalogName: "aiaiai",
          catalogProducts: [
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
          ],
        },
        {
          catalogId: "1",
          catalogName: "aiaiai",
          catalogProducts: [
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
            {
              prodId: "123",
              prodName: "dasssssssss",
              prodPrice: "100",
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Navbar id="idCatalogs">
        <Accordion defaultActiveKey="1" className="w-100">
          {categories.map((categorie) => (
            <Accordion.Item eventKey={categorie.productId}>
              <Accordion.Header><h6 className="mb-1">{categorie.name}</h6></Accordion.Header>
              <Accordion.Body
                className="d-flex flex-column"
                style={{ paddingLeft: "30px" }}
              >
                {(categorie.catalogs ?? []).map((index) => (
                  <Button key={1} className="text-start">
                    {index.catalogName}
                  </Button>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Navbar>
    </>
  );
};

export default CategoriesNav;
