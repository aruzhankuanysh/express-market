import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Category, MiniProduct, Product } from "../specs/gosuTypes";

export interface ICartProduct {
    count: number;
    item: MiniProduct;
}

export interface ICartState {
  products: ICartProduct[] | null;
  total: number;
  discount: number;
}

const initialState: ICartState = {
  products: null,
  total: 0,
  discount: 0,
};

const MiniProduct = (prod:Product | MiniProduct) => {
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
    incProduct: (state, action: PayloadAction<Product | MiniProduct>) => {
        if (state.products) {
            const index = state.products.findIndex(item => item.item.id === action.payload.id);
            if (index >= 0) {
                state.products[index].count += 1;
            } else {
                const mini_buf:MiniProduct = MiniProduct(action.payload);
                state.products = [...state.products, {"item":mini_buf, "count": 1}];
            }
            state.total = calcTotal(state.products);
        } else {
          const mini_buf:MiniProduct = MiniProduct(action.payload);
          state.products = [{"item":mini_buf, "count": 1}];
          state.total = calcTotal(state.products);

        }
    },
    decProduct: (state, action: PayloadAction<Product | MiniProduct>) => {
        if (state.products) {
            const index = state.products.findIndex(item => item.item.id === action.payload.id);
            if (index >= 0) {
                if (state.products[index].count >= 2) {
                    state.products[index].count -= 1;
                }else {
                    state.products.splice(index, 1);
                }
                state.total = calcTotal(state.products);
            }
        }
    },
    removeProduct: (state, action: PayloadAction<Product | MiniProduct>) => {
      if (state.products) {
        const index = state.products.findIndex(item => item.item.id === action.payload.id);
        if (index >= 0) {
          state.products.splice(index, 1);
        }
        state.total = calcTotal(state.products);
      }
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

export const { incProduct, decProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;