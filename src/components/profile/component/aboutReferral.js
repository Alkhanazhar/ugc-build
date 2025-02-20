import * as React from "react";
import { Typography, Grid, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const pointsBoxStyle = {
  backgroundColor: "#F5F5F5",
  border: "2px solid #000000",
  borderRadius: "25px",
  padding: "20px",
  boxShadow: "2px 2px 0px black",
  marginTop: "20px",
  alignItems: "center",
};
export default function AboutReferral() {
  return (
    <Grid sx={pointsBoxStyle} container>
      <Grid item xs={5.5}>
        <Typography
          component="div"
          style={{
            height: "96px",
            textAlign: "center",
            alignItems: "center",
            padding: "12px",
            fontFamily: "Skrapbook",
            display: "flex",
            justifyContent: "center",
            border: "2px solid black",
            borderRadius: "20px",
            backgroundColor: "#ffffff",
          }}
        >
          Refer more friends to earn even more points
        </Typography>
      </Grid>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        item
        xs={1}
      >
        <ArrowForwardIcon style={{ width: "120px" }} />
      </Grid>
      <Grid item xs={5.5}>
        <Typography
          component="div"
          style={{
            padding: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid black",
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            height: "96px",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "16px" },
              fontFamily: "Skrapbook",
            }}
          >
            Each referral gives you joining bonus on eachcampaign they partipate
            in!!
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}
