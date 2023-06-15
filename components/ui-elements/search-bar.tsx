import AppService from "@/specs/gosuService";
import { Product } from "@/specs/gosuTypes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Option } from "react-bootstrap-typeahead/types/types";

interface IOption {
  name: string;
  item: Product;
}

function SearchBar(): JSX.Element {
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState<IOption[]>([]);

  const router = useRouter();

  const searchHandler = (option: IOption) => {
    if (option?.item?.id) {
      router.push(`/product-page?productId=${option.item.id}`);
    }
  };

  useEffect(() => {
    if (searchText.length >= 3) {
      AppService.getSearch(searchText).then((res) => {
        console.log("Items", res["Items"]);
        let opt: IOption[] = [];
        if (res["Items"]) {
          const items: Product[] = res["Items"];
          opt = items.map((i) => ({ name: i.name, item: i }));
        }
        setOptions(opt);
      });
    }
  }, [searchText]);

  return (
    <>
      {/* <Form.Control
        placeholder="Найдите товар"
        id="search_bar"
        className="input rounded-4 height-3"
      /> */}
      <Col className="input rounded-4 height-3" id="search_bar">
        <Typeahead
          // clearButton //* можно поправить
          minLength={3}
          id="input-size-example"
          labelKey="name"
          className="input rounded-4 height-3"
          options={options}
          placeholder={"Найдите товар"}
          onChange={(e: any[]) => (e.length > 0 ? searchHandler(e[0]) : null)}
          onInputChange={(e) => {
            setSearchText(e);
          }}
        />
      </Col>
    </>
  );
}

export default SearchBar;
