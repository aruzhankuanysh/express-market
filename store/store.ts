import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer, { authSlice } from "./authSlice";
import categoryReducer, { categorySlice } from "./categorySlice";
import cartReducer, { cartSlice } from "./cartSlice";
import stockReducer, { stockSlice } from "./stockSlice";
import productsReducer, { productsSlice } from "./productSlice";

import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
  [categorySlice.name]: categoryReducer,
  [stockSlice.name]: stockReducer,
  [cartSlice.name]: cartReducer,
  [productsSlice.name]: productsReducer,
})

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
        secure: true,
          subtrees: [
            "auth",
            "cart.discount",
            "cart.total",
            "cart.products",
            "stock.currentStock",
          ],
        })
      ),
    devTools: true,
  }));

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>

export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });