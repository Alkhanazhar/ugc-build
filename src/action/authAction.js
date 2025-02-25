import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAccount, useSignMessage } from "wagmi";
import { ethers } from "ethers";
import { setWallet, setAuthToken, setError } from "@/redux/slice/walletSlice";
import { useWebSocket } from "@/network/connection.js";
import { setJoinNowState } from "@/redux/slice/walletSlice";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";

export const useGetAuthToken = () => {
  const dispatch = useDispatch();
  const { sendMeRequest, sendGetTwitterSessionRequest } =
    useWebSocket();
  const [error, setErrorValue] = useState("");
  const [wallet, setWalletValue] = useState("");
  const { address, status } = useAccount();
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (
          address === localStorage.getItem("wallet") ||
          localStorage.getItem("wallet") !== null
        ) {
          return;
        }

        console.log("wallet connect status " + status);
        if (status == "connected") {
          // Abstract Wallet login
          console.log("wallet address " + address);
          const walletAddress = address;
          // Fetch nonce and message from backend
          const res = await fetch(
            `https://platform.ugc.fun/auth/wallet_nonce?wallet=${encodeURIComponent(
              walletAddress
            )}`
          );
          const body = await res.json();

          const { nonce, message } = body;

          const rawSignature = await signMessageAsync({
            message: message,
          });

          console.log("Raw signature:", rawSignature);

          // Authenticate with backend
          const authResponse = await fetch(
            "https://platform.ugc.fun/auth/wallet_auth",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                wallet: walletAddress,
                nonce: nonce,
                signature: rawSignature,
              }),
            }
          );
          const authData = await authResponse.json();

          if (authData.token) {
            dispatch(setAuthToken(authData.token));
            localStorage.setItem("authToken", authData.token);
            localStorage.setItem("wallet", walletAddress);
            dispatch(setWallet(walletAddress));
            dispatch(setJoinNowState("WALLET_CONNECTED"));
          }
        }
      } catch (err) {
        console.error(err);
        setErrorValue("An error occurred while connecting your wallet.");
        setError("An error occurred while connecting your wallet.");
      }
    };
    fetchToken();
  }, [status, address]);

  const handleOpenTwitterConnectWindow = async () => {
    const twitterSession = await sendGetTwitterSessionRequest();
    console.log("twitter session " + twitterSession);
    const authUrl = `https://platform.ugc.fun/auth?provider=twitterv2&session=${twitterSession}`;

    console.log("auth Url " + authUrl);

    // Add a state parameter to verify the response
    const state = Math.random().toString(36).substring(7);
    const urlWithState = `${authUrl}&state=${state}`;

    // Open the window
    const newWindow = window.open(
      urlWithState,
      "Twitter Connect",
      "width=600,height=700,left=200,top=100"
    );

    // Safe window checking
    if (newWindow) {
      const interval = setInterval(async () => {
        try {
          // Only check if window is closed
          if (newWindow.closed) {
            clearInterval(interval);
            console.log("Authentication window closed");
            //In future we can check with token
            localStorage.setItem("twitterState", state);
            await sendMeRequest();
            // dispatch(setJoinNowState("TWITTER_CONNECTED"));
          }
        } catch (e) {
          // Handle any potential errors
          clearInterval(interval);
          console.log("Error checking window status:", e);
        }
      }, 500);
    }
  };

  return {
    // connectWallet,

    handleOpenTwitterConnectWindow,
    error,
    wallet,
  };
};
