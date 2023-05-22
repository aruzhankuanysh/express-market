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
