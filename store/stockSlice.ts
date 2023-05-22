import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Category, Product, Stock } from "../specs/gosuTypes";

export interface IStockState {
    stocks: Stock[] | null;
    currentStock: Stock | null;
}

const initialState: IStockState = {
    stocks: null,
    currentStock: null,
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStocks(state, action: PayloadAction<Stock[]>) {
        state.stocks = action.payload;
        const index = action.payload.findIndex((stock) => stock.StockName === state.currentStock?.StockName);
        if (!state.currentStock || index < 0) {
          state.currentStock = action.payload[0];
        }
    },
    setCurrentStock(state, action: PayloadAction<Stock>) {
        state.currentStock = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: AnyAction) => {
        return {
          ...state,
          ...action['payload']['stock'],
        }
      })
  },
});

export const { setStocks, setCurrentStock } = stockSlice.actions;
export default stockSlice.reducer;