"use client";
import { CONTRACT_ABI } from "@/action/contracts/abi";
import { useWebSocket } from "@/network/connection";
import { setCampaignCreated, setDepositLoading } from "@/redux/slice/formSlice";
import { useAbstractClient } from "@abstract-foundation/agw-react";
import { Box, Button } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomText from "../GeneralComponents/customText";
import { parseAbi } from "viem";

const PoolInButton = ({ campaignAddress, poolValue, campaign }) => {
  const { data: agwClient } = useAbstractClient();
  console.log(agwClient);
  const { sendGetCampaignAddressRequest, sendCampaignDepositedRequest } =
    useWebSocket();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (agwClient !== undefined) {
      setIsLoading(false);
    }
  }, [agwClient]);
  const handlePoolIn = async () => {
    console.log(
      "campaignAddress in modal ",
      campaignAddress,
      poolValue,
      campaign
    );
    if (!agwClient) return;
    dispatch(setDepositLoading(true));
    const getTokenAddressFromCampaign = async (contractAddress) => {
      const createdCampaignTokenAddress = await sendGetCampaignAddressRequest(
        contractAddress
      );
      return createdCampaignTokenAddress.split(",")[0];
    };

    let createdCampaignTokenAddress = campaignAddress;
    if (campaignAddress == "" || campaignAddress == null) {
      createdCampaignTokenAddress = await getTokenAddressFromCampaign(
        campaign.token_contract
      );
    }

    console.log("campaign address " + campaignAddress);

    const tokenABI = [
      "function approve(address,uint256) external returns (bool)",
    ];

    const weiAmount = ethers.parseEther(poolValue);
    console.log("weiAmount " + weiAmount);
    const transactionHash = await agwClient.writeContract({
      abi: parseAbi(tokenABI), // Your contract ABI
      address: campaign.token_contract,
      functionName: "approve",
      args: [createdCampaignTokenAddress, weiAmount],
    });
    console.log("transactionHash " + transactionHash);

    const campaign_contract = new ethers.Contract(
      createdCampaignTokenAddress,
      CONTRACT_ABI,
      agwClient
    );

    // depositTx
    const depositTx = await campaign_contract.deposit(weiAmount, {
      value: 1000000000000000n, // Ether to send with transaction
    });

    console.log("depositTx " + depositTx);

    // notify  to Backend

    await sendCampaignDepositedRequest(
      JSON.stringify({
        token_contract: campaign.token_contract,
        description: "Lets Go UGC",
        image_url: "",
        twitter_link: "",
        telegram_link: "",
        website: "",
      })
    );
    console.log("Backend notified of deposit.");

    dispatch(setCampaignCreated(true));
    // router.push("/campaign_created");

    // End loading successfully
    dispatch(setDepositLoading(false));
  };
  //   <PoolInButton
  // campaign={campaign}
  //               campaignAddress={campaignAddress}
  //               poolValue={poolValue}
  //               key={"pool in button"}
  //             />
  return (
    <Box display="flex" justifyContent="center">
      <Button
        size="small"
        onClick={() => !isLoading && handlePoolIn()}
        sx={{
          width: "160px",
          height: "58px",
          border: "2px solid black",
          backgroundColor: "#DCEC55",
          borderRadius: 4,
          color: "white",
          marginTop: "50px",
        }}
      >
        <CustomText
          text={isLoading ? "loading..." : "Pool Now!"}
          fontSize="20px"
          fontFamily="Skrapbook"
          fontStroke="5px"
        />
      </Button>
    </Box>
  );
};

export default PoolInButton;
