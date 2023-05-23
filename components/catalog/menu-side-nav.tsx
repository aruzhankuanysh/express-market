import { useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { Button, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/router";

const MenuSideNav = ({}): JSX.Element => {
  const categories = useAppSelector((state) => state.category);
  const router = useRouter();

  useEffect(() => {
    console.log(categories.categories);
  }, [categories.categories]);

  return (
    <>
      <Navbar id="indexCategorie">
        <Accordion defaultActiveKey="0" className="w-100">
          {(Array.isArray(categories.categories) ? categories.categories : []).map((main_category) => (
            <Accordion.Item eventKey={main_category.category_id} key={main_category.category_id}>
              <Accordion.Header>
                <img
                  style={{ width: "40px" }}
                  className="me-1"
                  src={`/imgCategories/${main_category.category_id}.svg`}
                  alt={`category_img_${main_category.name_category}`}
                />
                {main_category.name_category}
              </Accordion.Header>
              <Accordion.Body className="d-flex flex-column" style={{ paddingLeft: "30px" }}>
                {(main_category.children_category ?? []).map(
                  (children_category) => (
                    <Accordion defaultActiveKey="child-0" key={children_category.category_id}>
                      <Accordion.Item eventKey={`child-${children_category.category_id}`}>
                        <Accordion.Header>
                          {children_category.name_category}
                        </Accordion.Header>
                        <Accordion.Body className="d-flex flex-column" style={{ paddingLeft: "30px" }}>
                          {(children_category.brand ?? []).map((brand) => (
                            <Button key={`brand-${brand.category_id}`} className="text-start" onClick={() => {router.push(`/catalog/${main_category.category_id}?children=${children_category.category_id}&brand=${brand.category_id}`)}}>
                              {brand.name_category}
                            </Button>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Navbar>
    </>
  );
};

export default MenuSideNav;
