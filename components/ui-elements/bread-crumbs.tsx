import { Brand, Category, SubCategory } from "@/specs/gosuTypes";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function BreadCrumbs() {
  const router = useRouter();
  const categories = useAppSelector((state) => state.category);
  const [rout, setRout] = useState<Category[] | SubCategory[] | Brand[]>([]);

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
            setRout([
              categories.categories[index],
              categories.categories[index].children_category[child_index],
              categories.categories[index].children_category[child_index].brand[brend_index],
            ]);
          } else {
            setRout([
              categories.categories[index],
              categories.categories[index].children_category[child_index],
            ]);
          }
        } else {
          setRout([categories.categories[index]]);
        }
      } else {
        setRout([]);
      }
    }
  }, [router.query, router.pathname, categories.categories]);

  return (
    <div style={{display: "flex"}}>
      <>
        {rout.map((item, index) => (
          <div onClick={() => {
            router.push({
                pathname: `/catalog/${router.query["id"]}`,
                query: {
                    children: index >= 1 ? router.query["children"] : undefined,
                    brand: index >= 2 ? item.category_id : undefined,
                },
              });
          }} key={index}>{item.name_category}{">"}</div>
        ))}
      </>
    </div>
  );
}
