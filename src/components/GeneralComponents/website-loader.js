"use client";

import React from "react";
import Box from "@mui/material/Box";

export const WebsiteLoader = () => {
  return (
    <Box style={overlayStyles}>
      {/* Display your GIF as the preloader */}
      <img
        src="/loader.gif" // Ensure this path is correct for your uploaded GIF
        alt="Loading"
        style={{ width: "300px", height: "auto" }} // Adjust size as needed
      />
    </Box>
  );
};

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "#FFEDB3",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1300,
};

export default function App() {
  return <CustomLoader />;
}
