import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/store";

const Catalog = ({}): JSX.Element => {
  // /imgCategories/Rectangle12.svg

  const router = useRouter();
  const categories = useAppSelector((state) => state.category);

  return (
    <>
      <Row className="mb-5">
        <Container>
          {(Array.isArray(categories.categories) ? categories.categories : []).map((main_category) => (
            <Row key={main_category.category_id} className="mb-5">
              <h1 className="mb-4">{main_category.name_category}</h1>
              {(main_category.children_category ?? []).map((children_category) => (
                <Col key={children_category.category_id} style={{padding: '0', minWidth: '20%'}}>
                    <Button 
                      className="catalog_button" 
                      style={{backgroundImage:`url(/imgCategories/${children_category.category_id}.svg)`}}
                      onClick={() => router.push(`/${main_category.category_id}?children=${children_category.category_id}`)}
                    >
                      <h4>{children_category.name_category}</h4>
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
