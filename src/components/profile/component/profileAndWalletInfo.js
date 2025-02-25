/* eslint-disable @next/next/no-img-element */
"use client";

import { truncateWalletAddress } from "@/action/generalAction";
import {
  Alert,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function ProfileAndWalletInfo({ walletAddress }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userInfo } = useSelector((state) => state.profile);
  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        backgroundColor: "#F5F5F5",
        border: "2px solid #000000",
        padding: "10px 20px",
        borderRadius: { xs: "25px", sm: "35px" },
        boxShadow: "2px 2px 0px black",
        width: "100%",
      }}
    >
      <Grid item display="flex" alignItems="center">
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                fontSize: "10px",
                fontWeight: 400,
              }}
            >
              view on (metamask)
            </Typography>
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                fontWeight: 400,
                fontSize: "16px",
                marginRight: "12px",
                display: { xs: "block", sm: "none" },
              }}
            >
              {userInfo?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              border: "2px solid #000000",
              padding: "10px",
              borderRadius: { sm: "25px", xs: "10px" },
              padding: "10px",
              marginTop: "4px",
            }}
          >
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                fontSize: { xs: "14px", sm: "20px" },
              }}
            >
              {isMobile ? truncateWalletAddress(walletAddress) : walletAddress}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center">
          <Typography
            component="div"
            sx={{
              fontFamily: "Skrapbook",
              fontWeight: 400,
              fontSize: "24px",
              marginRight: "24px",
              display: { xs: "none", sm: "block" },
            }}
          >
            {userInfo?.name}
          </Typography>
          <img
            src={
              userInfo?.image_url ? userInfo.image_url : "./profile-icon.png"
            }
            alt="Profile Icon"
            style={{borderRadius: "16px"}}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
