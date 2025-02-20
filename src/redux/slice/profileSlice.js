import { createSlice } from "@reduxjs/toolkit";

// Define initial state with all required properties
const initialState = {
  myRewards: [],
  userInfo: {
    user_id: null,
    wallet: null,
    twitter_id: null,
    name: null,
    image_url: null,
    telegram: null,
  },
  referralInfo: {
    totalReferrals: 0,
    activeReferrals: 0,
    referralCode: null,
    referralLink: null,
    referralRewards: 0,
    referralHistory: [],
  },
  referralCount: 0,
  myUgcXp: 0.0,
  myUgcXpHistory: null,

  rewardsInfo: {
    totalRewards: 0,
    availableRewards: 0,
    claimableRewards: 0,
    lastClaimDate: null,
    rewardsHistory: [],
  },
  ugcPoints: {
    totalPoints: 0,
    availablePoints: 0,
    history: [], // [{date, amount, reason, type}]
  },
  claims: {
    pendingClaims: [],
    claimHistory: [], // [{date, amount, status, txHash}]
    totalClaimed: 0,
  },
  loading: {
    profile: false,
    referral: false,
    rewards: false,
    points: false,
    claims: false,
  },
  error: {
    profile: null,
    referral: null,
    rewards: null,
    points: null,
    claims: null,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setMyRewards: (state, action) => {
      state.myRewards = action.payload;
    },
    // User Profile
    setProfileInfo: (state, action) => {
      state.userInfo = action.payload;
      state.loading.profile = false;
      state.error.profile = null;
    },
    // referral count
    setReferralCount: (state, action) => {
      state.referralCount = action.payload;
    },

    // Referral Information
    setReferralInfo: (state, action) => {
      state.referralInfo = {
        ...state.referralInfo,
        ...action.payload,
      };
      state.loading.referral = false;
      state.error.referral = null;
    },

    // Rewards Information
    setRewardsInfo: (state, action) => {
      state.rewardsInfo = {
        ...state.rewardsInfo,
        ...action.payload,
      };
      state.loading.rewards = false;
      state.error.rewards = null;
    },

    // UGC XP
    setUgcPointsInfo: (state, action) => {
      state.ugcPoints = {
        ...state.ugcPoints,
        ...action.payload,
      };
      state.loading.points = false;
      state.error.points = null;
    },

    setMyUgcXp: (state, action) => {
      state.myUgcXp = action.payload;
    },
    setMyUgcXpHistory: (state, action) => {
      state.myUgcXpHistory = action.payload;
    },

    setUgcPointsHistory: (state, action) => {
      state.ugcPoints.history = action.payload;
      state.loading.points = false;
      state.error.points = null;
    },

    // Claims
    setClaimHistory: (state, action) => {
      state.claims.claimHistory = action.payload;
      state.loading.claims = false;
      state.error.claims = null;
    },

    setPendingClaims: (state, action) => {
      state.claims.pendingClaims = action.payload;
      state.loading.claims = false;
      state.error.claims = null;
    },

    addNewClaim: (state, action) => {
      state.claims.pendingClaims.push(action.payload);
    },

    updateClaimStatus: (state, action) => {
      const { claimId, status, txHash } = action.payload;
      const claimIndex = state.claims.pendingClaims.findIndex(
        (claim) => claim.id === claimId
      );

      if (claimIndex !== -1) {
        state.claims.pendingClaims[claimIndex].status = status;
        state.claims.pendingClaims[claimIndex].txHash = txHash;

        if (status === "completed") {
          state.claims.claimHistory.unshift(
            state.claims.pendingClaims[claimIndex]
          );
          state.claims.pendingClaims.splice(claimIndex, 1);
        }
      }
    },

    // Loading States
    setLoading: (state, action) => {
      const { type, isLoading } = action.payload;
      state.loading[type] = isLoading;
    },

    // Error States
    setError: (state, action) => {
      const { type, error } = action.payload;
      state.error[type] = error;
      state.loading[type] = false;
    },

    // Clear All Data
    clearProfileInfo: (state) => {
      return initialState;
    },

    // Update specific sections
    updateReferralCount: (state, action) => {
      state.referralInfo.totalReferrals += 1;
      state.referralInfo.activeReferrals += 1;
    },

    updateRewardsBalance: (state, action) => {
      const { amount, type } = action.payload;
      if (type === "add") {
        state.rewardsInfo.availableRewards += amount;
        state.rewardsInfo.totalRewards += amount;
      } else if (type === "subtract") {
        state.rewardsInfo.availableRewards -= amount;
      }
    },

    updateUgcPoints: (state, action) => {
      const { points, reason } = action.payload;
      state.ugcPoints.totalPoints += points;
      state.ugcPoints.availablePoints += points;
      state.ugcPoints.history.unshift({
        date: new Date().toISOString(),
        amount: points,
        reason,
        type: points > 0 ? "earned" : "spent",
      });
    },
  },
});

// Export actions
export const {
  setProfileInfo,
  setReferralInfo,
  setRewardsInfo,
  setUgcPointsInfo,
  setUgcPointsHistory,
  setClaimHistory,
  setPendingClaims,
  addNewClaim,
  updateClaimStatus,
  setLoading,
  setError,
  clearProfileInfo,
  updateReferralCount,
  updateRewardsBalance,
  updateUgcPoints,
  setMyRewards,
  setMyUgcXp,
  setMyUgcXpHistory,
  setReferralCount,
} = profileSlice.actions;

// Selector functions for easier state access
export const selectUserInfo = (state) => state.profile.userInfo;
export const selectReferralInfo = (state) => state.profile.referralInfo;
export const selectRewardsInfo = (state) => state.profile.rewardsInfo;
export const selectUgcPoints = (state) => state.profile.ugcPoints;
export const selectClaims = (state) => state.profile.claims;
export const selectLoading = (state) => state.profile.loading;
export const selectError = (state) => state.profile.error;

export default profileSlice.reducer;
