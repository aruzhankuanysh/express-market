import { Product } from "@/specs/gosuTypes";
import CategoriesProducts from "./categories-products";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IProductsCatalog } from "@/pages/catalog/[id]";

export default function CategoriesMenu({ProductsCatalog}: {ProductsCatalog : IProductsCatalog[]}) {
  const router = useRouter();
  const [children, setChildren] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    console.log(router.query["id"]);
    console.log(router.query);
    router.query["children"] ? setChildren(router.query["children"].toString()) : setChildren("");
    router.query["brand"] ? setBrand(router.query["brand"].toString()) : setBrand("");
  }, [router.pathname, router.query]);

  useEffect(() => {
    console.log(ProductsCatalog)
  }, [ProductsCatalog]);

  return (
    <>
    {
      ProductsCatalog.map((product, index) => {
        return (
          <div key={`${product.title}-${index}`}>
                <h1 className="fw-bolder mb-4">{product.title}</h1>
                <CategoriesProducts productList={product.ProductsList} />
          </div>
        )
      })
    }
    </>
  );
}
