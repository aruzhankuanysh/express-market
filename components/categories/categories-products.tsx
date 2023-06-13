import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../catalog/product-card";
import { Product } from "@/specs/gosuTypes";

export default function CategoriesProducts({ productList }: { productList: Array<Product>;}) {
  return (
    <>
      <Row className="mb-5">
        {productList.map((product, index) => {
          return (
            <Col xxs={4} lg={3} md={3}  className="mb-2 px-1"  key={index}>
              <ProductCard product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
