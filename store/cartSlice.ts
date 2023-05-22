import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Category, Product } from "../specs/gosuTypes";

export interface ICartProduct {
    count: number;
    item: Product;
}

export interface ICartState {
  cart: ICartProduct[] | null;
  total: number;
}

const initialState: ICartState = {
  cart: null,
  total: 0,
};

const calcTotal = (cart: ICartProduct[]) => {
    const total = cart.reduce((acc, cur) => acc + cur.item.price, 0);
    return total;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incProduct: (state, action: PayloadAction<Product>) => {
        if (state.cart) {
            const index = state.cart.findIndex(item => item.item.id === action.payload.id);
            if (index >= 0) {
                state.cart[index].count += 1;
            } else {
                state.cart = [...state.cart, {"item":action.payload, "count": 1}];
            }
            state.total = calcTotal(state.cart);
        } else {
            state.cart = [{"item":action.payload, "count": 1}];
        }
    },
    decProduct: (state, action: PayloadAction<Product>) => {
        if (state.cart) {
            const index = state.cart.findIndex(item => item.item.id === action.payload.id);
            if (index >= 0) {
                if (state.cart[index].count >= 2) {
                    state.cart[index].count -= 1;
                }else {
                    state.cart.splice(index, 1);
                }
                state.total = calcTotal(state.cart);
            }
        }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: AnyAction) => {
        return {
          ...state,
          ...action['payload']['categories'],
        }
      })
  },
});

export const { incProduct, decProduct } = cartSlice.actions;
export default cartSlice.reducer;