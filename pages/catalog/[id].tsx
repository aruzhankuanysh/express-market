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

export interface IProductsCatalog {
  title: string;
  ProductsList: Array<Product>;
}

const Menu = (): JSX.Element => {
  const router = useRouter();
  const [children, setChildren] = useState("");
  const [brand, setBrand] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [ProductsList, setProductsList] = useState<Product[] | null>(null);
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
    console.log(router.query["id"]);
    console.log(router.query);
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
                ProductsList: prod_buf ?? [],
              });
            });
            setProductsCatalog(buf_list);
          }
        }
      }
      console.log("fff", categories.categories[index]);
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
      {/* content */}
      <BreadCrumbs />
      <Row>
        <Col xs="3" lg="3" xl="3" className="pe-4">
          
          <CategoriesNav />
        </Col>
        <Col>
          {isLoading ? (
            <GrowSpinner/>
          ) : (
            <CategoriesMenu ProductsCatalog={ProductsCatalog ?? []} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Menu;
