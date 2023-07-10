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

function MobileHeader(): JSX.Element {
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
      <Navbar className="d-block d-lg-none mb-4 ">
        <Row className="px-2 mt-2">
          <Col
            style={{
              display: "flex",
              alignItems: " center",
              justifyContent: "flex-start",
            }}
            xxs={2}
            md={1}
            className="p-0"
          >
            <DropdownMenu />
          </Col>
          <Col xxs={10} md={11} className="px-0">
            <AdressBar />
          </Col>
        </Row>
        <Row className="mt-3 px-2 mb-3">
          <Col xxs={10}  md={11} className="px-0">
            <Form.Control
              placeholder="Найдите товар"
              id="search_bar"
              autoComplete="off"
              style={{height:"48px"}}
              className="input rounded-4 height-3"
              // onClick={() => {
              //   router.push("/orders");
              // }}
            />
          </Col>
          <Col xxs={2} md={1} className="px-0" style={{display:"flex", justifyContent:"flex-end"}}>
            <Login />
          </Col>
        </Row>
        <Row>
          <Container>
            {(Array.isArray(categories.categories)
              ? categories.categories
              : []
            ).map((main_category) => {
              const filteredSubcategories = (
                main_category.children_category ?? []
              ).filter((children_category) =>
                subcategoriesToShow.includes(children_category.category_id)
              );

              return filteredSubcategories.length > 0 ? (
                <Row key={main_category.category_id}>
                  {filteredSubcategories.map((children_category) => (
                    <Col
                      key={children_category.category_id}
                      style={{ padding: "0", width: "33%" }}
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
                        <h4 style={{ fontSize: "1rem" }}>
                          {children_category.name_category}
                        </h4>
                      </Button>
                    </Col>
                  ))}
                </Row>
              ) : null;
            })}
          </Container>
        </Row>
      </Navbar>
    </>
  );
}

export default MobileHeader;
