import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./slice/campaignSlice";
import walletReducer from "./slice/walletSlice";
import contractAddressInfoReducer from "./slice/formSlice";
import userReducer from "./slice/userSlice";
import campaignDetailReducer from "./slice/campaignDetailSlice";
import leaderboardReducer from "./slice/leaderboardSlice";
import profileReducer from "./slice/profileSlice";

export const store = configureStore({
  reducer: {
    campaigns: campaignReducer,
    wallet: walletReducer,
    contractAddressInfo: contractAddressInfoReducer,
    campaignDetail: campaignDetailReducer,
    user: userReducer,
    leaderboard: leaderboardReducer,
    profile: profileReducer,
  },
});

export const selectData = (state) => state.data;

export default store;
