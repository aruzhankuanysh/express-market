import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Category } from "../specs/gosuTypes";

export interface ICategoryState {
  categories: Category[] | null;
}

// ? imgCatalog: "/img/aplle.svg"

const initialState: ICategoryState = {
  categories: null
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Инициализация списка категорий
    setCategory(state, action:PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
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

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;