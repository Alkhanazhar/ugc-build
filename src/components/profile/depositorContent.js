import { Box, Typography } from "@mui/material";
import AboutDepositors from "./component/aboutDepositors";
import NavButton from "./component/nav-button";
import ProfileAndWalletInfo from "./component/profileAndWalletInfo";
import ReferralButton from "./component/referralButton";
import UGC from "./component/ugc";
import EarningsDepositorTable from "./depositorsEarningTable";

export default function DepositorContent({ onClick, walletAddress }) {
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
          Depositors
        </Typography>
      </Box>
      <ProfileAndWalletInfo walletAddress={walletAddress} />
      <AboutDepositors />
      <EarningsDepositorTable />
    </Box>
  );
}
