import React from "react";
import { Box, Button, Grid, Typography, Modal } from "@mui/material";

export default function Popup({ message, subMessage, onClick, buttonText }) {
  return (
    <Box
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        zIndex: 1000,
      }}
    >
      <Box
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "520px",
          textAlign: "center",
          border: "2px solid #000000",
          boxShadow: "2px 2px 0px black",
        }}
      >
        <Typography
          style={{
            marginBottom: "20px",
            marginTop: "20px",
            fontFamily: "Skrapbook",
          }}
        >
          {message}
        </Typography>
        <Typography style={{ marginBottom: "20px", fontFamily: "Skrapbook" }}>
          {subMessage}
        </Typography>
        <Button
          onClick={onClick()}
          style={{
            backgroundColor: "#DCEC55",
            color: "#000000",
            padding: "10px 20px",
            borderRadius: "15px",
            border: "2px solid black",
            fontFamily: "Skrapbook",
            width: "280px",
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}
