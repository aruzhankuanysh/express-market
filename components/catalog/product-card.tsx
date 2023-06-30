import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Row } from "react-bootstrap";
import Counter from "../ui-elements/count-button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { decProduct, incProduct } from "@/store/cartSlice";
import { Product } from "@/specs/gosuTypes";

const maxTitleLength = 15;
const maxTitleLengthGlobal = 45;

const ProductCard = ({ product }: { product: Product }): JSX.Element => {
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart_products = useAppSelector((state) => state.cart.products);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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

  const truncateTitleSmallScreens = (title: string) => {
    const smallScreenSize = 768;
    if (windowWidth <= smallScreenSize && title.length > maxTitleLength) {
      return `${title.substring(0, maxTitleLength)}...`;
    }
    return title;
  };

  const truncateTitleGlobal = (title: string) => {
    if (title.length > maxTitleLengthGlobal) {
      return `${title.substring(0, maxTitleLengthGlobal)}...`;
    }
    return title;
  };

  return (
    <Card
      className="d-flex flex-column justify-content-between rounded-4 btn_grey mx-auto product_card"
      style={{ width: "100%", cursor: "pointer", maxWidth: "210px" }}
    >
      <Card.Header
        className="position-relative bg-transparent border-0 p-0"
        onClick={() => {
          router.push(`/product-page?productId=${product.id}`);
        }}
      >
        <Card.Img
          className="rounded-4"
          variant="top"
          src={`data:image/png;base64,${product?.images}`}
        />
        {/* <div className="bg-orange position-absolute bottom-0 mb-4 rounded-4 text-light fw-bold action-tag px-3">
          -40%
        </div> */}
      </Card.Header>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center text-start">
        <div>
          <Card.Title className="align-items-end price-mobile-card">
            {/* <p className="position-relative text-secondary ms-5 mb-0 mobile-price">
              {product?.price} сум
              <b
                className="text-strikethrough mobile-price"
                style={{ left: "-3px", top: "-7px" }}
              >
                _______
              </b>
            </p> */}
            <h4 className="text-danger mobile-price">{product?.price} сум</h4>
          </Card.Title>
          <Card.Text
            className="pt-3 card_text_wrap "
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <span
              onClick={() => {
                router.push(`/product-page?productId=${product.id}`);
              }}
              className="mobile-text"
            >
              {truncateTitleGlobal(truncateTitleSmallScreens(product?.name))}
            </span>
            <span className="text-secondary">{product?.weight} г</span>
          </Card.Text>
        </div>
        <Row className="align-self-center mt-2">
          <Counter count={count} increment={increment} decrement={decrement} />
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
