import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import zIndex from "@mui/material/styles/zIndex";

const MobileCart = (): JSX.Element => {
  const dispath = useAppDispatch();

  const totalPrice = useAppSelector((state) => state.cart.total);
  const cartProduct = useAppSelector((state) => state.cart.products);


 

  const router = useRouter();

  return (
    <>
      <Container
        className="px-0 d-block d-lg-none"
        style={{
          height: "80px",
          width: "100vw",
          background: "rgb(245, 245, 245)",
          position: "fixed",
          zIndex: "99",
          left:"0px",
          bottom:"0px",
          borderRadius:"25px 25px 0px 0px",
          boxShadow: "0px 0px 10px black"
        }}
      >
        <Button
          onClick={() => {
            router.push(`/cart`);
          }}
          className="btn_orange_gradient open_cart_btn rounded-5 mt-2 mx-auto"
        >
          <p className="m-3 mobile-text">Перейти в корзину</p>
          <p className="m-3 mobile-text">{totalPrice} UZS</p>
        </Button>
      </Container>
    </>
  );
};

export default MobileCart;
