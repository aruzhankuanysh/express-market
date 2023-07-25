import CategoriesNav from "@/components/categories/categories-nav";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesMenu from "@/components/categories/categories-menu";
import PageContent from "@/components/page-content";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/specs/gosuTypes";
import { useAppSelector } from "@/store/store";
import AppService from "@/specs/gosuService";
import BreadCrumbs from "@/components/ui-elements/bread-crumbs";
import GrowSpinner from "@/components/ui-elements/spinner";
import ToUpBtn from "@/components/ui-elements/to-up-btn";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import MobileCart from "@/components/ui-elements/mobile-cart";

export interface IProductsCatalog {
  brand_id: string;
  title: string;
  ProductsList: Array<Product>;
}

const Menu = (): JSX.Element => {
  const router = useRouter();
  const [children, setChildren] = useState("");
  const [brand, setBrand] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ProductsList, setProductsList] = useState<Product[] | null>(null);
  const [expanded, setExpanded] = useState(false);
  const categories = useAppSelector((state) => state.category);
  const [ProductsCatalog, setProductsCatalog] = useState<
    IProductsCatalog[] | null
  >(null);

  useEffect(() => {
    if (brand.length > 0) {
      setIsLoading(true);
      AppService.getProducts(brand).then((products) => {
        if (products) {
          setProductsList(products["Items"]);
          setIsLoading(false);
        } else {
          setProductsList(null);
        }
      });
    } else {
      setIsLoading(true);
      AppService.getProducts(children).then((products) => {
        if (products) {
          setProductsList(products["Items"]);
          setIsLoading(false);
        } else {
          setProductsList(null);
        }
      });
    }
  }, [brand, children]);

  useEffect(() => {
    router.query["children"]
      ? setChildren(router.query["children"].toString())
      : setChildren("");
    router.query["brand"]
      ? setBrand(router.query["brand"].toString())
      : setBrand("");
  }, [router.pathname, router.query]);

  useEffect(() => {
    if (categories.categories) {
      const index = categories.categories.findIndex(
        (category) => category.category_id === router.query["id"]
      );
      if (index >= 0) {
        const child_index = categories.categories[
          index
        ].children_category.findIndex(
          (child_item) => child_item.category_id === router.query["children"]
        );
        if (child_index >= 0) {
          const brend_index = categories.categories[index].children_category[
            child_index
          ].brand.findIndex(
            (brand_item) => brand_item.category_id === router.query["brand"]
          );
          if (brend_index >= 0) {
            const buf: IProductsCatalog = {
              title:
                categories.categories[index].children_category[child_index]
                  .brand[brend_index].name_category,
              ProductsList: ProductsList ?? [],
              brand_id:
                categories.categories[index].children_category[child_index]
                  .brand[brend_index].category_id,
            };
            setProductsCatalog([buf]);
          } else {
            let buf_list: IProductsCatalog[] = [];
            categories.categories[index].children_category[
              child_index
            ].brand.forEach((brand_item) => {
              const prod_buf: Product[] = (ProductsList ?? []).filter(
                (product) => product.brand_id === brand_item.category_id
              );
              buf_list.push({
                title: brand_item.name_category,
                brand_id: brand_item.category_id,
                ProductsList: prod_buf ?? [],
              });
            });
            setProductsCatalog(buf_list);
          }
        }
      }
    }
  }, [
    ProductsList,
    categories.categories,
    router.pathname,
    router.query,
    children,
    brand,
  ]);

  return (
    <Container id="comp_content" style={{ minHeight: "100vh" }}>
      <div className="mobile_category_nav">
        <Row
          className="d-flex d-md-none "
          style={{
            height: "50px",
            top: "0px",
            width: "100vw",
            borderBottom: " solid 1px rgba(0, 0, 0, 0.2)",
            position: "fixed",
            background: "rgb(245, 245, 245)",
            alignContent: "center",
            zIndex: "99",
          }}
        >
          <Col xxs={2} onClick={() => router.push("/")}>
            <ArrowBackIcon />
          </Col>

          <Col xxs={8} className="d-flex" style={{ justifyContent: "center" }}>
            <BreadCrumbs />
          </Col>
          <Col
            xxs={2}
            className="d-flex"
            style={{ justifyContent: "flex-end" }}
          >
            <span onClick={() => {
              router.push('/search')
            }}>
              <SearchIcon />
            </span>
          </Col>
        </Row>
        <div style={{ marginTop: "70px" }} className="d-block d-lg-none ">
          {categories?.categories &&
          router.query["id"] &&
          router.query["children"]
            ? categories.categories
                .filter(
                  (main_category) =>
                    main_category.category_id === router.query["id"]
                )
                .flatMap((main_category) => main_category.children_category)
                .filter(
                  (children_category) =>
                    children_category.category_id === router.query["children"]
                )
                .flatMap(
                  (selected_child_category) => selected_child_category.brand
                )
                .slice(0, showAllCategories ? undefined : 5)
                .map((brand_item) => (
                  <Link
                    key={brand_item.category_id}
                    href={`#${brand_item.category_id}`}
                    // passHref
                  >
                    <span className="categories_nav mx-1 px-2 py-1 rounded-4 mt-2">
                      {brand_item.name_category}
                    </span>
                  </Link>
                ))
            : null}

          {categories?.categories &&
            router.query["id"] &&
            router.query["children"] &&
            categories.categories
              .filter(
                (main_category) =>
                  main_category.category_id === router.query["id"]
              )
              .flatMap((main_category) => main_category.children_category)
              .filter(
                (children_category) =>
                  children_category.category_id === router.query["children"]
              )
              .flatMap(
                (selected_child_category) => selected_child_category.brand
              ).length > 5 && (
              <button
                className="categories_nav mx-1 px-2 py-1 rounded-4 mt-2"
                style={{ border: "none" }}
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? "<" : "Показать все"}
              </button>
            )}
        </div>
      </div>

      <Row>
        <Col xs="3" lg="3" xl="3" className="pe-4">
          <CategoriesNav />
        </Col>
        <Col>
          {isLoading ? (
            <GrowSpinner />
          ) : (
            <CategoriesMenu ProductsCatalog={ProductsCatalog ?? []} />
          )}
        </Col>
      </Row>
      <ToUpBtn />
      <MobileCart />
    </Container>
  );
};

export default Menu;
