import AppService from "@/specs/gosuService";
import { Brand, Category, Product, SubCategory } from "@/specs/gosuTypes";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function BreadCrumbs() {
  const router = useRouter();
  const categories = useAppSelector((state) => state.category);
  const [rout, setRout] = useState<Category[] | SubCategory[] | Brand[]>([]);

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if(router.query?.productId) {
      AppService.getProduct(router.query["productId"]?.toString()).then((res) => {
        if (res) {
          setProduct(res["Items"][0]);
        }
      });
    } else {
      setProduct(undefined)
    }
  }, [router.query]);

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
              categories.categories[index].children_category[child_index],
              categories.categories[index].children_category[child_index].brand[
                brend_index
              ],
            ]);
          } else {
            setRout([
              categories.categories[index].children_category[child_index],
            ]);
          }
        } else {
          setRout([]);
        }
      } else {
        setRout([]);
      }
    }
  }, [router.query, router.pathname, categories.categories]);

  return (
    <div style={{ display: "flex" }}>
      <>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
          className="d-none d-md-flex"
        >
          {"Главная >"}
        </div>
        {product ? (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push(`/product-page?productId=${router.query?.productId}`)
            }}
            className="d-none d-md-flex"
          >
            {product.name}
          </div>
        ) : null}
        {rout.map((item, index) => (
          <div
            style={{ cursor: "pointer", fontSize:"16px", fontWeight:"600",  }}
            onClick={() => {
              router.push({
                pathname: `/catalog/${router.query["id"]}`,
                query: {
                  children: router.query["children"],
                  brand: index >= 2 ? item.category_id : undefined,
                },
              });
            }}
            key={index}
          >
            {item.name_category}
          </div>
        ))}
      </>
    </div>
  );
}
