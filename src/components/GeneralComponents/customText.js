import * as React from "react";
import { Typography, Box } from "@mui/material";
export default function CustomText({
  text,
  subText = "",
  textColor = "#ffffff",
  subTextColor = "#ffffff",
  fontFamily = "To Japan",
  fontStroke = "10px",
  fontSize,
}) {
  return (
    <Box position="relative" display="inline-block">
      <Typography
        component="div"
        sx={{
          fontFamily: fontFamily,
          fontSize: fontSize,
          fontWeight: "bold",
          whiteSpace: "nowrap",
          textShadow:
            "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -1px 1px #000",
          // WebkitTextStroke: "1px #000000",
          color: "#ffffff",
        }}
      >
        {text} <span style={{ color: subTextColor }}>{subText}</span>
      </Typography>
    </Box>
  );
}
