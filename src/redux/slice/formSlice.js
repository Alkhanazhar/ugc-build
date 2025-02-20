import { createSlice } from "@reduxjs/toolkit";

const contractAddressInfoSlice = createSlice({
  name: "contractAddressInfo",
  initialState: {
    items: null,
    loading: false,
    isDepositLoading: false,
    isCampaignCreated: false,
    error: null,
  },
  reducers: {
    setContractAddressInfo(state, action) {
      state.items = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setDepositLoading(state, action) {
      state.isDepositLoading = action.payload;
    },
    setCampaignCreated(state, action) {
      state.isCampaignCreated = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setContractAddressInfo,
  setLoading,
  setError,
  setDepositLoading,
  setCampaignCreated,
} = contractAddressInfoSlice.actions;

export default contractAddressInfoSlice.reducer;
