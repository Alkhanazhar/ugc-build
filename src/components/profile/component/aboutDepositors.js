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
        fontFamily: "Garfiey",
        fontSize: { xs: "9px", sm: "16px" },
      }}
    >
      {text}
    </Typography>
  </Box>
);

export default function AboutDepositors() {
  const steps = [
    "Refer more friends to earn even more points",
    "Each referral gives you joining bonus on each campaign they participate in!!",
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
      </Box>
    </Box>
  );
}
