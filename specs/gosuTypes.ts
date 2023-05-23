export type User = {
  id: string;
  name: string;
  phone: string;
  role: string;
  email: string;
  gender: string;
  birthdate: string;
} | null;

export type Brand = {
  category_id: string;
  name_category: string;
};

export type SubCategory = {
  category_id: string;
  name_category: string;
  brand: Array<Brand>;
};

export type Category = {
  category_id: string;
  name_category: string;
  children_category: Array<SubCategory>;
};

export type Product = {
  id: string;
  name: string;
  category_id: string;
  weight: string;
  fats: string;
  proteins: string;
  carbohydrates: string;
  type_price: string;
  price: number;
  images: string[];
};

export type Stock = {
  StockName: string;
}