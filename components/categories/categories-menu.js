import Container from "react-bootstrap/Container";
import CategoriesProducts from "@/components/categories/categories-products";

export default function CategoriesMenu() {
  return (
    <>
      <h1 className="fw-bolder mb-4">Помидоры</h1>
      <CategoriesProducts />
      <h1 className="fw-bolder mb-4">Огурцы</h1>
      <CategoriesProducts />
    </>
  );
}
