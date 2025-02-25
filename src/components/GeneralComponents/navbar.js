/* eslint-disable @next/next/no-img-element */
"use client";
import { truncateWalletAddress } from "@/action/generalAction";
import { useWebSocket } from "@/network/connection.js";
import { setAuthToken, setWallet } from "@/redux/slice/walletSlice";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "./customText";
import { NavButton } from "./nav-button";
import { Close } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import zIndex from "@mui/material/styles/zIndex";

const UnderlinedButton = styled(Button)({
  textTransform: "none",
  textDecoration: "underline",
  color: "black",
  fontFamily: "Garfiey",
  fontSize: "24px",
  "&:hover": {
    textDecoration: "underline",
  },
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "300px", sm: "800px" },
  height: { xs: "500px", sm: "fit-content" },
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "35px",
  boxShadow: "2px 2px 0px black",
  p: { xs: "12px", sm: 4 },
};
const modalScrollStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "600px",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  "&::-webkit-scrollbar": {
    width: "8px", // Slightly wider to accommodate the border effect
  },
  "&::-webkit-scrollbar-track": {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "inset 0 0 0 1px black", // Simulate a border using box-shadow
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#B74AFF",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#B74AFF",
  },
};

const drawerWidth = 232;
const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiBackdrop-root": {
    backgroundColor: "transparent",
  },
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    boxShadow: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    boxShadow: "none",
    msOverflowStyle: "none",
    overflow: "visible",
    scrollbarWidth: "none",
  },
});

export default function NavBar() {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const isCampaign = pathName.includes("/campaign");
  const { userInfo } = useSelector((state) => state.profile);

  const [walletAddress, setWalletAddress] = useState("CONNECT WALLET");
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const walletAddressFromRedux = useSelector((state) => state.wallet.wallet);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    const storedAuthToken = localStorage.getItem("authToken");

    if (storedWallet && storedAuthToken) {
      dispatch(setWallet(storedWallet));
      setWalletAddress(truncateWalletAddress(storedWallet));
      dispatch(setAuthToken(storedAuthToken));
    }
  }, []);

  useEffect(() => {
    if (walletAddressFromRedux) {
      setWalletAddress(truncateWalletAddress(walletAddressFromRedux));
    }
  }, [walletAddressFromRedux]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showProfile = userInfo && userInfo?.twitter_id && userInfo?.wallet;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isMobile && !drawerOpen && (
        <>
          {isCampaign ? (
            !showProfile && (
              <Box
                onClick={handleDrawerToggle}
                sx={{
                  position: "absolute",
                  right: "-8px",
                  top: "30px",
                  zIndex: 1100,
                }}
              >
                <Box
                  sx={{
                    border: "2px solid #201C18",
                    boxShadow: "2px 2px 0px 0px #201C18",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "5px",
                    padding: "13px 21px",
                    borderRadius: "15px 0px 0px 15px",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{ background: "#000000", width: "24px", height: "2px" }}
                  />
                  <Box
                    sx={{ background: "#000000", width: "24px", height: "2px" }}
                  />
                  <Box
                    sx={{ background: "#000000", width: "24px", height: "2px" }}
                  />
                </Box>
              </Box>
            )
          ) : (
            <Box
              onClick={handleDrawerToggle}
              sx={{
                position: "absolute",
                right: "-8px",
                top: "30px",
                zIndex: 1100,
              }}
            >
              <Box
                sx={{
                  border: "2px solid #201C18",
                  boxShadow: "2px 2px 0px 0px #201C18",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "5px",
                  padding: "13px 21px",
                  borderRadius: "15px 0px 0px 15px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{ background: "#000000", width: "24px", height: "2px" }}
                />
                <Box
                  sx={{ background: "#000000", width: "24px", height: "2px" }}
                />
                <Box
                  sx={{ background: "#000000", width: "24px", height: "2px" }}
                />
              </Box>
            </Box>
          )}
        </>
      )}

      {isMobile && (
        <StyledDrawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? drawerOpen : true}
          onClose={handleDrawerToggle}
          anchor="right"
          sx={{ position: "relative" }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              left: "-68px",

              top: "75px",
              zIndex: 1100,
            }}
          >
            <Box
              sx={{
                border: "2px solid #201C18",
                boxShadow: "2px 2px 0px 0px #201C18",
                backgroundColor: "#F5F5F5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: 0,
                flexDirection: "column",
                gap: "5px",
                padding: "13px 21px",
                borderRadius: "15px 0px 0px 15px",
                cursor: "pointer",
              }}
            >
              <Close />
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#F5F5F5",
              marginTop: "40px",
              borderRadius: "35px 0 0 35px",
              paddingLeft: "24px",
              paddingBottom: "10px",
              border: "3px solid #000000",
              display: { xs: "block", sm: "none" },
            }}
          >
            <NavButton hidden={false} />
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
                textAlign: "center",
              }}
            >
              <UnderlinedButton onClick={() => setOpen(true)}>
                HOW TO UGC
              </UnderlinedButton>
            </Box>
          </Box>
        </StyledDrawer>
      )}

      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Grid container display="flex" justifyContent="space-between">
            <Box
              sx={{
                mt: "12px",
                p: "8px",
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                position: "relative",
                height: "67px",
                overflow: "hidden",

                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Grid container alignItems="center">
                <Grid item>
                  <Link href="/">
                    <img alt="logo" src="./logo.png" width={100} height={50} />
                  </Link>
                </Grid>
                <Grid
                  sx={{ ml: "34px", display: { xs: "none", sm: "block" } }}
                  item
                >
                  <UnderlinedButton onClick={() => setOpen(true)}>
                    HOW TO UGC
                  </UnderlinedButton>
                </Grid>
              </Grid>
            </Box>
            {isCampaign &&
            userInfo &&
            userInfo?.twitter_id &&
            userInfo?.wallet ? (
              <Link href="/profile">
                <Box
                  sx={{
                    backdropFilter: "blur(10px)",
                    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5px)",
                    marginTop: "16px",
                    height: "fit-content",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  <img
                    src={
                      userInfo?.image_url
                        ? userInfo.image_url
                        : "./profile-icon.png"
                    }
                    alt="Profile Icon"
                    style={{ borderRadius: "16px" }}
                  />
                </Box>
              </Link>
            ) : (
              <NavButton hidden={true} />
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          zIndex: 100,
          "& .MuiBackdrop-root": {
            backgroundImage: "url(./modal-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3, // Adjust opacity as needed
          },
        }}
      >
        <Box sx={modalScrollStyle}>
          <Box display="flex" justifyContent="flex-end">
            <Box
              onClick={handleClose}
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                border: "2px solid #000000",
                padding: "4px",
                borderRadius: "10px",
              }}
            >
              <CloseIcon />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            style={{ marginBottom: "50px" }}
          >
            <CustomText text="HOW TO UGC.Fun" fontStroke="4px" />
          </Box>

          <Typography
            component="div"
            style={{
              fontFamily: "Garfiey",
              fontWeight: 400,
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            UGC.Fun is the meme economy where degens and creators come together.
            Here’s how you get started:
          </Typography>

          {/* Depositors Section */}
          <Typography
            component="div"
            style={{
              fontFamily: "Garfiey",
              fontWeight: 600,
              fontSize: "18px",
              marginBottom: "10px",
              color: "#000",
            }}
          >
            For Depositors:
          </Typography>
          <Typography
            component="div"
            style={{
              fontFamily: "Garfiey",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            <Box sx={{ marginBottom: "12px" }}>
              <span style={{ fontWeight: "bold" }}>1️⃣</span>{" "}
              <strong>Pool Your Token:</strong> Deposit your token into the
              reward pool.
            </Box>
            <Box sx={{ marginBottom: "12px" }}>
              <span style={{ fontWeight: "bold" }}>2️⃣</span>{" "}
              <strong>Power Content Creation:</strong> Let creators generate
              content for you with memes, posts, threads, and art.
            </Box>
            <Box sx={{ marginBottom: "12px" }}>
              <span style={{ fontWeight: "bold" }}>3️⃣</span>{" "}
              <strong>Boost Engagement:</strong> Watch as your token gets
              community-generated content and grows in visibility.
            </Box>
            <Box sx={{ marginBottom: "12px" }}>
              <span style={{ fontWeight: "bold" }}>4️⃣</span>{" "}
              <strong>Earn UGC XP:</strong> Collect XP and flex your
              contributions in the UGC ecosystem.
            </Box>
          </Typography>

          {/* Creators Section */}
          <Typography
            component="div"
            style={{
              fontFamily: "Garfiey",
              fontWeight: 600,
              fontSize: "18px",
              marginBottom: "10px",
              color: "#000",
            }}
          >
            For Creators:
          </Typography>
          <Typography
            component="div"
            style={{
              fontFamily: "Garfiey",
              fontSize: "16px",
            }}
          >
            <Box sx={{ marginBottom: "12px" }}>
              <span style={{ fontWeight: "bold" }}>1️⃣</span>{" "}
              <strong>Connect Wallet to Sign Up:</strong> Link your wallet and
              set up your profile—it’s quick and easy.
            </Box>
            <Box sx={{ marginBottom: "12px" }}>
              <span style={{ fontWeight: "bold" }}>2️⃣</span>{" "}
              <strong>Pick a Campaign:</strong> Connect your X. Find campaigns
              with your favorite tokens. Choose what inspires you to create.
            </Box>
            <Box sx={{ marginBottom: "12px" }}>
              <span style={{ fontWeight: "bold" }}>3️⃣</span>{" "}
              <strong>Create Bangers:</strong> Post memes, threads, art, or
              videos on X—remember to tag the ticker, kid.
            </Box>
            <Box sx={{ marginBottom: "12px" }}>
              <span style={{ fontWeight: "bold" }}>4️⃣</span>{" "}
              <strong>Get Paid Daily:</strong> Earn tokens every 24H for how
              well your content performs.
            </Box>
          </Typography>

          <Typography
            component="div"
            style={{
              fontFamily: "Garfiey",
              fontWeight: 400,
              fontSize: "16px",
              marginTop: "20px",
            }}
          >
            Pump your bags, build community, and support creators—all in one
            place!
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
