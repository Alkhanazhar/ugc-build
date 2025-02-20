import * as React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ProfileAndWalletInfo from "./component/profileAndWalletInfo";
import ReferralButton from "./component/referralButton";
import EarningsClaimTable from "./component/earningsClaimTable";
import AboutClaim from "./component/aboutClaim";
import UGC from "./component/ugc";
import NavButton from "./component/nav-button";

export default function ClaimContent({ onClick, walletAddress }) {
  return (
    <Box sx={{ marginBottom: { xs: 6, sm: 0 } }}>
      <UGC />
      <NavButton onClick={onClick} />
      <Box
        sx={{
          paddingLeft: { xs: "52px", sm: "0" },
          paddingTop: { xs: "44px", sm: 0 },
        }}
      >
        <ReferralButton />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", sm: "flex-end" },
        }}
      >
        <Typography
          component="div"
          style={{ fontFamily: "Skrapbook", fontSize: "28px" }}
        >
          Claim
        </Typography>
      </Box>
      <ProfileAndWalletInfo walletAddress={walletAddress} />
      <AboutClaim />
      <EarningsClaimTable />
    </Box>
  );
}
