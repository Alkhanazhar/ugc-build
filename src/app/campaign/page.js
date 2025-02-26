/* eslint-disable @next/next/no-img-element */
"use client";
import { Typography, Snackbar } from "@mui/material";
import { ethers } from "ethers";

import CustomText from "@/components/GeneralComponents/customText";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Suspense,
  useRef,
} from "react";
import NavBar from "@/components/GeneralComponents/navbar";
import Slide from "@mui/material/Slide";

import LeaderboardContent from "@/components/leaderboard/leaderboardContent";
import {
  LinearProgress,
  Box,
  Grid,
  Button,
  Modal,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import CustomTextField from "@/components/form/customTextField";
import { useDepositTokens } from "@/action/contracts/contractInteractionAction";
import { useWebSocket } from "@/network/connection";
import { useSearchParams } from "next/navigation";
import { setJoinNowState } from "@/redux/slice/walletSlice";
import { setDepositLoading } from "@/redux/slice/formSlice.js";
import { setCampaignCreated } from "@/redux/slice/formSlice.js";
import { useGetAuthToken } from "@/action/authAction";
import { CustomLoader } from "@/components/GeneralComponents/customLoader";
import { calculateTimeRemaining, formatNumber } from "@/action/generalAction";
import { parseAbi } from "viem";
import { ExtendModal } from "@/components/campaign/extendModal";
import { setLeaderboard } from "@/redux/slice/leaderboardSlice";
import html2canvas from "html2canvas";
import CountdownTimer from "@/components/GeneralComponents/countDownTimer";
import Link from "next/link";
import { useAbstractClient } from "@abstract-foundation/agw-react";
import { CONTRACT_ABI } from "@/action/contracts/abi";
import PoolInButton from "@/components/campaign/poolInButton";
import { useAccount } from "wagmi";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "300px", sm: "600px" },
  bgcolor: "#F5F5F5",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "35px",
  boxShadow: "2px 2px 0px black",
  p: { sm: 4, xs: "18px" },
};

function SlideTransition() {
  return <Slide {...props} direction="up" />;
}

function CampaignDetailContent({ campaign }) {
  const { depositTokens } = useDepositTokens();
  const {
    sendCampaignDetailRequest,
    sendGetCampaignAddressRequest,
    sendCheckMyCampaignFundsRequest,
    sendCampaignLeaderboardRequest,
    sendJoinCamapignRequest,
    sendCreateCampaignInitRequest,
    sendCampaignDepositedRequest,
  } = useWebSocket();
  const { connectWallet, handleOpenTwitterConnectWindow } = useGetAuthToken();
  const dispatch = useDispatch();
  const { address, status } = useAccount();

  // State
  const [loading, setLoading] = useState(false);
  const [poolValue, setPoolValue] = useState(
    localStorage.getItem("poolValue") || ""
  );

  const [open, setOpen] = useState(false);
  const [extendOpen, setExtendOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [campaignAddress, setCampaignAddress] = useState();
  const [tokenContract, setTokenContract] = useState("");
  const leaderboardDetail = useSelector((state) => state.leaderboard.items);
  const [joinNowStateStatus, setJoinNowStateStatus] = useState(
    "WALLET_NOT_CONNECTED"
  );

  // Constants
  const components = useMemo(() => ["10000", "25000", "50000"], []);
  const joinNowState = useSelector((state) => state.wallet.joinNowState);
  console.log("join now state " + joinNowState);
  const [snackbarState, setSnackbarState] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const isPooledIn = useSelector(
    (state) => state.campaignDetail?.pooledIn || false
  );

  const joinedCampaign = useSelector(
    (state) => state.campaigns?.joinCampaign || false
  );

  const isUserJoined = useSelector((state) => state.campaigns.isUserJoined);

  const campaignContractAddress = useSelector(
    (state) => state.campaigns.campaignAddress
  );

  useEffect(() => {
    console.log("joined campaign bool " + joinedCampaign);
    if (joinedCampaign) {
      handleClickSnackbar();
    }
  }, [joinedCampaign]);

  const handleClickSnackbar = () => () => {
    setSnackbarState(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarState(false);
  };

  useEffect(() => {
    setJoinNowStateStatus(joinNowState);
  }, [joinNowState]);

  const checkUserInfo = useSelector((state) => state.user.userInfo);
  let twitterState;

  if (checkUserInfo != null) {
    twitterState = checkUserInfo["twitter_id"] ?? "";
  }

  const checkState = useCallback(() => {
    const wallet = localStorage.getItem("wallet");
    const authToken = localStorage.getItem("authToken");
    const userInfo = localStorage.getItem("userInfo");
    let twitterId;
    if (userInfo) {
      twitterId = JSON.parse(userInfo)["twitter_id"];
    }
    console.log("twitter id " + (twitterState || twitterId !== ""));

    if (wallet && authToken && twitterId === "") {
      dispatch(setJoinNowState("WALLET_CONNECTED"));
    } else if (wallet && authToken && twitterId !== "") {
      dispatch(setJoinNowState("TWITTER_CONNECTED"));
    } else {
      dispatch(setJoinNowState("WALLET_NOT_CONNECTED"));
    }
  }, [dispatch, checkUserInfo, twitterState]);

  const joinNowButton = useCallback(() => {
    const buttonStyles = {
      width: "100%",
      height: "72px",
      border: "5px solid black",
      borderRadius: 6,
      color: "white",
      boxShadow: "5px 4px 0px black",
    };

    switch (joinNowStateStatus) {
      case "WALLET_CONNECTED":
        return (
          <Button
            size="small"
            onClick={handleOpenTwitterConnectWindow}
            sx={{ ...buttonStyles, backgroundColor: "#B74AFF" }}
          >
            <CustomText
              text="CONNECT X"
              fontSize="30px"
              fontFamily="Skrapbook"
              fontStroke="6px"
            />
          </Button>
        );
      case "TWITTER_CONNECTED":
        return campaign["status"] == "LIVE" ? (
          isUserJoined ? (
            <Button
              size="small"
              sx={{ ...buttonStyles, backgroundColor: "#BAC841" }}
            >
              <CustomText
                text="JOINED"
                fontSize="30px"
                fontFamily="Skrapbook"
                fontStroke="6px"
              />
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() =>
                sendJoinCamapignRequest(campaign["token_contract"])
              }
              sx={{ ...buttonStyles, backgroundColor: "#B74AFF" }}
            >
              <CustomText
                text="JOIN NOW!"
                fontSize="30px"
                fontFamily="Skrapbook"
                fontStroke="6px"
              />
            </Button>
          )
        ) : (
          <Button
            size="small"
            onClick={() => {
              if (!agwClient) {
                return;
              }
              handleOpen();
            }}
            sx={{ ...buttonStyles, backgroundColor: "#B74AFF" }}
          >
            <CustomText
              text={agwClient ? "POOL IN!" : "Loading..."}
              fontSize="30px"
              fontFamily="Skrapbook"
              fontStroke="6px"
            />
          </Button>
        );
      case "WALLET_NOT_CONNECTED":
        return (
          <Button
            size="small"
            onClick={connectWallet}
            sx={{ ...buttonStyles, backgroundColor: "#B74AFF" }}
          >
            <CustomText
              text="CONNECT WALLET"
              fontSize="30px"
              fontFamily="Skrapbook"
              fontStroke="6px"
            />
          </Button>
        );
      default:
        return (
          <Button
            size="small"
            sx={{ ...buttonStyles, backgroundColor: "#67636A" }}
          >
            <CustomText
              text="OH :("
              fontSize="30px"
              fontFamily="Skrapbook"
              fontStroke="6px"
            />
          </Button>
        );
    }
  }, [
    joinNowStateStatus,
    handleOpenTwitterConnectWindow,
    sendJoinCamapignRequest,
    campaign,
    connectWallet,
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExtendOpen = () => setExtendOpen(true);
  const handleExtendClose = () => setExtendOpen(false);

  const fetchCampaignDetail = async (tokenContract) => {
    if (!tokenContract) return;
    // setLoading(true);
    try {
      await sendGetCampaignAddressRequest(tokenContract);
      await sendCampaignLeaderboardRequest(tokenContract);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    } finally {
      // setLoading(false);
    }
  };
  const componentRef = useRef(null);
  const handleDownloadScreenshot = async () => {
    if (componentRef.current) {
      handleClose();
      // Set the background image on the component
      componentRef.current.style.backgroundImage =
        "url(./homepage-background.png)";
      componentRef.current.style.backgroundSize = "cover";
      componentRef.current.style.backgroundPosition = "center";

      const canvas = await html2canvas(componentRef.current, {
        useCORS: true,
        scale: 2,
        logging: false,
        backgroundColor: null,
      });

      // Reset the background image
      componentRef.current.style.backgroundImage = "";

      // // Download the image
      // const link = document.createElement("a");
      // link.download = `${campaign.ticker}_campaign_snapshot.png`;
      // link.href = canvas.toDataURL("image/png");
      // link.click();
      setImagePreview(canvas.toDataURL("image/png"));

      // Open the modal
      setOpenModal(true);
    }
  };
  const [openToast2, setOpenToast2] = useState(false);
  const handleCopyImage = async () => {
    if (componentRef.current) {
      componentRef.current.style.backgroundImage =
        "url(./homepage-background.png)";
      componentRef.current.style.backgroundSize = "cover";
      componentRef.current.style.backgroundPosition = "center";
      const canvas = await html2canvas(componentRef.current, {
        useCORS: true,
        scale: 2,
        logging: false,
        backgroundColor: null,
      });

      canvas.toBlob(async (blob) => {
        try {
          if (navigator.clipboard && navigator.clipboard.write) {
            const item = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([item]);
            setSnackbarMessage("Image copied to clipboard!");
            setSnackbarOpen(true);
          } else {
            throw new Error("Clipboard API not supported");
          }
        } catch (error) {
          console.error("Failed to copy image to clipboard:", error);
          setSnackbarMessage(
            "Failed to copy image. Please attach it manually."
          );
          setSnackbarOpen(true);
        }
      }, "image/png");
    }
    setOpenToast2(true);
    setTimeout(() => setOpenToast2(false), 2000);
  };

  const handleShareOnTwitter = () => {
    const tweetText = `🚀 Excited to share the latest snapshot of the ${campaign.ticker} campaign! 🚀\n\n📊 Check out the progress and join the movement!\n\n👉 Paste the image from your clipboard or attach it from your "Downloads" folder to this tweet!`;
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterIntentUrl, "_blank");
  };

  const [openToast, setOpenToast] = useState(false);

  const handleCopyLink = () => {
    const tweetText = `🚀 Excited to share the latest snapshot of the ${campaign.ticker} campaign! 🚀\n\n📊 Check out the progress and join the movement!\n\n👉 Paste the image from your clipboard or attach it from your "Downloads" folder to this tweet!`;
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    navigator.clipboard.writeText(twitterIntentUrl);
    setOpenToast(true);
    setTimeout(() => setOpenToast(false), 2000);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    checkState();
    console.log("token contract in useEffect " + campaign?.token_contract);
    const fetchData = async () => {
      if (campaign?.token_contract) {
        setTokenContract(campaign.token_contract);
        await fetchCampaignDetail(campaign.token_contract);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isPooledIn) {
      handleClose();
      handleExtendClose();
      fetchCampaignDetail(campaign.token_contract);
      sendCheckMyCampaignFundsRequest(campaign.token_contract);
    }
  }, [isPooledIn]);

  useEffect(() => {
    console.log("campaignContractAddress " + campaignContractAddress);
    setCampaignAddress(campaignContractAddress);
  }, [campaignContractAddress]);

  if (!campaign && leaderboardDetail && campaignContractAddress == null) {
    return <CustomLoader />;
  }

  const timeRemaining = calculateTimeRemaining(
    campaign["start_time"],
    campaign["end_time"]
  );

  const { data: agwClient } = useAbstractClient();

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundImage: "url(./modal-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3, // Adjust opacity as needed
          },
        }}
      >
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: "Skrapbook" }}>
            The Meme Mafia grows everyday
          </Typography>
          <Typography sx={{ mb: 3, fontFamily: "Garfiey" }}>
            Add your homies. We must pump our bags together.
          </Typography>

          {/* Image Preview */}
          {imagePreview && (
            <Box
              sx={{
                width: { xs: "100%", sm: "80%" }, // Responsive width
                maxWidth: { sm: "500px", xs: "300px" },
                height: "auto",
                border: "2px solid black",
                borderRadius: "8px",
                mb: 3,
                mx: "auto", // Center the image
              }}
            >
              <img
                src={imagePreview}
                alt="Campaign Snapshot"
                style={{ width: "100%", height: "auto", borderRadius: "6px" }}
              />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleCopyImage}
              sx={{
                width: "100%",
                mb: 2,
                backgroundColor: "#B74AFF",
                color: "white",
                fontFamily: "Skrapbook",
                fontSize: { xs: "16px", sm: "18px" }, // Responsive font size
                border: "2px solid black",
                borderRadius: "25px",
                boxShadow: "2px 2px 0px black",
                maxWidth: { sm: "700px", xs: "300px" },
                position: "relative",
              }}
            >
              {openToast2 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translate(-50%, -120%)",
                    zIndex: 1,
                    backgroundImage: "url(./copyed.png)",
                    backgroundSize: "cover",
                    width: "91px",
                    height: "41px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Skrapbook",
                      fontSize: "20px",
                      color: "#000",
                    }}
                  >
                    Copyed!
                  </Typography>
                </Box>
              )}
              <CustomText
                text="Copy Image to Clipboard"
                fontFamily="Skrapbook"
                fontSize={isMobile ? "18px" : "28px"}
              />
            </Button>
            <Button
              onClick={handleShareOnTwitter}
              sx={{
                width: "100%",
                backgroundColor: "#1DA1F2",
                color: "white",
                fontFamily: "Skrapbook",
                fontSize: { xs: "16px", sm: "18px" }, // Responsive font size
                border: "2px solid black",
                borderRadius: "25px",
                boxShadow: "2px 2px 0px black",
                maxWidth: { sm: "700px", xs: "300px" },
              }}
            >
              <CustomText
                text="Share on Twitter"
                fontFamily="Skrapbook"
                fontSize={isMobile ? "18px" : "28px"}
              />
            </Button>
            <Button
              sx={{
                display: "flex",
                justifyContent: "cemter",
                gap: 2,
                alignItems: "center",
                position: "relative",
              }}
              onClick={handleCopyLink}
            >
              {openToast && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translate(-50%, -120%)",
                    zIndex: 1,
                    backgroundImage: "url(./copyed.png)",
                    backgroundSize: "cover",
                    width: "91px",
                    height: "41px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Skrapbook",
                      fontSize: "20px",
                      color: "#000",
                    }}
                  >
                    Copyed!
                  </Typography>
                </Box>
              )}
              <Typography
                sx={{
                  fontFamily: "Skrapbook",
                  fontSize: { xs: "18px", sm: "28px" },
                  color: "#201C18",
                  marginTop: "10px",
                }}
              >
                COPY LINK
              </Typography>
              <img
                alt="copy"
                src="./campaign-copy.png"
                width={28}
                height={28}
              />
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <Snackbar
        open={snackbarState}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        message={`Joined ${campaign["ticker"]}`}
        autoHideDuration={1200}
      />
      <Modal
        open={open}
        onClose={handleClose}
        disableScrollLock
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiBackdrop-root": {
            backgroundImage: "url(./modal-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3, // Adjust opacity as needed
          },
        }}
      >
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="flex-end">
            <Box
              onClick={handleClose}
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                border: "2px solid #000000",
                padding: "5px",
                borderRadius: "10px",
                marginBottom: "30px",
                cursor: "pointer",
                position: "absolute",
                top: "25px",
                right: "30px",
              }}
            >
              <CloseIcon />
            </Box>
          </Box>
          <Box sx={{ mt: 5 }}>
            <CustomTextField
              label={""}
              placeholder={"AMOUNT (MIN 1000)"}
              value={poolValue}
              disable={false}
              onChange={(e) => {
                const value = e.target.value;
                setPoolValue(value);
                localStorage.setItem("poolValue", value);
              }}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                color: "#B74AFF",
                fontSize: 16,
                margin: "-16px 0px 0px 0px",
              }}
            >
              OR!
            </Typography>
          </Box>
          <Grid
            container
            display="flex"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
            spacing={1}
          >
            {components.map((component, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box
                  onClick={() => setPoolValue(component)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "12px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    color: "black",
                    border: "2px solid #000000",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    lineHeight: "38px",
                  }}
                >
                  {component}
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center">
            <PoolInButton
              campaign={campaign}
              campaignAddress={campaignAddress}
              poolValue={poolValue}
              key={"pool in button"}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={handleDownloadScreenshot}
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Skrapbook",
                  fontSize: { sm: "24px", xs: "14px" },
                  color: "black",
                  textAlign: "center",
                }}
              >
                Pool in With Friends
              </Typography>
              <img alt="share" width={16} height={16} src="./share.png" />
            </Button>
          </Box>
        </Box>
      </Modal>
      <main>
        <Box
          style={{
            backgroundImage: "url(./homepage-background.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundPosition: "top left",
            overflow: "hidden",
          }}
        >
          <NavBar />
          <Box ref={componentRef}>
            <Grid
              container
              sx={{ padding: { xs: "60px 24px", sm: "60px 100px" } }}
            >
              <Grid item>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: { xs: "flex", sm: "block" },
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <img
                      alt="Ticker"
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        border: "5px solid black",
                        borderRadius: "36px",
                        width: "100%",
                      }}
                      src="./ticker.png"
                    />
                  </Box>
                  <Social display={isMobile} campaign={campaign} />
                  <Box
                    sx={{
                      display: {
                        xs: "flex",
                        sm: "none",
                        width: "50%",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2,
                      },
                    }}
                  >
                    <Grid container display="flex" alignItems="center">
                      <Grid item>
                        <Typography
                          component="div"
                          style={{ fontFamily: "Skrapbook" }}
                          sx={{
                            fontSize: {
                              xs:
                                campaign["status"] == "LIVE" ? "32px" : "26px",
                              sm: "32px",
                            },
                          }}
                        >
                          {campaign["status"]}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Box
                          style={{
                            width: "14px",
                            height: "14px",
                            backgroundColor:
                              campaign["status"] == "LIVE" ? "#43E522" : "red",
                            borderRadius: "50%",
                            border: "2px solid black",
                            marginLeft: "5px",
                          }}
                        ></Box>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        sx={{
                          fontFamily: "Skrapbook",
                          fontSize: "16px",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                          textShadow:
                            "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -1px 1px #000",
                          // WebkitTextStroke: "1px #000000",
                          color: "#ffffff",
                        }}
                      >
                        {campaign["name"]}{" "}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{
                          fontFamily: "Skrapbook",
                          fontSize: "16px",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                          textShadow:
                            "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -1px 1px #000",
                          // WebkitTextStroke: "1px #000000",
                          color: "#BAC841",
                        }}
                      >
                        {`(${campaign["ticker"]})`}
                      </Typography>
                    </Grid>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                        marginTop: "16px",
                      }}
                    >
                      <Grid
                        style={{
                          background: "#F5F5F5",
                          height: "50px",
                          padding: "5px 10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          borderRadius: "8px",
                        }}
                        sx={{
                          display: {
                            xs: "flex",
                            sm: "none",
                            gap: 2,
                          },
                        }}
                        item
                      >
                        <img height="26px" alt="hands" src="./hands.png" />
                        <Typography
                          component="div"
                          style={{
                            fontSize: "24px",
                            fontFamily: "Skrapbook",
                            fontWeight: "500",
                            lineHeight: "1",
                            marginTop: "-2px",
                          }}
                        >
                          {formatNumber(campaign["participants"])}
                        </Typography>
                      </Grid>
                      <Grid
                        style={{
                          background: "#F5F5F5",
                          height: "50px",
                          width: "80px",
                          borderRadius: "20px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        sx={{
                          display: { xs: "flex", sm: "none" },
                          flexDirection: "row",
                        }}
                        item
                      >
                        <img height="26px" alt="cup" src="./cup.png" />
                        <Box display="flex" flexDirection="column">
                          <Typography
                            component="div"
                            style={{
                              fontSize: "16px",
                              fontFamily: "Skrapbook",
                              lineHeight: "1",
                            }}
                          >
                            {parseFloat(campaign["usd_price"]).toFixed(4)}
                          </Typography>
                          <Typography
                            component="div"
                            style={{
                              fontSize: "16px",
                              fontFamily: "Skrapbook",
                              lineHeight: "1",
                            }}
                          >
                            USD
                          </Typography>
                        </Box>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} sx={{ ml: { xs: 0, sm: 4 } }}>
                <Grid
                  container
                  sx={{ display: { xs: "none", sm: "flex" } }}
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      component="div"
                      style={{ fontFamily: "Skrapbook", fontSize: "32px" }}
                    >
                      {campaign["status"]}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box
                      style={{
                        width: "14px",
                        height: "14px",
                        backgroundColor:
                          campaign["status"] == "LIVE" ? "#43E522" : "red",
                        borderRadius: "50%",
                        border: "2px solid black",
                        marginLeft: "5px",
                      }}
                    ></Box>
                  </Grid>
                </Grid>
                <Grid item>
                  <Box>
                    <Grid
                      container
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Grid
                        item
                        sx={{
                          display: {
                            xs: "none",
                            sm: "flex",
                            flexDirection: "column",
                          },
                        }}
                      >
                        {/* <CustomText
                          text={campaign["name"]}
                          subText={`(${campaign["ticker"]})`}
                          subTextColor="#BAC841"
                          fontSize="30px"
                        /> */}
                        <Typography
                          component="div"
                          sx={{
                            fontFamily: "Skrapbook",
                            fontSize: "34px",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textShadow:
                              "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -1px 1px #000",
                            // WebkitTextStroke: "1px #000000",
                            color: "#ffffff",
                          }}
                        >
                          {campaign["name"]}
                        </Typography>
                        <Typography
                          component="div"
                          sx={{
                            fontFamily: "Skrapbook",
                            fontSize: "34px",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            textShadow:
                              "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -1px 1px #000",
                            // WebkitTextStroke: "1px #000000",
                            color: "#BAC841",
                          }}
                        >
                          {`(${campaign["ticker"]})`}
                        </Typography>
                        <Grid item style={{ marginTop: "16px" }}>
                          <Typography
                            component="div"
                            style={{
                              fontSize: "16px",
                              fontFamily: "Garfiey",
                            }}
                          >
                            {campaign["description"]}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        style={{
                          background: "#F5F5F5",
                          height: "80px",
                          width: "80px",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          borderRadius: "20px",
                        }}
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        item
                      >
                        <img height="26px" src="./hands.png" />
                        <Typography
                          component="div"
                          style={{
                            fontSize: "36px",
                            fontFamily: "Skrapbook",
                            fontWeight: "500",
                            lineHeight: "1",
                            marginTop: "-2px",
                          }}
                        >
                          {formatNumber(campaign["participants"])}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Social display={!isMobile} campaign={campaign} />
                <Grid item style={{ marginTop: "20px" }}>
                  <Box>
                    <Grid
                      container
                      display="flex"
                      justifyContent="space-between"
                      sx={{
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: { xs: "flex-center", sm: "flex-end" },
                      }}
                    >
                      <Grid item>
                        <Grid item syle={{ marginTop: "16px" }}>
                          <Typography
                            component="div"
                            style={{
                              background: "#F5F5F5",
                              height: "25px",

                              width: "350px",
                              borderRadius: "20px",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              fontFamily: "Skrapbook",
                            }}
                            sx={{
                              textAlign: { xs: "center", sm: "left" },
                              fontSize: { xs: "14px", sm: "14px" },
                            }}
                          >
                            <span>
                              <CustomText
                                text="CREATE & POST ON X"
                                fonSize="14px"
                                fontFamily="Garfiey"
                                fontStroke="3px"
                              />
                            </span>{" "}
                            USING{" "}
                            <span>
                              <CustomText
                                text={campaign["ticker"]}
                                fonSize="14px"
                                fontFamily="Skrapbook"
                                fontStroke="3px"
                              />
                            </span>{" "}
                            TO EARN POINTS!
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        style={{
                          background: "#F5F5F5",
                          height: "80px",
                          width: "80px",
                          borderRadius: "20px",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        item
                      >
                        <img height="26px" src="./cup.png" />
                        <Typography
                          component="div"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Skrapbook",
                            lineHeight: "1",
                          }}
                        >
                          {parseFloat(
                            campaign.usd_price * campaign.total_pool
                          ).toFixed(2)}{" "}
                          {/* Convert scientific notation to normal price */}
                        </Typography>
                        <Typography
                          component="div"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Skrapbook",
                            lineHeight: "1",
                          }}
                        >
                          USD {/* Display 'USD' as plain text */}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                {campaign["end_time"] !== 0 ? (
                  <Box
                    sx={{ borderRadius: 4 }}
                    style={{
                      border: "5px solid black",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <Box sx={{ position: "relative", width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={timeRemaining.percentage}
                        sx={{
                          height: 24,
                          borderRadius: 4,
                          backgroundColor: "white",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                            backgroundColor: "#BAC841",
                          },
                        }}
                      />
                      <Typography
                        component="div"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        <Box position="relative" display="inline-block">
                          <Typography
                            component="div"
                            sx={{
                              fontFamily: "Skrapbook",
                              fontSize: "16px",
                              color: "#000000",
                            }}
                          >
                            <CountdownTimer
                              epochStartTime={campaign["start_time"]}
                              epochEndTime={campaign["end_time"]}
                            />
                          </Typography>
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                ) : null}
                {campaign["status"] == "GRADUATING" ? (
                  <Box
                    sx={{ borderRadius: 4 }}
                    style={{
                      border: "5px solid black",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <Box sx={{ position: "relative", width: "100%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={
                          (campaign["total_pool"] /
                            (campaign["total_pool"] + campaign["goal"])) *
                          100
                        }
                        sx={{
                          height: 24,
                          borderRadius: 4,
                          backgroundColor: "white",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                            backgroundColor: "#BAC841",
                          },
                        }}
                      />
                      <Typography
                        component="div"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        <Box position="relative" display="inline-block">
                          <Typography
                            component="div"
                            sx={{
                              fontFamily: "Skrapbook",
                              fontSize: "16px",
                              color: "#000000",
                            }}
                          >
                            {/* 20 DREAM($20)/162.56($162.56) */}
                            {`${campaign["total_pool"]} ${campaign.ticker} ($${
                              campaign["total_pool"]
                            }) / ${Number(
                              campaign["total_pool"] + campaign["goal"]
                            )?.toFixed(2)}  (${Number(
                              campaign["total_pool"] + campaign["goal"]
                            )?.toFixed(2)})`}
                          </Typography>
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                ) : null}
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: "1px" }}
                  sx={{ paddingLeft: { xs: "0", sm: "16px" } }}
                >
                  <Grid
                    xs={12}
                    sm={8}
                    item
                    sx={{ paddingLeft: { xs: "0", sm: "0px" } }}
                  >
                    {joinNowButton()}
                  </Grid>
                  {/* <Grid
                    xs={12}
                    sm={4}
                    item
                    sx={{ paddingLeft: { xs: "0", sm: "16px" } }}
                  >
                    <Button
                      onClick={handleExtendOpen}
                      size="small"
                      sx={{
                        width: "100%",
                        height: "72px",
                        border: "5px solid black",
                        backgroundColor: "#ffffff",
                        borderRadius: 6,
                        color: "white",
                        boxShadow: "5px 4px 0px black",
                      }}
                    >
                      <CustomText
                        text="Extend!!"
                        fontSize="24px"
                        fontFamily="Skrapbook"
                        fontStroke="6px"
                      />
                     
                    </Button>
                  </Grid>{" "} */}
                  <Grid
                    xs={12}
                    sm={4}
                    item
                    sx={{ paddingLeft: { xs: "0", sm: "16px" } }}
                  >
                    {campaign["status"] == "LIVE" ? (
                      <Button
                        onClick={() => {
                          if (!agwClient) {
                            return;
                          }
                          handleOpen();
                        }}
                        size="small"
                        sx={{
                          width: "100%",
                          height: "72px",
                          border: "5px solid black",
                          backgroundColor: "#ffffff",
                          borderRadius: 6,
                          color: "white",
                          boxShadow: "5px 4px 0px black",
                        }}
                      >
                        <CustomText
                          text={agwClient ? "POOL IN!" : "Loading..."}
                          fontSize="24px"
                          fontFamily="Skrapbook"
                          fontStroke="6px"
                        />
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        sx={{
                          width: "100%",
                          height: "72px",
                          border: "5px solid black",
                          backgroundColor: "#ffffff",
                          borderRadius: 6,
                          color: "white",
                          boxShadow: "5px 4px 0px black",
                        }}
                        onClick={handleDownloadScreenshot}
                      >
                        <CustomText
                          text="Invite"
                          fontSize="24px"
                          fontFamily="Skrapbook"
                          fontStroke="6px"
                        />
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <LeaderboardContent joinNowState={joinNowState} />
      </main>
    </div>
  );
}

export default function CampaignDetail() {
  return (
    <Suspense fallback={<CustomLoader />}>
      <CampaignDetailContentWrapper />
    </Suspense>
  );
}

function CampaignDetailContentWrapper() {
  const searchParams = useSearchParams();
  const id = searchParams.get("token_contract");
  const campaigns = useSelector((state) => state.campaigns?.items || {});
  const campaignData = Object.values(campaigns).find(
    (campaign) => campaign.token_contract === id
  );

  if (!campaignData) {
    return <CustomLoader />;
  }

  try {
    return <CampaignDetailContent campaign={campaignData} />;
  } catch (error) {
    console.error("Error parsing campaign data:", error);
    return <div>Invalid campaign data.</div>;
  }
}

const Social = ({ display, campaign }) => {
  const [openToast, setOpenToast] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setOpenToast(true); // Show toast message
    setTimeout(() => setOpenToast(false), 2000); // Hide toast after 2 seconds
  };

  return (
    <Box
      sx={{
        display: display ? "none" : "flex",
        gap: 2,
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        {campaign?.website && (
          <Link
            href={
              campaign?.website && campaign?.website !== ""
                ? campaign?.website
                : "#"
            }
          >
            <img
              alt="Ticker"
              style={{
                objectFit: "cover",
                width: "29px",
                height: "29px",
              }}
              src="./campaign-website.png"
            />
          </Link>
        )}
        {campaign?.telegram_link && (
          <Link
            href={
              campaign?.telegram_link && campaign?.telegram_link !== ""
                ? campaign?.telegram_link
                : "#"
            }
          >
            <img
              alt="Ticker"
              style={{
                objectFit: "cover",
                width: "29px",
                height: "29px",
              }}
              src="./campaign-telegram.png"
            />
          </Link>
        )}
        {campaign?.twitter_link && (
          <Link
            href={
              campaign?.twitter_link && campaign?.twitter_link !== ""
                ? campaign?.twitter_link
                : "#"
            }
          >
            <img
              alt="Ticker"
              style={{
                objectFit: "cover",
                width: "29px",
                height: "29px",
              }}
              src="./campaign-x.png"
            />
          </Link>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flex: 1,
          border: "2px solid #201C18",
          borderRadius: "10px",
          padding: "5px 7px 5px 7px",
          backgroundColor: "#F5F5F5",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            minWidth: "80px",
            overflow: "hidden",
            maxWidth: "150px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Garfiey",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "14px",
            }}
          >
            {campaign?.token_contract}
          </Typography>
        </Box>
        <Button
          onClick={() => {
            handleCopy(campaign?.token_contract);
          }}
          sx={{
            padding: 0,
            margin: 0,
            minWidth: 0,
            position: "relative",
          }}
        >
          {openToast && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translate(-50%, -120%)",
                zIndex: 1,
                backgroundImage: "url(./copyed.png)",
                backgroundSize: "cover",
                width: "91px",
                height: "41px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Skrapbook",
                  fontSize: "20px",
                  color: "#000",
                }}
              >
                Copyed!
              </Typography>
            </Box>
          )}
          <img
            alt="Copy Icon"
            style={{
              objectFit: "cover",
              width: "17px",
              height: "17px",
              flexShrink: 0, // Prevents image from shrinking
            }}
            src="./campaign-copy.png"
          />
        </Button>
      </Box>

      {/* Toast Snackbar */}
    </Box>
  );
};
