"use client";
import { useWebSocket } from "@/network/connection";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function WebSocketProvider({ children }) {
  const { connectWebSocket, sendReferralUser } = useWebSocket();
  const referralByUser = useSelector((state) => state.user.referralByUser);

  useEffect(() => {
    console.log("referral by user");
    if (referralByUser) {
      sendReferralUser({ referralUser: referralByUser });
      console.log("referral by user sent to websocket");
    }
  }, [referralByUser, sendReferralUser]);

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  return children;
}
