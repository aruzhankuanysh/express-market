import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Product } from "@/specs/gosuTypes";
import AppService from "@/specs/gosuService";
import { useRouter } from "next/router";

function SearchBar(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const maxTitleLength = 35;

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


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <Form.Control
        placeholder="Найдите товар"
        id="search_bar"
        autoComplete="off"
        className="input rounded-4 height-3"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Dropdown show={showDropdown} align={{ lg: "end" }} ref={dropdownRef}>
        <Dropdown.Menu
          style={{
            maxHeight: "200px",
            maxWidth: "420px",
            top: "30px",
            fontWeight:"600",
            boxShadow:"0px 0px 11px rgba(0, 0, 0, 0.25)"
          }}
          className="custom-scrollbar search_wrapper"
        >
          {searchResults.length > 0 ? (
            searchResults.map((product, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  router.push(`/product-page?productId=${product.id}`);
                  handleClick()
                }}
              >
                 {truncateTitleSmallScreens(product?.name)}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>Ничего не найдено</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default SearchBar;
