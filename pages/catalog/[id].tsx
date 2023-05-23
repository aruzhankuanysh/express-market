import CategoriesNav from "@/components/categories/categories-nav";
import { Col, Container, Row } from "react-bootstrap";
import CategoriesMenu from "@/components/categories/categories-menu";
import Header from "@/components/header";
import { getProducts } from "@/specs/gosuService";
import PageContent from "@/components/page-content";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/specs/gosuTypes";
import { useAppSelector } from "@/store/store";

export interface IProductsCatalog {
  title: string;
  ProductsList: Array<Product>;
}

const Menu = (): JSX.Element => {
  const router = useRouter();
  const [children, setChildren] = useState("");
  const [brand, setBrand] = useState("");
  const [ProductsList, setProductsList] = useState<Product[] | null>(null);
  const categories = useAppSelector((state) => state.category);
  const [ProductsCatalog, setProductsCatalog] = useState<IProductsCatalog[] | null>(null);
  
  useEffect(() => {
    getProducts(brand).then((products) => {
      if (products) {
        setProductsList(products['Items']);
      }else {
        setProductsList(null);
      }
    });
  }, [brand]);

  useEffect(() => {
    console.log(router.query["id"]);
    console.log(router.query);
    router.query["children"] ? setChildren(router.query["children"].toString()) : setChildren("");
    router.query["brand"] ? setBrand(router.query["brand"].toString()) : setBrand("");
  }, [router.pathname, router.query]);

  useEffect(() => {
    if (categories.categories) {
      const index = categories.categories.findIndex((category) => category.category_id === router.query["id"]);
      if (index >= 0) {
        const child_index = categories.categories[index].children_category.findIndex((child_item) => child_item.category_id === router.query["children"]);
        if (child_index >= 0) {
          const brend_index = categories.categories[index].children_category[child_index].brand.findIndex((brand_item) => brand_item.category_id === router.query["brand"]);
          if (brend_index >= 0) {
            const buf:IProductsCatalog = {
              title: categories.categories[index].children_category[child_index].brand[brend_index].name_category,
              ProductsList: ProductsList ?? [],
            }
            setProductsCatalog([buf]);
          }
        }
      }
      console.log("fff",categories.categories[index]);
    }

  }, [ProductsList, categories.categories, router.pathname, router.query, children, brand]);

  return (
    <PageContent>
      <Container id="comp_content" style={{height: "100vh"}}>
        {/* content */}
        <Row>
          <Col xs="3" lg="3" xl="3" className="pe-4">
            <CategoriesNav />
          </Col>
          <Col>
            <CategoriesMenu ProductsCatalog={ProductsCatalog ?? []} />
          </Col>
        </Row>
      </Container>
    </PageContent>
  );
};

export default Menu;
