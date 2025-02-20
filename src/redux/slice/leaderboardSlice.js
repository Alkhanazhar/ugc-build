import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    items: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLeaderboard(state, action) {
      state.items = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLeaderboard, setLoading, setError } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
