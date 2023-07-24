export type User = {
  id: string;
  name: string;
  phone: string;
  role: string;
  email: string;
  gender: string;
  birthdate: string;
} | null;

export type registerUser = {
  Name: string;
  Sex: string;
  Birthday: string;
  Phone: string;
  Password: string;
  Legal: string; // "false"
}

export type updateUser = {
  Name: string;
  Sex: string;
  Birthday: string;
  Token: string;
}

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
  brand_id: string;
  description: string;
  category_id: string;
  parent_category_id: string;
  weight: string;
  fats: string;
  proteins: string;
  carbohydrates: string;
  type_price: string;
  price: number;
  images: string[];
};

export type MiniProduct = {
  id: string;
  name: string;
  brand_id: string;
  category_id: string;
  parent_category_id: string;
  weight: string;
  price: number;
};


export type Stock = {
  StockName: string;
}

export interface DeliveredAdres {
  house: string;
  street: string;
  city: string;
  zone: string | undefined;
  cords: number[] | undefined;
}

export interface Delivered extends DeliveredAdres {
  Aderss: string;
}

export type ItemsOrder = {
  IdItem: string;
  QuantityItem: number;
  PriceItem: number;  
}

export type Order = {
  DateOrder: string | undefined;
  Stock: string;
  Comment: string;
  ClientId: string | undefined;
  TypePrices: string;
  ItemsOrder: ItemsOrder[]
}

export type OrderItemData = {
  NameItem: string,
  IdItem: string,
  СodeItem: string,
  BrandItem: string,
  QuantityItems: number,
  SummItem: number,
  PriceItem: number,
}

export type OrderData = {
  IdOrder: string,
  DateOrder: string,
  SumOrder: number,
  StockOrder: string,
  StatusOrder: string,
  Comment: string,
  StateOrder: string,
  TipsOrder: number,
  ItemsOrder: OrderItemData[]
}