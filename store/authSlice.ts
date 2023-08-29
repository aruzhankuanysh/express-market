import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { User } from "../specs/gosuTypes";

export interface IAuthState {
  user: User;
  authState: boolean;
  authToken: string;
  refreshToken: string;
  rememberMe: boolean;
  acceptTerms: boolean;
}

const initialState: IAuthState = {
  user: {
    id: "",
    name: "",
    phone: "",
    role: "",
    email: "",
    gender: "",
    birthdate: "",
  },
  authState: false,
  authToken: "",
  refreshToken: "",
  rememberMe: false,
  acceptTerms: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Задать пользователя 
    setUser(state, action) {
      state.user = { ...action.payload };
    },
    // Задать состояние авторизации
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    // Задать refreshToken
    setRefreshTokens(state, action) {
      state.refreshToken = action.payload;
    },
    // Задать authToken
    setAccessToken(state, action) {
      state.authToken = action.payload;
    },
    // Задать состояние флага rememberMe
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    // Задать состояние флага acceptTerms
    setAcceptTerms(state, action) {
      state.acceptTerms = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: AnyAction) => {
        return {
          ...state,
          ...action['payload']['auth'],
        }
      })
  },
});

export const { setUser, setAuthState, setRefreshTokens, setAccessToken, setRememberMe, setAcceptTerms } = authSlice.actions;
export default authSlice.reducer;