import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Category, Product } from "../specs/gosuTypes";

export interface ICategoryState {
  products: Product[] | null;
}

const initialState: ICategoryState = {
    products: null
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
      // Инициализация списка продуктов
    setProducts(state, action:PayloadAction<Product[]>) {
      // state.products = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: AnyAction) => {
        return {
          ...state,
          ...action['payload']['products'],
        }
      })
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;