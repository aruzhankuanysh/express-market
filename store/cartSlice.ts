import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Category, MiniProduct, Product } from "../specs/gosuTypes";

export interface IcartImg {
  id: string;
  src: string;
}

export interface ICartProduct {
  count: number;
  item: MiniProduct;
}

export interface ICartState {
  products: ICartProduct[] | null;
  images: IcartImg[] | null;
  total: number;
  discount: number;
}

const initialState: ICartState = {
  products: null,
  images: null,
  total: 0,
  discount: 0,
};

const MiniProduct = (prod: Product | MiniProduct) => {
  return {
    id: prod.id,
    name: prod.name,
    brand_id: prod.brand_id,
    category_id: prod.category_id,
    parent_category_id: prod.parent_category_id,
    weight: prod.weight,
    price: prod.price,
  }
}

const calcTotal = (cart: ICartProduct[]) => {
  const total = cart.reduce((acc, cur) => acc + cur.item.price * cur.count, 0);
  return total;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Добавить 1 продукт
    incProduct: (state, action: PayloadAction<Product | MiniProduct>) => {
      if (state.products) {
        const index = state.products.findIndex(item => item.item.id === action.payload.id);
        if (index >= 0) {
          state.products[index].count += 1;
        } else {
          const mini_buf: MiniProduct = MiniProduct(action.payload);
          state.products = [...state.products, { "item": mini_buf, "count": 1 }];
        }
        state.total = calcTotal(state.products);
      } else {
        const mini_buf: MiniProduct = MiniProduct(action.payload);
        state.products = [{ "item": mini_buf, "count": 1 }];
        state.total = calcTotal(state.products);

      }
    },
    // Уддалить 1 продукт
    decProduct: (state, action: PayloadAction<Product | MiniProduct>) => {
      if (state.products) {
        const index = state.products.findIndex(item => item.item.id === action.payload.id);
        if (index >= 0) {
          if (state.products[index].count >= 2) {
            state.products[index].count -= 1;
          } else {
            state.products.splice(index, 1);
          }
          state.total = calcTotal(state.products);
        }
      }
    },
    // Уддалить продукт
    removeProduct: (state, action: PayloadAction<Product | MiniProduct>) => {
      if (state.products) {
        const index = state.products.findIndex(item => item.item.id === action.payload.id);
        if (index >= 0) {
          state.products.splice(index, 1);
        }
        state.total = calcTotal(state.products);
      }
    },
    // Очистить карзину
    removeAllProducts: (state) => {
      if (state.products) {
        state.products = null;
        state.total = 0;
      }
    },
    // Инициализация списка изображений 
    setImages: (state, action: PayloadAction<IcartImg[] | null>) => {
      state.images = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: AnyAction) => {
        return {
          ...state,
          ...action['payload']['cart'],
        }
      })
  },
});

export const { incProduct, decProduct, removeProduct, removeAllProducts, setImages } = cartSlice.actions;
export default cartSlice.reducer;