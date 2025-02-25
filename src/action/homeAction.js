import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useFetchData } from "../network/connection";
import {
  setLoading,
  setCampaigns,
  setError,
  setConstantValue,
} from "../redux/slice/campaignSlice";

export const useHomeAction = () => {
  const dispatch = useDispatch();

  const fetchCampaigns = async () => {
    const { data, error } = await useFetchData(
      "https://platform.ugc.fun/campaigns"
    );
    // if (loading) {
    //   dispatch(setLoading(true));
    // }

    if (error) {
      dispatch(setError(error));
      return;
    }
    // const authToken = localStorage.getItem("authToken");
    if (data) {
      dispatch(setCampaigns(data));
    }
    dispatch(setLoading(false));
  };
  const fetchConstant = async () => {
    const { data, error } = await useFetchData(
      "https://platform.ugc.fun/constants"
    );

    console.log("campaigns data =>" + JSON.stringify(data));
    if (data) {
      dispatch(setConstantValue(data));
    }
  };
  return {
    fetchCampaigns,
    fetchConstant,
  };
};
