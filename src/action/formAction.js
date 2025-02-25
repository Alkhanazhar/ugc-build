import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useFetchData } from "../network/connection";
import {
  setLoading,
  setContractAddressInfo,
  setError,
} from "../redux/slice/formSlice";

export const useFormAction = () => {
  const dispatch = useDispatch();

  const fetchContractAddressInfo = async (contractAddress) => {
    const { data, error, loading } = await useFetchData(
      `https://platform.ugc.fun/campaign_contract?contract=${contractAddress}`
    );
    if (loading) {
      dispatch(setLoading(true));
    }

    if (error) {
      dispatch(setError(error));
      return;
    }
    console.log("contract address info data =>" + JSON.stringify(data));
    if (data) {
      console.log(
        "inside data contract contract address info data =>" +
          JSON.stringify(data)
      );
      dispatch(setContractAddressInfo(data));
    }
    dispatch(setLoading(false));
  };
  return {
    fetchContractAddressInfo,
  };
};
