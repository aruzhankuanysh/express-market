import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import SearchBar from "./ui-elements/search-bar";
import Login from "./authorize/login";
import AdressBar from "./ui-elements/address-bar";
import DropdownMenu from "./ui-elements/dropdown-menu";
import DropdownCart from "./ui-elements/dropdown-cart";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCategory } from "@/store/categorySlice";
import { setStocks } from "@/store/stockSlice";
import AppService from "@/specs/gosuService";
import { IcartImg, removeProduct, setImages } from "@/store/cartSlice";
import { Product } from "@/specs/gosuTypes";
import Sidebar from "./sidebar";

function Header(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const categories = useAppSelector((state) => state.category);

  const subcategoriesToShow = ["00-00000013", "00-00000047", "00-00000182"];

  const resetImagesState = () => {
    if (cart.products) {
      let img_list: IcartImg[] = [];
      cart.products.forEach(async (product, index) => {
        const res = await AppService.getProduct(product.item.id);
        if (res) {
          const prod_buf: Product = res["Items"][0];
          img_list = [
            ...img_list,
            { id: prod_buf.id, src: prod_buf.images[0] },
          ];
        } else {
          dispatch(removeProduct(product.item));
        }
        dispatch(setImages(img_list));
      });
    }
  };

  useEffect(() => {
    AppService.getCategory().then((res) => {
      if (res) {
        dispatch(setCategory(res["Category"]));
      }
    });
    AppService.getStocks().then((res) => {
      if (res) {
        dispatch(setStocks(res["Stock"]));
      }
    });
  }, []);

  useEffect(() => {
    resetImagesState();
  }, [cart.products?.length]);

  return (
    <>
      <Navbar
        style={{
          borderBottom: " solid 1px rgba(0, 0, 0, 0.2)",
          width: "100%",
        }}
        className=" mb-4 me-0 px-0 py-3 d-none d-md-flex"
      >
        <Row className="px-0 " style={{ width: "100vw", justifyContent: "space-evenly" }}>
          <Col className="d-flex " lg={3} 	xxl={3} xl={3} md={4}> 
            <Row>
              <Col className="ps-5 ">
                <Image
                  fluid
                  src="/img/express-logo.svg"
                  alt="express-logo"
                  style={{
                    height: "42px",
                    cursor: "pointer",
                    minWidth: "80px",
                  }}
                  onClick={() => {
                    router.push("/");
                  }}
                />
              </Col>
              <Col md="auto">
                <DropdownMenu />
              </Col>
            </Row>
          </Col>
          <Col lg={3} 	xxl={5} xl={4} md={4}>
            <SearchBar />
          </Col>
          <Col lg={6} 	xxl={4} xl={6} md={4} className="pe-0 px-0" style={{maxWidth:"500px"}}>
            <Row className="p-0  m-0">
              <Col lg={6} 	xxl={6} xl={6} md={6}>
                <AdressBar />
              </Col>
              <Col lg={4} xxl={4} xl={4} md={3}>
                <DropdownCart />
              </Col>
              <Col className="d-flex pe-0" lg={2} 	xxl={2} xl={2} md={3} style={{justifyContent:"center"}}>
                <Login />
              </Col>
            </Row>
          </Col>
        </Row>

        {/* <Nav
          className="nav d-flex align-items-center justify-content-end "
          style={{
            flexWrap: "nowrap",
            fontSize: "14px",
            letterSpacing: "-0.5px",
          }}
        >
          <Row> */}

        {/* </Row>
        </Nav> */}
      </Navbar>
    </>
  );
}

export default Header;
