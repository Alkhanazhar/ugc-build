"use client";
import { useGetAuthToken } from "@/action/authAction";
import { truncateWalletAddress } from "@/action/generalAction";
import { useWebSocket } from "@/network/connection.js";
import { setAuthToken, setWallet } from "@/redux/slice/walletSlice";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "./customText";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";

export const NavButton = ({ hidden }) => {
  const dispatch = useDispatch();
  const { connectWallet } = useGetAuthToken();
  const [walletAddress, setWalletAddress] = useState("CONNECT WALLET");
  const [connectWalletIsPressed, setConnectWalletIsPressed] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const walletAddressFromRedux = useSelector((state) => state.wallet.wallet);
  const { login, logout } = useLoginWithAbstract();

  const { address, status } = useAccount();

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    const storedAuthToken = localStorage.getItem("authToken");

    if (storedWallet && storedAuthToken) {
      dispatch(setWallet(storedWallet));
      setWalletAddress(truncateWalletAddress(storedWallet));
      dispatch(setAuthToken(storedAuthToken));
      return;
    }
  }, []);

  useEffect(() => {
    if (walletAddressFromRedux) {
      setWalletAddress(truncateWalletAddress(walletAddressFromRedux));
    }
  }, [walletAddressFromRedux]);

  const handleDisconnect = () => {
    logout();
    localStorage.removeItem("wallet");
    localStorage.removeItem("authToken");
    dispatch(setWallet(null));
    dispatch(setAuthToken(null));
    setWalletAddress("CONNECT WALLET");
    setMenuVisible(false);
  };

  const handleConnectClick = () => {
    console.log("handleConnectClick walletAddress " + walletAddress);
    if (walletAddress !== "CONNECT WALLET") {
      setMenuVisible((prev) => !prev);
    } else if (walletAddress === "CONNECT WALLET") {
      console.log(
        "handleConnectClick walletAddress is Connect wallet" + walletAddress
      );
      login();
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes pressEffect {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95); /* Slightly smaller scale */
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          marginTop: "10px",
          padding: "8px",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          overflow: "hidden",
          boxShadow: hidden ? "4px 4px 4px rgba(0, 0, 0, 0.1)" : "",
        }}
        sx={{
          display: {
            xs: hidden ? "none" : "flex",
            sm: hidden ? "flex" : "none",
          },
          alignItems: "center",
        }}
      >
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid
            item
            display={"flex"}
            alignItems={"center"}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/form">
              <Button
                size="small"
                sx={{
                  width: "180px",
                  height: "48px",
                  border: "4px solid black",
                  backgroundColor: "#DCEC55",
                  borderRadius: 4,
                  marginRight: { xs: "0", sm: "20px" },
                  color: "white",
                  animation: "pressEffect 0.2s ease-in-out infinite", // Animation for Create Campaign

                  boxShadow: "2px 2px 0px black",

                  transition: "transform 0.1s, box-shadow 0.1s",
                }}
              >
                <CustomText
                  text="CREATE CAMPAIGN"
                  fontSize="20px"
                  fontFamily="Skrapbook"
                  fontStroke="5px"
                />
              </Button>
            </Link>
            <Button
              onClick={handleConnectClick}
              size="small"
              sx={{
                width: "180px",
                height: "48px",
                border: "4px solid black",
                backgroundColor: "#B74AFF",
                borderRadius: 4,
                color: "white",
                boxShadow: connectWalletIsPressed
                  ? "1px 1px 0px black"
                  : "2px 2px 0px black",
                transform: connectWalletIsPressed
                  ? "translate(2px, 2px)"
                  : "none",
                transition: "transform 0.1s, box-shadow 0.1s",
              }}
              onMouseDown={() => setConnectWalletIsPressed(true)}
              onMouseUp={() => setConnectWalletIsPressed(false)}
              onMouseLeave={() => setConnectWalletIsPressed(false)}
              onTouchStart={() => setConnectWalletIsPressed(true)}
              onTouchEnd={() => setConnectWalletIsPressed(false)}
            >
              <Typography
                component="div"
                sx={{
                  fontFamily: "Skrapbook",
                  fontSize: "20px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  textShadow:
                    "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -1px 1px #000",

                  color: "#ffffff",
                }}
              >
                {walletAddress}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
      {menuVisible && walletAddress !== "CONNECT WALLET" && (
        <Box
          sx={{
            position: "absolute",
            top: { sm: "85px", xs: "auto" },
            right: { sm: "-69px", xs: "-86px" },
            transform: "translateX(-50%)",
            height: { sm: "80%", xs: "fit-content" },
            width: "191px",
            background: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            border: "2px solid black",
            padding: "0px",
            zIndex: 10,
          }}
        >
          <Link href="/profile">
            <Button
              sx={{
                display: "flex",
                width: "100%",
                height: "50%",
                textAlign: "center",
                marginBottom: "0px",
                backgroundColor: "black",
                color: "white",
                fontFamily: "Skrapbook",
                borderRadius: "12px 12px 0 0",
                border: "2px solid black",
              }}
              style={{ height: "30px" }}
            >
              Go to Profile
            </Button>
          </Link>
          <Button
            onClick={handleDisconnect}
            sx={{
              display: "flex",
              width: "100%",
              textAlign: "center",
              height: "50%",
              backgroundColor: "white",
              color: "black",
              fontFamily: "Skrapbook",
              borderRadius: "0 0 12px 12px",
              border: "2px solid black",
            }}
            style={{ height: "30px" }}
          >
            Logout
          </Button>
        </Box>
      )}
    </>
  );
};
