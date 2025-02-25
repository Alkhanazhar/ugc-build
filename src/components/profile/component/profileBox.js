"use client";

/* eslint-disable @next/next/no-img-element */
import { truncateWalletAddress } from "@/action/generalAction";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
export default function ProfileBox({ walletAddress }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userInfo } = useSelector((state) => state.profile);
  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        border: "2px solid #000000",
        borderRadius: "35px",
        padding: "10px",
        boxShadow: "4px 4px 0px black",
        marginTop: "20px",
      }}
    >
      <Grid container>
        <Grid item>
          <Box>
            <img
              height={196}
              width={196}
              src={
                userInfo?.image_url ? userInfo.image_url : "./profile-icon.png"
              }
              alt="Profile Icon"
              style={{ borderRadius: "16px" }}
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              marginLeft: "20px",
            }}
          >
            <Typography
              component="div"
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                fontFamily: "Skrapbook",
              }}
            >
              {userInfo?.name}
            </Typography>
            <Box>
              <Box sx={{ width: "100%" }}>
                <Typography
                  component="div"
                  sx={{
                    fontFamily: "Skrapbook",
                    fontSize: "10px",
                    fontWeight: 400,
                    marginBottom: "8px",
                  }}
                >
                  View on Abstract Explorer
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    border: "2px solid #000000",
                    padding: "10px",
                    borderRadius: "25px",
                    marginTop: "4px",
                    width: "100%",
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "Skrapbook",
                      fontSize: "20px",
                      wordWrap: "break-word",
                    }}
                  >
                    {isMobile
                      ? truncateWalletAddress(walletAddress)
                      : walletAddress}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
