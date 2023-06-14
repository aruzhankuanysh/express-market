import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Product } from "@/specs/gosuTypes";
import AppService from "@/specs/gosuService";
import { useRouter } from "next/router";

function SearchBar(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm !== "") {
        const results = await AppService.searchProducts(searchTerm);
        if (Array.isArray(results)) {
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
        className="input rounded-4 height-3"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Dropdown show={showDropdown} align={{ lg: "end" }} ref={dropdownRef}>
        <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto",  maxWidth:"500px", top:"30px", overflowX:"hidden" }}>
          {Array.isArray(searchResults) &&
            searchResults.map((product, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  router.push(`/product-page?productId=${product.id}`);
                //   handleClick();
                }}
              >
                {product.name}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default SearchBar;