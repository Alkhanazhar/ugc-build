import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  twitterSession: null,
  poolIns: [],
  referralByUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
    setTwitterSession(state, action) {
      state.twitterSession = action.payload;
    },
    setPoolIns(state, action) {
      state.poolIns = action.payload;
    },
    setRefferalByUser(state, action) {
      state.referralByUser = action.payload;
    },
  },
});

export const {
  setUserInfo,
  clearUserInfo,
  setTwitterSession,
  setPoolIns,
  setRefferalByUser,
} = userSlice.actions;
export default userSlice.reducer;
