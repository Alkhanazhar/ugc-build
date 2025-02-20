import * as React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import Link from "next/link";

export default function CreateAndProfileButton() {
  return (
    <Grid
      container
      sx={{
        mt: 2,
        flexDirection: { xs: "column-reverse", sm: "row" },
        gap: { xs: "18px", sm: "0" },
      }}
    >
      <Grid item display="flex" justifyContent="center" xs={12} sm={9}>
        <Box
          style={{
            backgroundColor: "#F5F5F5",
            border: "2px solid #000000",
            borderRadius: "35px",
            padding: "12px",
            boxShadow: "2px 2px 0px black",
          }}
          sx={{ width: { xs: "100%", sm: "98%" } }}
        >
          <Grid
            container
            spacing={2}
            sx={{ height: { xs: "50%", sm: "100%" } }}
          >
            <Grid item xs={12} sm={6} style={{ height: "100%" }}>
              <Box
                style={{
                  border: "2px solid #000000",
                  width: "100%",
                  height: "100px",
                  borderRadius: "25px",
                  padding: "14px",
                  marginBottom:"20px",
                }}
              >
                <Typography
                  component="div"
                  style={{
                    ffontFamily: "Garfiey",
                    fontSize: "16px",
                    display: "flex",
                    marginBottom:"20px",
                    textAlign: "center",
                  }}
                >
                  Create a Reward Pool {'>'} Pool Tokens {'>'} <br />  Get Rewarded with UGC XP
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link href="/form">
                <Button
                  style={{
                    border: "2px solid #000000",
                    width: "100%",
                    height: "100px",
                    borderRadius: "25px",
                    padding: "12px",
                    backgroundColor: "#B74AFF",
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "Skrapbook",
                      fontSize: "30px",

                      color: "#ffffff",
                    }}
                  >
                    Create Campaign
                  </Typography>
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
