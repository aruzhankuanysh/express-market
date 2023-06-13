import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container, Navbar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";

const CategoriesNav = ({}): JSX.Element => {
  const router = useRouter();
  const categories = useAppSelector((state) => state.category);

  const [children, setChildren] = useState("");

  useEffect(() => {
    // console.log(router.query["id"]);
    // console.log(router.query);
    router.query["children"] ? setChildren(router.query["children"].toString()) : setChildren("");
  }, [router.pathname, router.query]);

  return (
    <>
      <Navbar id="idCatalogs">
        <Accordion defaultActiveKey="0" className="w-100 d-none d-lg-block">
          {(Array.isArray(categories.categories) ? categories.categories : [])
            .filter((main_category) => {
              return main_category.category_id === router.query["id"];
            })
            .map((main_category) => (
              <Accordion.Item eventKey="0" key={main_category.category_id}>
                <Accordion.Header style={{fontWeight:"500"}}>
                  <h6 className="mb-1">{main_category.name_category} </h6>
                </Accordion.Header>
                <Accordion.Body className="d-flex flex-column" style={{ paddingLeft: "30px",  }}>
                  {(main_category.children_category ?? []).map((children_category) => (
                      <Accordion defaultActiveKey="child-0" key={children_category.category_id}>
                        <Accordion.Item  eventKey={children === children_category.category_id ? 'child-0' : `child-${children_category.category_id}`}>
                          <Accordion.Header className="mt-2" >
                            {children_category.name_category}
                          </Accordion.Header>
                          <Accordion.Body className="d-flex flex-column" style={{ paddingLeft: "30px" }}>
                            {(children_category.brand ?? []).map((brand) => (
                              <Button
                                key={`brand-${brand.category_id}`}
                                className="text-start"
                                onClick={() => {
                                  router.push(
                                    `/catalog/${main_category.category_id}?children=${children_category.category_id}&brand=${brand.category_id}`
                                  );
                                }}
                              >
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

export default CategoriesNav;
