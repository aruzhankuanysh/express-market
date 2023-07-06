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
      {/* <Navbar className="d-block d-lg-none mb-4 px-4">
        <Row>
          <Col
            style={{
              display: "flex",
              alignItems: " center",
              justifyContent: "flex-start",
            }}
            xxs={2}
            className="p-0"
          >
            <Sidebar />
          </Col>
          <Col xxs={10} className="mt-2">
            <AdressBar />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xss={12} className="px-0">
            <Form.Control
              placeholder="Найдите товар"
              id="search_bar"
              autoComplete="off"
              className="input rounded-4 height-3"
              // onClick={() => {
              //   router.push("/orders");
              // }}
            />
          </Col>
        </Row>
        <Row>
          <Container>
            {(Array.isArray(categories.categories)
              ? categories.categories
              : []
            ).map((main_category) => (
              <Row key={main_category.category_id} className="mb-5">
                {(main_category.children_category ?? []).map(
                  (children_category) =>
                    subcategoriesToShow.includes(
                      children_category.category_id
                    ) ? (
                      <Col
                        className="category_wrap"
                        key={children_category.category_id}
                        style={{ padding: "0", minWidth: "20%" }}
                      >
                        <Button
                          className="catalog_button"
                          style={{
                            backgroundImage: `url(/imgCategories/${children_category.category_id}.svg)`,
                          }}
                          onClick={() =>
                            router.push(
                              `/catalog/${main_category.category_id}?children=${children_category.category_id}`
                            )
                          }
                        >
                          <h4>{children_category.name_category}</h4>
                        </Button>
                      </Col>
                    ) : null
                )}
              </Row>
            ))}
          </Container>
        </Row>
      </Navbar> */}

      <Navbar
        style={{
          borderBottom: " solid 1px rgba(0, 0, 0, 0.2)",
          width: "100vw",
        }}
        className=" mb-4 me-0 px-0 py-3 d-none d-lg-flex"
      >
        <Row className="px-0 " style={{ width: "100vw" }}>
          <Col className="d-flex " lg={3} 	xxl={3}>
            <Row>
              <Col>
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
          <Col lg={4} 	xxl={6}>
            <SearchBar />
          </Col>
          <Col lg={5} 	xxl={4} className="pe-0" style={{maxWidth:"500px"}}>
            <Row className="p-0  m-0">
              <Col lg={6} 	xxl={6}>
                <AdressBar />
              </Col>
              <Col lg={4} 	xxl={4}>
                <DropdownCart />
              </Col>
              <Col className="ps-3" lg={2} 	xxl={2}>
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
