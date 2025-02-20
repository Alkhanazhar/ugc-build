import { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPoolIns, setUserInfo } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";
import {
  setCampaignAddress,
  setCampaigns,
  setIsUserJoined,
  setJoinCampaign,
} from "@/redux/slice/campaignSlice";
import {
  setCampaignDetail,
  setPooledIn,
} from "@/redux/slice/campaignDetailSlice";
import { setLeaderboard } from "@/redux/slice/leaderboardSlice";
import {
  setProfileInfo,
  setMyRewards,
  setMyUgcXpHistory,
  setMyUgcXp,
  setReferralCount,
} from "@/redux/slice/profileSlice";

/**
 * A helper function to fetch data.
 */
export const useFetchData = async (url) => {
  let data = null;
  let error = null;
  let loading = true;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    data = await response.json();
  } catch (err) {
    error = err.message;
  } finally {
    loading = false;
  }

  return { data, error, loading };
};

// These variables are shared across hook instances (if needed)
let webSocketInstance = null;
let requestsSent = false;

/**
 * Custom hook to manage a WebSocket connection.
 */
export const useWebSocket = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.wallet.authToken);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [pingInterval, setPingInterval] = useState(null);
  const router = useRouter();

  // Using useRef to store our message callbacks so that the reference stays the same across renders.
  const messageCallbacks = useRef(new Map());

  /**
   * Remove and clean up the WebSocket connection.
   */
  const cleanupWebSocket = useCallback(() => {
    if (webSocketInstance) {
      webSocketInstance.close();
      webSocketInstance = null;
    }
    if (pingInterval) clearInterval(pingInterval);
    setIsConnected(false);
    setSocket(null);
  }, [pingInterval]);

  /**
   * The centralized message handler that will dispatch messages to
   * registered callbacks or use the default handler.
   */
  const handleWebSocketMessage = useCallback((event) => {
    const data = event.data.toString();
    console.log("Received message:", data);

    // First, check for an exact-match callback.
    if (messageCallbacks.current.has(data)) {
      const callback = messageCallbacks.current.get(data);
      callback(data);
      messageCallbacks.current.delete(data);
      return;
    }
    // Next, check for any prefix-based callbacks.
    for (let [prefix, callback] of messageCallbacks.current.entries()) {
      if (data.startsWith(prefix)) {
        callback(data);
        messageCallbacks.current.delete(prefix);
        return;
      }
    }
    // If no callback was registered, use the default handler.
    handleIncomingMessage(data);
  }, []);

  /**
   * Registers a one-time callback for messages that start with the given prefix.
   */
  const registerMessageCallback = (prefix, callback) => {
    messageCallbacks.current.set(prefix, callback);
  };

  /**
   * Connects to the WebSocket and sets up event listeners.
   */
  const connectWebSocket = useCallback(async () => {
    return new Promise((resolve, reject) => {
      if (
        webSocketInstance &&
        webSocketInstance.readyState === WebSocket.OPEN
      ) {
        console.log("WebSocket is already connected.");
        setIsConnected(true);
        resolve(webSocketInstance);
        return;
      }

      const ws = new WebSocket("wss://platform.ugc.fun/ws", [authToken]);
      webSocketInstance = ws;

      ws.addEventListener("open", () => {
        console.log("WebSocket connected onOpen");
        setIsConnected(true);
        setSocket(ws);
        setupPing(ws);

        // Register our centralized message handler.
        ws.addEventListener("message", handleWebSocketMessage);

        // Send initial requests only once.
        if (!requestsSent) {
          sendMeRequest();
          sendMyUgcXp();
          sendMyUgcXpHistory();
          sendReferralCount();
          sendAllCampaignsRequest(ws);
          sendMyPoolinsRequest(ws);
          sendMyRewardsRequest(ws);
          requestsSent = true;
        }
        resolve(ws);
      });

      ws.addEventListener("close", () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
        if (pingInterval) clearInterval(pingInterval);
        webSocketInstance = null;
      });

      ws.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
        reject(error);
      });
    });
  }, [authToken, cleanupWebSocket, handleWebSocketMessage]);

  /**
   * Set up a periodic ping to keep the WebSocket alive.
   */
  const setupPing = (ws) => {
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send("id;ping;");
        console.log("Ping sent");
      }
    }, 100000); // every 100 seconds
    setPingInterval(interval);
  };

  /**
   * Default handler for messages that are not handled by specific callbacks.
   */
  const handleIncomingMessage = (data) => {
    console.log("Default handling for message:", data);
    if (data.startsWith("1;r!me;")) {
      handleMeResponse(data);
    } else if (data.startsWith("1;r!all_campaigns;")) {
      handleAllCampaignsResponse(data);
    } else if (data.startsWith("1;r!my_poolins;")) {
      handleMyPoolinsResponse(data);
    } else if (data.startsWith("1;r!campaign_leaderboard;")) {
      handleLeaderboardResponse(data);
    } else if (data.startsWith("1;r!create_campaign_init;")) {
      console.log("Create campaign response received:", data);
    } else if (data.startsWith("1;r!get_campaign_address;")) {
      console.log("Get campaign address response received:", data);
    } else if (data.startsWith("1;r!my_ugc_xp;")) {
      handleMyUgcXp(data);
    } else if (data.startsWith("1;r!referrals_count;")) {
      handleReferralCount(data);
    } else if (data.startsWith("1;r!my_ugc_xp_history;")) {
      handleMyUgcHistory(data);
    } else {
      console.warn("Unhandled message from server:", data);
    }
  };

  /**
   * Handles the "me" response by updating the Redux store and local storage.
   */
  const handleMeResponse = (data) => {
    const trimmedData = data.substring(7); // Remove "1;r!me;"
    try {
      const userInfo = JSON.parse(trimmedData);
      console.log("User handleMeResponse:", userInfo);
      dispatch(setUserInfo(userInfo));
      dispatch(setProfileInfo(userInfo));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      console.log("User handleMeResponse updated:", userInfo);
    } catch (error) {
      console.error("Failed to parse me response:", error);
    }
  };

  const handleMyUgcXp = (data) => {
    const trimmedData = data.substring("1;r!my_ugc_xp;".length);
    console.log(trimmedData, "trimmed data for xp");
    try {
      const xp = parseFloat(trimmedData);
      dispatch(setMyUgcXp(xp));
      localStorage.setItem("xp", JSON.stringify(xp));
    } catch (error) {
      console.log(data);
    }
  };
  const handleReferralCount = (data) => {
    const trimmedData = data?.substring("1;r!referrals_count;".length);
    try {
      const referrals_count = parseInt(trimmedData);
      dispatch(setReferralCount(referrals_count));
      localStorage.setItem("referrals_count", JSON.stringify(referrals_count));
    } catch (error) {
      console.log(data);
    }
  };
  const handleMyUgcHistory = (data) => {
    const trimmedData = data?.substring("1;r!my_ugc_xp_history;".length);
    console.log(trimmedData, "ugc history ___________");
    try {
      const my_ugc_xp_history = trimmedData;
      console.log(my_ugc_xp_history, "my_ugc_xp_history");
      dispatch(setMyUgcXpHistory(my_ugc_xp_history));
      localStorage.setItem(
        "my_ugc_xp_history",
        JSON.stringify(my_ugc_xp_history)
      );
      console.log("User my_ugc_xp_history updated:", my_ugc_xp_history);
    } catch (error) {
      console.log(data);
    }
  };

  const handleAllCampaignsResponse = (data) => {
    const trimmedData = data.substring(18); // Remove "1;r!all_campaigns;"
    try {
      const campaigns = JSON.parse(trimmedData);
      dispatch(setCampaigns(campaigns));
      console.log("Campaigns handleAllCampaignsResponse updated:", campaigns);
    } catch (error) {
      console.error("Failed to parse all_campaigns response:", error);
    }
  };

  const handleMyPoolinsResponse = (data) => {
    const trimmedData = data.substring(15); // Remove "id;r!my_poolins"
    console.log("My Poolins response:", trimmedData);
    try {
      const poolInsResponse = JSON.parse(trimmedData);
      dispatch(setPoolIns(poolInsResponse));
    } catch (error) {
      console.error("Failed to parse my_poolins response:", error);
    }
  };

  const handleCampaignDetailResponse = (data) => {
    const trimmedData = data.substring(17); // Remove "1;r!get_campaign;"
    try {
      const campaignDetail = JSON.parse(trimmedData);
      dispatch(setCampaignDetail(campaignDetail));
      console.log("Campaign detail updated:", campaignDetail);
    } catch (error) {
      console.error("Failed to parse campaign detail response:", error);
    }
  };

  const handleLeaderboardResponse = (data) => {
    const trimmedData = data.substring(25); // Remove "1;r!campaign_leaderboard;"
    try {
      const leaderboardDetail = JSON.parse(trimmedData);
      dispatch(setLeaderboard(leaderboardDetail));
      console.log("Leaderboard updated:", leaderboardDetail);
    } catch (error) {
      console.error("Failed to parse leaderboard response:", error);
    }
  };

  // --- Request Sending Functions ---

  const sendMeRequest = () => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        webSocketInstance.send("1;me;");
      }
    } catch (error) {
      console.error("Error in sendMeRequest", error);
    }
  };

  const sendMyPoolinsRequest = (ws = webSocketInstance) => {
    try {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send("1;my_poolins;");
      }
    } catch (error) {
      console.error("Error in sendMyPoolinsRequest", error);
    }
  };

  const sendAllCampaignsRequest = (ws = webSocketInstance) => {
    try {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send("1;all_campaigns;");
      }
    } catch (error) {
      console.error("Error in sendAllCampaignsRequest", error);
    }
  };

  const sendMyRewardsRequest = (ws = webSocketInstance) => {
    try {
      if (ws?.readyState === WebSocket.OPEN) {
        const request = `1;my_rewards`;
        ws.send(request);
        return new Promise((resolve) => {
          registerMessageCallback("1;r!my_rewards;", (data) => {
            const response = data.substring("1;r!my_rewards;".length);
            console.log("My rewards response received:", response);
            dispatch(setMyRewards(response));
            resolve(response);
          });
        });
      }
    } catch (error) {
      console.error("Error sending my rewards request:", error);
    }
  };

  const sendCheckMyCampaignFundsRequest = (campaignAddress) => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;check_my_campaign_funds;${campaignAddress}`;
        webSocketInstance.send(request);
        return new Promise((resolve) => {
          registerMessageCallback("1;r!check_my_campaign_funds;", (data) => {
            const response = data.substring(
              "1;r!check_my_campaign_funds;".length
            );
            resolve(response);
          });
        });
      }
    } catch (error) {
      console.error("Error sending check my campaign funds request:", error);
    }
  };

  const sendJoinCamapignRequest = (campaignAddress) => {
    try {
      dispatch(setJoinCampaign(false));
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;join_campaign;${campaignAddress}`;
        webSocketInstance.send(request);
        return new Promise((resolve) => {
          registerMessageCallback("1;r!join_campaign;", (data) => {
            const response = data.substring("1;r!join_campaign;".length);
            if (response === "ok") {
              console.log("Joined the campaign");
              dispatch(setJoinCampaign(true));
              sendCampaignLeaderboardRequest(campaignAddress);
            }
            resolve(response);
          });
        });
      }
    } catch (error) {
      console.error("Error sending join campaign request:", error);
    }
  };

  const sendGetCampaignAddressRequest = (tokenContractAddress) => {
    connectWebSocket();
    try {
      console.log("sendGetCampaignAddressRequest called", tokenContractAddress);
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;get_campaign_address;${tokenContractAddress}`;
        console.log("Request sent:", request);
        webSocketInstance.send(request);
        return new Promise((resolve) => {
          registerMessageCallback("1;r!get_campaign_address;", (data) => {
            const response = data.substring("1;r!get_campaign_address;".length);
            console.log("Campaign address response:", response);
            dispatch(setCampaignAddress(response?.split(",")[0]));
            resolve(response);
          });
        });
      }
    } catch (error) {
      console.error("Error sending get campaign address request:", error);
    }
  };
  const sendCreateCampaignInitRequest = (tokenContractAddress) => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;create_campaign_init;${tokenContractAddress}`;
        webSocketInstance.send(request);
        return new Promise((resolve) => {
          webSocketInstance.onmessage = (event) => {
            const data = event.data;
            console.log("data: " + JSON.stringify(data));

            if (data.startsWith("1;r!create_campaign_init;")) {
              const response = data.substring(
                "1;r!create_campaign_init;".length
              );
              console.log("create_campaign_init");
              resolve(response);
            }
          };
        });
      }
    } catch (error) {
      console.error("Error sending create campaign init request:", error);
    }
  };

  const sendGetTwitterSessionRequest = () => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;twitter_login_session;`;
        webSocketInstance.send(request);

        // Return a Promise that resolves with the response
        return new Promise((resolve) => {
          webSocketInstance.onmessage = (event) => {
            const data = event.data;
            if (data.startsWith("1;r!twitter_login_session;")) {
              const response = data.substring(
                "1;r!twitter_login_session;".length
              );
              resolve(response); // Resolve the Promise with the response
            }
          };
        });
      }
    } catch (error) {
      console.error("Error sending get twitter session request:", error);
    }
  };

  const sendCampaignDetailRequest = (campaignContractAddress) => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        webSocketInstance.send(`1;get_campaign;${campaignContractAddress}`);
        return new Promise((resolve) => {
          registerMessageCallback("1;r!get_campaign;", (data) => {
            const response = data.substring("1;r!get_campaign;".length);
            handleCampaignDetailResponse(data);
            console.log("Campaign detail response:", response);
            resolve(response);
          });
        });
      }
    } catch (error) {
      console.error("Error sending campaign detail request:", error);
    }
  };

  const sendCampaignLeaderboardRequest = (contractAddress) => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;campaign_leaderboard;${contractAddress},0`;
        console.log("Sending leaderboard request:", request);
        webSocketInstance.send(request);
        return new Promise((resolve) => {
          registerMessageCallback("1;r!campaign_leaderboard;", (data) => {
            const response = data.substring("1;r!campaign_leaderboard;".length);
            dispatch(setLeaderboard(response));
            dispatch(setIsUserJoined(true));
            console.log("Leaderboard response:", response);
            resolve(response);
          });
        });
      }
    } catch (error) {
      console.error("Error sending campaign leaderboard request:", error);
    }
  };

  const sendCampaignDepositedRequest = (campaignDataDepositedValue) => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        dispatch(setPooledIn(false));
        const request = `1;create_campaign_deposited;${campaignDataDepositedValue}`;
        console.log("Sending campaign deposit request:", request);
        webSocketInstance.send(request);
        // Listen for response
        return new Promise((resolve) => {
          webSocketInstance.onmessage = (event) => {
            const data = event.data;
            console.log("campaign amount deposited =>" + data);
            console.log(
              "amount added in campaign " +
                data.substring("1;r!create_campaign_deposited;".length)
            );
            if (data.startsWith("1;r!create_campaign_deposited;")) {
              const response = data.substring(
                "1;r!create_campaign_deposited;".length
              );
              console.log("HOOOOORRRAAAAAAYYYYYYY campaign created");
              resolve(response);
            } else if (
              data.startsWith("1;e!create_campaign_deposited;") &&
              data.substring("1;e!create_campaign_deposited;".length) ===
                "campaign already exists"
            ) {
              const response = data.substring(
                "1;e!create_campaign_deposited;".length
              );
              dispatch(setPooledIn(true));
              console.log("HOOOOORRRAAAAAAYYYYYYY Amount added");
              resolve(response);
              return;
            }
          };
        });
      }
    } catch (error) {
      console.log("Error sending campaign deposited request:", error);
    }
  };

  const sendCampaignImageRequest = (tokenContract, imageData) => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;set_campaign_image;{"token_contract": "${tokenContract}", "data": "${imageData}"}`;
        console.log("Sending campaign image request:", request);
        webSocketInstance.send(request);
        return new Promise((resolve) => {
          registerMessageCallback("1;r!set_campaign_image;", (data) => {
            const response = data.substring("1;r!set_campaign_image;".length);
            console.log("Campaign image set successfully:", response);
            resolve(response);
          });
          registerMessageCallback("1;e!set_campaign_image;", (data) => {
            const errorResponse = data.substring(
              "1;e!set_campaign_image;".length
            );
            console.error("Error setting campaign image:", errorResponse);
            resolve(errorResponse);
          });
        });
      }
    } catch (error) {
      console.error("Error sending campaign image request:", error);
    }
  };

  const sendReferralUser = (data) => {
    if (!webSocketInstance || webSocketInstance.readyState !== WebSocket.OPEN) {
      return;
    }

    try {
      const message = JSON.stringify(data);
      webSocketInstance.send(message);
    } catch (error) {
      console.error("Error sending referral user:", error);
    }
  };

  const sendMyUgcXpHistory = () => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;my_ugc_xp_history`;
        webSocketInstance.send(request);
        console.log(request);

        // Return a Promise that resolves with the response
        return new Promise((resolve) => {
          webSocketInstance.onmessage = (event) => {
            const data = event.data;
            if (data.startsWith("1;my_ugc_xp_history")) {
              const response = data.substring("1;my_ugc_xp_history;".length);
              resolve(response); // Resolve the Promise with the response
            }
          };
        });
      }
    } catch (error) {
      console.error("Error sending get twitter session request:", error);
    }
  };

  const sendMyUgcXp = () => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;my_ugc_xp`;
        console.log(request);

        webSocketInstance.send(request);

        // Return a Promise that resolves with the response
        return new Promise((resolve) => {
          webSocketInstance.onmessage = (event) => {
            const data = event.data;
            if (data.startsWith("1;r!my_ugc_xp;")) {
              const response = data.substring("1;my_ugc_xp;".length);
              resolve(response); // Resolve the Promise with the response
            }
          };
        });
      }
    } catch (error) {
      console.error("Error sending get ugc xp:", error);
    }
  };

  const sendReferralCount = () => {
    try {
      if (webSocketInstance?.readyState === WebSocket.OPEN) {
        const request = `1;referrals_count`;
        webSocketInstance.send(request);
        console.log(request);

        // Return a Promise that resolves with the response
        return new Promise((resolve) => {
          webSocketInstance.onmessage = (event) => {
            const data = event.data;
            if (data.startsWith("1;r!referrals_count;")) {
              const response = data.substring("1;referrals_count;".length);
              resolve(response); // Resolve the Promise with the response
            }
          };
        });
      }
    } catch (error) {
      console.error("Error sending get twitter session request:", error);
    }
  };

  return {
    connectWebSocket,
    isConnected,
    sendCampaignImageRequest,
    sendMeRequest,
    sendAllCampaignsRequest,
    sendMyPoolinsRequest,
    sendCreateCampaignInitRequest,
    sendCampaignDepositedRequest,
    sendCampaignDetailRequest,
    sendGetCampaignAddressRequest,
    sendCheckMyCampaignFundsRequest,
    sendCampaignLeaderboardRequest,
    sendJoinCamapignRequest,
    sendGetTwitterSessionRequest,
    sendMyRewardsRequest,
    sendReferralUser,
    sendMyUgcXpHistory,
    sendMyUgcXp,
    sendReferralCount,
  };
};
