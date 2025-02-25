import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
  name: "campaigns",
  initialState: {
    items: null,
    loading: false,
    error: null,
    joinCampaign: false,
    isUserJoined: false,
    campaignStartUsd: 0,
    campaignAddress: null,
  },
  reducers: {
    setCampaigns(state, action) {
      state.items = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setJoinCampaign(state, action) {
      state.joinCampaign = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setConstantValue(state, action) {
      state.campaignStartUsd = action.payload;
    },
    setCampaignAddress(state, action) {
      state.campaignAddress = action.payload;
    },
    setIsUserJoined(state, action) {
      state.isUserJoined = action.payload;
    },
  },
});

export const {
  setCampaigns,
  setLoading,
  setError,
  setJoinCampaign,
  setConstantValue,
  setCampaignAddress,
  setIsUserJoined,
} = campaignSlice.actions;

export default campaignSlice.reducer;
