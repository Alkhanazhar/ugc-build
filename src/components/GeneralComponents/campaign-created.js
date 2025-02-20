"use client";

import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const CustomLoader = () => {
  return (
    <Box style={overlayStyles}>
      {/* Display your GIF as the preloader */}
      <img
        src="/campaign-created.png"
        alt="Loading"
        style={{ width: "300px", height: "auto" }}
      />
      <Typography
        variant="h4"
        sx={{
          color: "white",
          fontFamily: "Skrapbook",
          WebkitTextStroke: "1px #000000",
          textShadow:
            "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -2px 2px #000",
          textAlign: "center",
        }}
      >
        CAMPAIGN CREATED
      </Typography>
    </Box>
  );
};

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: "url(/form-background.png)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1300,
};

export default function App() {
  return <CustomLoader />;
}
