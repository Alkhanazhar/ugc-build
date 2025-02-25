import { Box } from "@mui/material";
import React from "react";

const NavButton = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        left: "-8px",
        top: "80px",
        display: { xs: "block", sm: "none" },
      }}
    >
      <Box
        sx={{
          border: "2px solid #201C18",
          boxShadow: "2px 2px 0px 0px #201C18",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "5px",
          padding: "13px 21px",
          borderRadius: "0 15px 15px 0",
        }}
      >
        <Box sx={{ background: "#000000", width: "24px", height: "2px" }} />
        <Box sx={{ background: "#000000", width: "24px", height: "2px" }} />
        <Box sx={{ background: "#000000", width: "24px", height: "2px" }} />
      </Box>
    </Box>
  );
};

export default NavButton;
