import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card, Container, Image, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/router";
import { Product } from "@/specs/gosuTypes";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { decProduct, incProduct } from "@/store/cartSlice";
import Counter from "../ui-elements/count-button";
import { useEffect, useState } from "react";

const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart_products = useAppSelector((state) => state.cart.products);

  const increment = () => {
    product ? dispatch(incProduct(product)) : null;
  };

  const decrement = () => {
    product ? dispatch(decProduct(product)) : null;
  };

  useEffect(() => {
    if (product && cart_products) {
      const prod_buf = cart_products.filter((p) => p.item.id === product.id)[0];
      setCount(prod_buf?.count ?? 0);
    }
  }, [cart_products, product]);
  return (
    <>
      <Card
        className="rounded-4 btn_grey mx-auto product_card"
        style={{ width: "100%", cursor: "pointer", maxWidth: "210px" }}
      >
        <Card.Header
          className="position-relative bg-transparent border-0 p-0"
          onClick={() => {
            router.push(`/product-page?productId=${product.id}`);
          }}
        >
          <Card.Img
            className="rounded-4 "
            variant="top"
            src={`data:image/png;base64,${product?.images}`}
          />
          <div className="bg-orange position-absolute bottom-0 mb-4 rounded-4 text-light fw-bold action-tag px-3">
            -40%
          </div>
        </Card.Header>
        <Card.Body className="text-start">
          <Card.Title className=" align-items-end price-mobile-card">
            <p className="position-relative text-secondary ms-5 mb-0 mobile-price">
              {product?.price} сумм
              <b
                className="text-strikethrough mobile-price "
                style={{ left: "-3px", top: "-7px" }}
              >
                _______
              </b>
            </p>
            <h4 className="text-danger  mobile-price ">{product?.price}сумм</h4>
          </Card.Title>
          <Card.Text className="pt-3">
            <span className="mobile-text ">{product?.name}</span>
            <span className="text-secondary ">{product?.weight} г</span>
          </Card.Text>
          <Row>
            <Counter
              count={count}
              increment={increment}
              decrement={decrement}
            />
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
