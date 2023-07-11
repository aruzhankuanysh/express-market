import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Form, Row, Col, Navbar } from "react-bootstrap";
import { Product } from "@/specs/gosuTypes";
import AppService from "@/specs/gosuService";
import { useRouter } from "next/router";
import Accordion from "react-bootstrap/Accordion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector } from "@/store/store";
import MobileCart from "@/components/ui-elements/mobile-cart";

export default function search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categories = useAppSelector((state) => state.category);
  const router = useRouter();
  const maxTitleLength = 35;
  const maxTitleLengthGlobal = 40;

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.length >= 3) {
        const results = await AppService.searchProducts(searchTerm);
        if (Array.isArray(results) && results.length > 0) {
          setSearchResults(results);
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setShowDropdown(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const truncateTitleSmallScreens = (title: string) => {
    const smallScreenSize = 768;
    if (windowWidth <= smallScreenSize && title.length > maxTitleLength) {
      return `${title.substring(0, maxTitleLength)}...`;
    }
    return title;
  };

  const truncateTitleGlobal = (title: string) => {
    if (title.length > maxTitleLengthGlobal) {
      return `${title.substring(0, maxTitleLengthGlobal)}...`;
    }
    return title;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClickCategory = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    // console.log(categories.categories);
  }, [categories.categories]);
  const [show, setshow] = useState(false);

  const handleMouseEnter = () => {
    setshow(true);
  };

  const handleMouseLeave = () => {
    setshow(false);
  };

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      setshow(!show);
    }
  };

  const handleClose = () => {
    setshow(false);
  };

  return (
    <>
      <Row className="p-3">
        <Col
          onClick={() => {
            router.push("/");
          }}
          xxs={2}
          className="d-flex"
          style={{ alignItems: "center" }}
        >
          <ArrowBackIcon />
        </Col>
        <Col xxs={10}>
          <Form.Control
            placeholder="Найдите товар"
            autoComplete="off"
            className="input rounded-4 search_bar height-3 "
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>

      <Dropdown show={showDropdown} align={{ lg: "end" }} ref={dropdownRef}>
        <Dropdown.Menu
          style={{
            maxHeight: "200px",
            maxWidth: "420px",
            top: "30px",
            fontWeight: "600",
            boxShadow: "0px 0px 11px rgba(0, 0, 0, 0.25)",
          }}
          className="custom-scrollbar search_wrapper"
        >
          {searchResults.length > 0 ? (
            searchResults.map((product, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  router.push(`/product-page?productId=${product.id}`);
                  handleClick();
                }}
              >
                {truncateTitleGlobal(truncateTitleSmallScreens(product?.name))}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>Ничего не найдено</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <Navbar id="indexCategorie" className="p-2">
        <Accordion defaultActiveKey="0" className="w-100">
          {(Array.isArray(categories.categories)
            ? categories.categories
            : []
          ).map((main_category) => (
            <Accordion.Item
              eventKey={main_category.category_id}
              key={main_category.category_id}
            >
              <Accordion.Header>
                <img
                  style={{ width: "40px" }}
                  className="me-1"
                  src={`/imgCategories/${main_category.category_id}.svg`}
                  alt={`category_img_${main_category.name_category}`}
                />
                {main_category.name_category}
              </Accordion.Header>
              <Accordion.Body
                className="d-flex flex-column"
                style={{ paddingLeft: "30px" }}
              >
                {(main_category.children_category ?? []).map(
                  (children_category) => (
                    <Accordion
                      defaultActiveKey="child-0"
                      key={children_category.category_id}
                    >
                      <Accordion.Item
                        eventKey={`child-${children_category.category_id}`}
                      >
                        <Accordion.Header>
                          <span
                            onClick={() => {
                              router.push(
                                `/catalog/${main_category.category_id}?children=${children_category.category_id}`
                              );
                              handleClose();
                            }}
                          >
                            {children_category.name_category}
                          </span>
                        </Accordion.Header>
                      </Accordion.Item>
                    </Accordion>
                  )
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Navbar>
      <MobileCart />
    </>
  );
}
