import { createSlice } from "@reduxjs/toolkit";

const campaignDetailSlice = createSlice({
  name: "campaignDetail",
  initialState: {
    items: null,
    loading: false,
    pooledIn: false,
    error: null,
  },
  reducers: {
    setCampaignDetail(state, action) {
      state.items = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setPooledIn(state, action) {
      state.pooledIn = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCampaignDetail, setLoading, setError, setPooledIn } =
  campaignDetailSlice.actions;

export default campaignDetailSlice.reducer;
