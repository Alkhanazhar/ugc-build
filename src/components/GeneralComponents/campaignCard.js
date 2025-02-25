import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useWebSocket } from "@/network/connection";
import {
  Typography,
  Grid,
  Box,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import {
  calculateTimeRemaining,
  formatNumber,
  truncateTextWithEllipsis,
} from "@/action/generalAction";
import { setCampaignDetail } from "@/redux/slice/campaignDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import CountdownTimer from "./countDownTimer";

export default function CampaignCard({ campaign }) {
  const dispatch = useDispatch();
  const [campaignStartUsd, setCampaignStartUsd] = useState(0);
  const [currentCampaignUsd, setCurrentCampaignUsd] = useState(0);
  const { sendCampaignDetailRequest } = useWebSocket();
  const isMobile = useMediaQuery("(max-width:600px)");
  const timeRemaining = calculateTimeRemaining(
    campaign["start_time"],
    campaign["end_time"]
  );
  let currentCampaignUsdValue;
  const campaignStartUsdValue = useSelector(
    (state) => state.campaigns?.campaignStartUsd || 0
  );

  useEffect(() => {
    setCampaignStartUsd(campaignStartUsdValue["campaign_start_usd"]);
    console.log(
      "campaign start usd value " + campaignStartUsdValue["campaign_start_usd"]
    );
    const pool = campaign["total_pool"];
    const goal = campaign["goal"];
    const ratio = campaignStartUsdValue["campaign_start_usd"] / (pool + goal);
    currentCampaignUsdValue = ratio * pool;
    setCurrentCampaignUsd(currentCampaignUsdValue.toFixed(2));
  }, [campaignStartUsdValue, campaign]);

  const handleSetTokenContractData = () => {
    dispatch(setCampaignDetail(null));
    const tokenContract = campaign["token_contract"];
    sessionStorage.setItem("token_contract", tokenContract);
  };
  return (
    <Card
      sx={{
        height: "254px",
        width: "100%",
        border: "2px solid black",
        boxShadow: "4px 4px 0px black",
        borderRadius: 5,
      }}
    >
      <CardContent
        sx={{
          padding: 0,
        }}
      >
        <Box
          style={{
            border: "2px solid black",
            borderRadius: 16,
            padding: "10px",
          }}
        >
          <Grid container>
            <Grid item>
              <img
                src={
                  campaign["image_url"] != ""
                    ? campaign["image_url"]
                    : "/pepefrog.jpg"
                }
                alt={campaign["name"]}
                style={{
                  height: "148px",
                  width: "132px",
                  border: "2px solid black",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid item style={{ marginLeft: "10px", fontSize: "16px" }}>
              <Grid
                container
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Grid item>
                  <Typography component="div" sx={{ fontFamily: "Skrapbook" }}>
                    {campaign["status"]}
                  </Typography>
                </Grid>
                <Grid item>
                  <Box
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor:
                        campaign["status"] == "LIVE" ? "#43E522" : "red",
                      borderRadius: "50%",
                      border: "2px solid black",
                      marginLeft: "4px",
                    }}
                  ></Box>
                </Grid>
                {campaign["end_time"] !== 0 ? (
                  <CountdownTimer
                    epochStartTime={campaign["start_time"]}
                    epochEndTime={campaign["end_time"]}
                  />
                ) : null}
              </Grid>
              <Box
                display="flex"
                flexDirection="column"
                position="relative"
                sx={{ mt: 1 }}
              >
                <Typography
                  component="div"
                  sx={{
                    fontFamily: "To Japan",
                    color: "#FFFFFF",
                    position: "relative",
                    fontSize: { xs: "13px", sm: "16px" },
                    WebkitTextStroke: "1px #000000",
                    textShadow:
                      "1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
                  }}
                >
                  {truncateTextWithEllipsis(campaign["name"], 17)}
                </Typography>
              </Box>

              <Box display="flex" flexDirection="column" position="relative">
                <Typography
                  component="div"
                  sx={{
                    fontFamily: "Skrapbook",
                    fontSize: "16px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    textShadow:
                      "1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
                    // WebkitTextStroke: "1px #000000",
                    color: "#BAC841",
                  }}
                >
                  {`(${campaign["ticker"]})`}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography
                  component="div"
                  sx={{ fontFamily: "Skrapbook", fontSize: "12px" }}
                >
                  {campaign["description"]}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        {campaign["status"] === "LIVE" || campaign["status"] === "STARTING" ? (
          <Box
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                height: "48px",
                border: "2px solid black",
                padding: "8px",
                display: "flex",
                borderRadius: "15px",
                alignItems: "center",
                // width: "76px",
              }}
            >
              <img src="./participant.png" style={{ height: "22px" }} />
              <Typography
                component="div"
                style={{
                  fontFamily: "Skrapbook",
                  marginLeft: "4px",
                  fontSize: "20px",
                }}
              >
                {formatNumber(campaign["participants"])}
              </Typography>
            </Box>
            <Box
              style={{
                height: "48px",
                border: "2px solid black",
                marginLeft: "8px",
                borderRadius: "15px",
                minWidth: "80px",
              }}
            >
              <Box
                style={{
                  backgroundColor: "#BAC841",
                  border: "2px solid white",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "15px",
                  padding: "6px 8px",
                }}
              >
                <Typography
                  component="div"
                  style={{
                    fontFamily: "Skrapbook",
                    fontSize: isMobile ? "13.5px" : "20px",
                  }}
                >
                  {`$${Number(
                    campaign.usd_price * campaign.total_pool
                  )?.toFixed(2)} USD`}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{ borderRadius: 4 }}
            style={{ border: "2px solid black", width: "100%" }}
          >
            <Box sx={{ position: "relative", width: "100%" }}>
              <LinearProgress
                variant="determinate"
                value={(currentCampaignUsd / campaignStartUsd) * 100}
                sx={{
                  height: 44,
                  borderRadius: 4,
                  backgroundColor: "white",
                  border: "2px solid white",
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
                      fontFamily: "To Japan",

                      fontSize: isMobile ? "10px" : "12px",
                      color: "transparent",
                      WebkitTextStroke: "4px #000000",
                    }}
                  >
                    ${currentCampaignUsd}/${campaignStartUsd}
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "To Japan",

                      fontSize: isMobile ? "10px" : "12px",
                      color: "#FFFFFF",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  >
                    ${currentCampaignUsd}/${campaignStartUsd}
                  </Typography>
                </Box>
              </Typography>
            </Box>
          </Box>
        )}
        <Link
          href={{
            pathname: "/campaign",
            query: {
              token_contract: campaign.token_contract,
            },
          }}
          passHref
        >
          <Button
            size="small"
            onClick={handleSetTokenContractData}
            sx={{
              width: "160px",
              height: "48px",
              border: "2px solid black",

              backgroundColor: "#B74AFF",
              borderRadius: 4,
              color: "white",
            }}
          >
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
              <Box display="flex" flexDirection="column" position="relative">
                <Box position="relative" display="inline-block">
                  {/* Stroke */}
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "Skrapbook",
                      fontSize: "20px",
                      color: "transparent",
                      WebkitTextStroke: "4px #000000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {campaign["status"] == "LIVE" ? "CREATE" : "POOL IN"}
                  </Typography>

                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "Skrapbook",
                      fontSize: "20px",
                      color: "#FFFFFF",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {campaign["status"] == "LIVE" ? "CREATE" : "POOL IN"}
                  </Typography>
                </Box>
              </Box>
            </Typography>
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
