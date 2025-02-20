import { createSlice } from "@reduxjs/toolkit";

const getStoredAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

const initialState = {
  wallet: null,
  authToken: getStoredAuthToken(),
  error: null,
  joinNowState: "WALLET_NOT_CONNECTED",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet(state, action) {
      state.wallet = action.payload;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", action.payload);
      }
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearWallet(state) {
      state.wallet = null;
      state.authToken = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
      }
    },
    setJoinNowState(state, action) {
      state.joinNowState = action.payload;
    },
  },
});

export const {
  setWallet,
  setAuthToken,
  setJoinNowState,
  setError,
  clearWallet,
} = walletSlice.actions;
export default walletSlice.reducer;
