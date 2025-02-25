import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const UGC = () => {
  return (
    <Box sx={{ position: "absolute", left: "-20px", top: "-20px", zIndex: 10 }}>
      <Box
        style={{
          marginTop: "10px",
          padding: "8px",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.1)",
          width: "144px",
          marginRight: "20px",
        }}
        sx={{ display: { xs: "block", sm: "none", scale: 0.6 } }}
      >
        <Grid container display="flex" alignItems="center">
          <Grid item>
            <Link href="/">
              <img alt="logo" src="./logo.png" width={100} height={50} />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UGC;
