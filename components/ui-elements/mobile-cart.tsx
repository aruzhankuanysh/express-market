import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MobileCart = (): null | JSX.Element => {
  const dispath = useAppDispatch();
  const [isHidden, setIsHidden] = useState(true); 
  const totalProd = useAppSelector((state) => state.cart.products);
  const [startHiding, setStartHiding] = useState(false);
  const totalPrice = useAppSelector((state) => state.cart.total);

  const router = useRouter();

  useEffect(() => {
    if ((totalProd?.length ?? 0) > 0 && isHidden) {
      setIsHidden(false);
    } else if ((totalProd?.length ?? 0) <= 0 && !isHidden && !startHiding) {
      setStartHiding(true); 
    }
  }, [totalProd]);

  useEffect(() => {
    if (startHiding) {
      const timer = setTimeout(() => {
        setIsHidden(true); 
        setStartHiding(false); 
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [startHiding]);

  if (isHidden) {
    return null;
  }

  return (
    <>
      <div
        className={`px-0 d-block d-lg-none showAnimation ${
          startHiding ? "hideAnimation" : ""
        }`}
        style={{
          minHeight: "75px",
          boxSizing:"content-box",
          width: "100vw",
          background: "rgb(245, 245, 245)",
          position: "fixed",
          zIndex: "99",
          left: "0px",
          bottom: "0px",
          borderRadius: "25px 25px 0px 0px",
          boxShadow: "0px 0px 10px black",
        }}
      >
        <Button
          onClick={() => {
            router.push(`/cart`);
          }}
          className="btn_orange_gradient rounded-4 mt-2 mx-auto"
          style={{ width: "95%", fontSize:"1.1rem" }}
        >
          <p className="m-2 ">Перейти в корзину</p>
          <p className="m-2 ">{totalPrice} UZS</p>
        </Button>
      </div>
    </>
  );
};

export default MobileCart;
