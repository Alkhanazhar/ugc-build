import * as React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ReferralsUsedTable from "./referralsUsedTable";
import { useGetAuthToken } from "@/action/authAction";

const pointsBoxStyle = {
  backgroundColor: "#F5F5F5",
  border: "2px solid #000000",
  borderRadius: "25px",
  padding: "12px",
  boxShadow: "2px 2px 0px black",
};
export default function ReferralInfo() {
  React.useEffect(() => {}, []);
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={4}>
        <Box style={pointsBoxStyle}>
          <Grid container display="flex" justifyContent="space-between">
            <Grid item xs={8}>
              <Box
                style={{
                  height: "188px",
                  width: "94%",
                  border: "2px solid #000000",
                  borderRadius: "15px",
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography
                  component="div"
                  style={{
                    padding: "12px",
                    fontFamily: "Skrapbook",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Referrals Rewards
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                height: "188px",
                width: "100%",
                border: "2px solid #000000",
                borderRadius: "15px",
                backgroundColor: "#ffffff",
              }}
            >
              <Box>
                <Typography
                  component="div"
                  style={{
                    padding: "12px",
                    fontFamily: "Skrapbook",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Referrals
                </Typography>
              </Box>
              <Box
                style={{
                  padding: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="div"
                  style={{
                    fontFamily: "Skrapbook",
                    fontSize: "40px",
                  }}
                >
                  10K
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid conatiner display="flex" sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button
                style={{
                  border: "2px solid #000000",
                  fontFamily: "Skrapbook",
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  width: "96%",
                  color: "#000000",
                  padding: "6px !important",
                }}
              >
                Connect Telegram
              </Button>
            </Grid>
            <Grid item display="flex" justifyContent="flex-end" xs={6}>
              <Button
                style={{
                  border: "2px solid #000000",
                  fontFamily: "Skrapbook",
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  width: "96%",
                  color: "#000000",
                  padding: "6px !important",
                }}
              >
                Connect X
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              style={{
                border: "2px solid #000000",
                fontFamily: "Skrapbook",
                backgroundColor: "#201C18",
                borderRadius: "15px",
                width: "100%",
                color: "#ffffff",
                padding: "6px !important",
              }}
            >
              Host On Your Telegram Server
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box>
          <Typography
            component="div"
            style={{ fontFamily: "Skrapbook", fontSize: "20px" }}
          >
            Referrals Used:{" "}
          </Typography>
          <ReferralsUsedTable />
        </Box>
      </Grid>
    </Grid>
  );
}
