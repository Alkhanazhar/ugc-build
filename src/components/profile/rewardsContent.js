import { Box, Typography } from "@mui/material";
import CreateAndProfileButton from "./component/createAndProfileButton";
import ProfileAndWalletInfo from "./component/profileAndWalletInfo";
import ReferralButton from "./component/referralButton";
import RewardsEarningTable from "./component/rewardsEarningTable";
import RewardsPoints from "./component/rewardsPoints";
import UGC from "./component/ugc";
import NavButton from "./component/nav-button";

export default function RewardsContent({ onClick, walletAddress }) {
  return (
    <Box sx={{ gap: 0, marginBottom: { xs: 6, sm: 0 } }}>
      <UGC />
      <NavButton onClick={onClick} />
      <Box
        sx={{
          paddingLeft: { xs: "52px", sm: "0" },
          paddingTop: { xs: "44px", sm: 0 },
        }}
      >
        <ReferralButton walletAddress={walletAddress} />
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
          Rewards
        </Typography>
      </Box>
      <ProfileAndWalletInfo walletAddress={walletAddress} />
      <RewardsPoints walletAddress={walletAddress} />
      {/* <CreateAndProfileButton /> */}
      <RewardsEarningTable />
    </Box>
  );
}
