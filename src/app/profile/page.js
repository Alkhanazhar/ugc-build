"use client";
import ClaimContent from "@/components/profile/claimContent";
import DepositorContent from "@/components/profile/depositorContent";
import ProfileContent from "@/components/profile/profileContent";
import RewardsContent from "@/components/profile/rewardsContent";
import { useWebSocket } from "@/network/connection";
import { setAuthToken, setWallet } from "@/redux/slice/walletSlice";
import { Box, Drawer, Grid, List, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { height, styled } from "@mui/system";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";

const drawerWidth = 272;

// Styled components
const AppContainer = styled("div")({
  display: "flex",
  backgroundColor: "#FFF2C9",
  minHeight: "100vh",
});

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    boxShadow: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
}));

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const menuItems = [
  { id: "REWARDS", label: "Rewards", component: <RewardsContent /> },
  { id: "DEPOSITORS", label: "Depositors", component: <DepositorContent /> },
  { id: "CLAIM", label: "Claim", component: <ClaimContent /> },
  { id: "PROFILE", label: "Profile", component: <ProfileContent /> },
];

const FixedSidebar = () => {
  const [selectedTab, setSelectedTab] = useState("REWARDS");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const walletAddressFromRedux = useSelector((state) => state.wallet.wallet);
  const [walletAddress, setWalletAddress] = React.useState("CONNECT WALLET");
  const { sendMyRewardsRequest } = useWebSocket();
  const { login, logout } = useLoginWithAbstract();

  const renderContent = () => {
    const selectedItem = menuItems.find((item) => item.id === selectedTab);
    return selectedItem?.component ? (
      React.cloneElement(selectedItem.component, {
        onClick: () => setDrawerOpen(!drawerOpen),
        walletAddress,
      })
    ) : (
      <RewardsContent
        onClick={() => setDrawerOpen(!drawerOpen)}
        walletAddress={walletAddress}
      />
    );
  };

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storedWallet = localStorage.getItem("wallet");
    const storedAuthToken = localStorage.getItem("authToken");
    // const tokenExpiration = localStorage.getItem("tokenExpiration"); // Assuming you store this

    if (storedWallet && storedAuthToken) {
      dispatch(setWallet(storedWallet)); // Update Redux state
      setWalletAddress(storedWallet);
      dispatch(setAuthToken(storedAuthToken)); // Update Redux state
      // sendMyRewardsRequest();
      return;
    }
  }, [walletAddressFromRedux]);
  React.useEffect(() => {
    if (walletAddressFromRedux) {
      setWalletAddress(walletAddressFromRedux);
    }
  }, [walletAddressFromRedux]);

  return (
    <AppContainer>
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen || !isMobile}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
      >
        <Box
          sx={{
            height: "100%",
            padding: "10px",
            mt: 0,
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              flex: 1,
            }}
            sx={{
              mb: 6,
            }}
          >
            <Box
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
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)",
                width: "115px",
                height: "65px",
                marginRight: "20px",
              }}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Grid container display="flex" alignItems="center">
                <Grid item>
                  <Link href="/">
                    <img alt="logo" src="./logo.png" width={100} height={50} />
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "#FFE89C",
              height: "84vh",
              borderRadius: "35px",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <List
              sx={{
                border: "2px solid #000000",
                backgroundColor: "#F5F5F5",
                borderRadius: "35px",
                padding: "10px",
              }}
            >
              {menuItems.map((item) => (
                <Typography
                  component="div"
                  key={item.id}
                  button="true"
                  display="flex"
                  alignItems="center"
                  onClick={() => {
                    setSelectedTab(item.id);
                    setDrawerOpen(false);
                  }}
                  sx={{
                    border: "2px solid #000000",
                    borderRadius: "25px",
                    height: "70px",
                    marginY: "5px",
                    fontFamily: "Skrapbook",
                    fontSize: "20px",
                    fontWight: 400,
                    fontFamily: "Skrapbook",
                    padding: "16px",
                    backgroundColor:
                      selectedTab === item.id ? "#DCEC55" : "#ffffff",
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </List>
            <Grid
              display="flex"
              style={{ padding: "20px", cursor: "pointer" }}
              onClick={() => {
                // Clear wallet and authentication token from local storage
                localStorage.removeItem("wallet");
                localStorage.removeItem("authToken");

                // Reset Redux state for wallet and auth token
                dispatch(setWallet(null));
                dispatch(setAuthToken(null));

                // Redirect to the landing page
                window.location.href = "/";
              }}
            >
              <img src="./logout.png" alt="Logout" />
              <Typography
                component="div"
                style={{
                  fontFamily: "Skrapbook",
                  fontSize: "20px",
                  marginLeft: "8px",
                }}
              >
                Logout
              </Typography>
            </Grid>
          </Box>
        </Box>
      </StyledDrawer>
      <Content
        style={{
          backgroundColor: "#FFF2C9",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {renderContent()}
      </Content>
    </AppContainer>
  );
};

export default FixedSidebar;
