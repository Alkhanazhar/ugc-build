import React from "react";
import { Box, Typography, Grid, Step } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StepBox = ({ text }) => (
  <Box
    sx={{
      height: { xs: "57px", sm: "96px" },
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: { xs: "4px", sm: "12px" },
      border: "2px solid black",
      borderRadius: { xs: "12px", sm: "20px" },
      backgroundColor: "#ffffff",
      flex: 1,
    }}
  >
    <Typography
      component="div"
      variant="body1"
      sx={{
        fontWeight: "bold",
        fontFamily: "Skrapbook",
        fontSize: { xs: "9px", sm: "16px" },
      }}
    >
      {text}
    </Typography>
  </Box>
);

export default function AboutClaim() {
  const steps = [
    "Join Campaign",
    "Post on X with $Ticker Name",
    "Earn Rewards",
    "Claim Tokens!",
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        border: "2px solid #000000",
        borderRadius: { xs: "25px", sm: "35px" },
        padding: "16px",
        boxShadow: "4px 4px 0px black",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <StepBox text={steps[0]} />
        <Box item display="flex" justifyContent="center">
          <ArrowForwardIcon />
        </Box>
        <StepBox text={steps[1]} />
        <Box item display="flex" justifyContent="center">
          <ArrowForwardIcon />
        </Box>
        <StepBox text={steps[2]} />
        <Box item display="flex" justifyContent="center">
          <ArrowForwardIcon />
        </Box>
        <StepBox text={steps[3]} />
      </Box>
    </Box>
  );
}
