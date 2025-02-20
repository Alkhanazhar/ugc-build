import { ethers } from "ethers";
import { CONTRACT_ABI } from "./abi";
import { useWebSocket } from "../../network/connection.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setDepositLoading } from "@/redux/slice/formSlice.js";
import { setCampaignCreated } from "@/redux/slice/formSlice.js";
import { useAbstractClient } from "@abstract-foundation/agw-react";
import { parseAbi } from "viem";
import { useAccount } from "wagmi";
export const useDepositTokens = () => {
  const { sendCreateCampaignInitRequest, sendCampaignDepositedRequest } =
    useWebSocket();
  const { data: agwClient } = useAbstractClient();
  const dispatch = useDispatch();
  const { address } = useAccount();

  // Initialize Provider and Signer
  const initializeProviderAndSigner = async () => {
    try {
      // Check if any Web3 provider is available
      if (!window.ethereum) {
        throw new Error(
          "No Web3 wallet detected. Please install a Web3 wallet to continue."
        );
      }

      let provider;
      // Handle case where multiple providers exist
      if (window.ethereum.providers) {
        // Let user select their preferred wallet if multiple are present
        provider = new ethers.BrowserProvider(window.ethereum.providers[0]);
      } else {
        // Use the single available provider
        provider = new ethers.BrowserProvider(window.ethereum);
      }

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get signer and address
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      return { provider, signer, userAddress };
    } catch (error) {
      throw new Error(`Failed to connect wallet: ${error.message}`);
    }
  };

  // Retrieve Token Address from Campaign
  const getTokenAddressFromCampaign = async (contractAddress) => {
    const createdCampaignTokenAddress = await sendCreateCampaignInitRequest(
      contractAddress
    );
    return createdCampaignTokenAddress.split(",")[0];
  };

  // Verify if Contract Exists at the Address
  // const verifyContractDeployment = async (provider, address) => {
  //   const code = await provider.getCode(address);
  //   if (code === "0x") {
  //     throw new Error("No contract deployed at this address.");
  //   }
  //   console.log("Contract is deployed at the address.");
  // };

  // Initialize Token Contract
  const initializeTokenContract = (contractAddress, tokenABI, signer) => {
    return new ethers.Contract(contractAddress, tokenABI, signer);
  };

  // Approve Tokens
  const approveTokens = async (tokenContract, spender, amount) => {
    console.log("Attempting to approve tokens...");
    const approveTx = await tokenContract.approve(spender, amount);
    console.log("Approval transaction sent:", approveTx.hash);
    await approveTx.wait();
    console.log("Approval transaction confirmed.");
  };

  // Deposit Tokens
  const depositTokensToCampaign = async (campaignContract, amount) => {
    console.log("Initiating deposit transaction...");
    const depositTx = await campaignContract.deposit(amount, {
      value: 1000000000000000n, // Ether to send with transaction
    });
    console.log("Deposit transaction sent:", depositTx.hash);
    await depositTx.wait();
    console.log("Deposit transaction confirmed.");
  };

  // Notify Backend
  const notifyBackend = async (
    contractAddress,
    contractDescription,
    twitterLink,
    telegramLink,
    websiteLink
  ) => {
    await sendCampaignDepositedRequest(
      JSON.stringify({
        token_contract: contractAddress,
        description: contractDescription,
        image_url: "",
        twitter_link: twitterLink,
        telegram_link: telegramLink,
        website: websiteLink,
      })
    );
    console.log("Backend notified of deposit.");
  };

  const depositTokens = async (
    amount,
    contractAddress,
    contractDescription,
    twitterLink,
    telegramLink,
    websiteLink,
    campaignAddress = ""
  ) => {
    try {
      // Start loading
      dispatch(setDepositLoading(true));
      let createdCampaignTokenAddress = campaignAddress;
      if (!agwClient) return;
      ("");

      if (campaignAddress == "" || campaignAddress == null) {
        createdCampaignTokenAddress = await getTokenAddressFromCampaign(
          contractAddress
        );
      }

      console.log("campaign address " + campaignAddress);

      const tokenABI = [
        "function approve(address,uint256) external returns (bool)",
      ];

      const weiAmount = ethers.parseEther(amount);

      const transactionHash = await agwClient.writeContract({
        abi: parseAbi(tokenABI), // Your contract ABI
        address: contractAddress,
        functionName: "approve",
        args: [createdCampaignTokenAddress, weiAmount],
      });
      console.log("transactionHash " + transactionHash);
      const campaign_contract = new ethers.Contract(
        createdCampaignTokenAddress,
        CONTRACT_ABI,
        agwClient
      );
      const depositTx = await campaign_contract.deposit(weiAmount, {
        value: 1000000000000000n, // Ether to send with transaction
      });

      console.log("depositTx " + depositTx);
      // const router = useRouter();
      await notifyBackend(
        contractAddress,
        contractDescription,
        twitterLink,
        telegramLink,
        websiteLink
      );

      dispatch(setCampaignCreated(true));
      // router.push("/campaign_created");
      // End loading successfully
      dispatch(setDepositLoading(false));
    } catch (error) {
      console.error("Error during deposit process:", error.message);
      console.error("Full error object:", error);

      // End loading with failure in case of error
      dispatch(setDepositLoading(false));
      throw error;
    }
  };

  return { depositTokens };
};

export const useClaimTokens = () => {
  const claimAvailableTokens = async (tokenAddress) => {
    console.log("campaignAddress: " + tokenAddress?.campaignAddress);
    try {
      const { data: agwClient } = useAbstractClient();

      const contract = new ethers.Contract(
        tokenAddress,
        CONTRACT_ABI,
        agwClient
      );
      const allocation = await contract.getAllocation(userAddress);
      if (BigInt(allocation) === BigInt(0)) {
        throw new Error("No tokens allocated");
      }

      const tx = await contract.claimTokens();
      console.log("tx " + tx.hash);
      const receipt = await tx.wait();
      const claimEvent = receipt.logs
        .map((log) => {
          try {
            return contract.interface.parseLog(log);
          } catch (e) {
            return null;
          }
        })
        .find((event) => event?.name === "TokensClaimed");

      if (!claimEvent) {
        throw new Error("Claim event not found in transaction");
      }

      return {
        success: true,
        amount: claimEvent.args[1],
        txHash: receipt.hash,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to claim tokens",
      };
    }
  };

  return { claimAvailableTokens };
};
