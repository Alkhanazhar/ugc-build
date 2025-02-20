import * as React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useGetAuthToken } from "@/action/authAction";
import { useSelector } from "react-redux";

export default function ConnectedAccountStatus() {
  const commonStyles = {
    border: "2px solid #000000",
    padding: "10px 20px",
    borderRadius: { xs: "25px", sm: "35px" },
    boxShadow: "2px 2px 0px black",
    height: { xs: "80px", sm: "100px" },
    flex: 1,
    minWidth: { xs: "36%", sm: "210px" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const { handleOpenTwitterConnectWindow } = useGetAuthToken();
  const isTwitterConnected = useSelector(
    (state) => state.profile.userInfo.twitter_id
  );
  console.log(isTwitterConnected, "twitter");

  return (
    <Box sx={{ mt: 2, overflowX: "auto" }}>
      <Grid
        container
        spacing={2}
        sx={{
          flexWrap: "nowrap",
          minWidth: "min-content",
          pb: 1,
        }}
      >
        <Grid item>
          <Box
            sx={{
              ...commonStyles,
              backgroundColor: "#F5F5F5",
            }}
          >
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                fontSize: { xs: "14px", sm: "24px" },
                whiteSpace: "nowrap",
              }}
            >
              Connected
            </Typography>
            <img src="./wallet.png" alt="Wallet" width={24} />
          </Box>
        </Grid>

        <Grid item>
          <Box
            sx={{
              ...commonStyles,
              backgroundColor: "#DCEC55",
            }}
          >
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                fontSize: { xs: "14px", sm: "24px" },
                whiteSpace: "nowrap",
              }}
            >
              Connect
            </Typography>
            <img src="./telegram.png" alt="Telegram" height={24} />
          </Box>
        </Grid>

        <Grid item>
          <Box
            onClick={() => {
              if (!isTwitterConnected) {
                handleOpenTwitterConnectWindow();
              } else {
                console.log("Already connected");
              }
            }}
            sx={{
              ...commonStyles,
              backgroundColor: isTwitterConnected ? "#F5F5F5" : "#DCEC55",
              cursor: "pointer",
            }}
          >
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                fontSize: { xs: "14px", sm: "24px" },
                whiteSpace: "nowrap",
              }}
            >
              {isTwitterConnected ? "Connected" : "Connect"}
            </Typography>
            <img src="./twitter.png" alt="Twitter" width={24} height={24} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
