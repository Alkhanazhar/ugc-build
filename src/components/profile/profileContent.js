import { Box, Typography } from "@mui/material";
import ConnectedAccountStatus from "./component/connectedAccountStatus";
import PointsGraph from "./component/pointsGraph";
import ProfileAndWalletInfo from "./component/profileAndWalletInfo";
import ProfileBox from "./component/profileBox";
import ReferralButton from "./component/referralButton";
import UGC from "./component/ugc";
import NavButton from "./component/nav-button";

export default function ProfileContent({ onClick, walletAddress }) {
  return (
    <Box>
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
          Profile
        </Typography>
      </Box>
      <ProfileAndWalletInfo walletAddress={walletAddress} />
      <ConnectedAccountStatus />
      <Box sx={{ mt: 2 }}>
        <Typography
          component="div"
          style={{ fontFamily: "Skrapbook", fontSize: "28px" }}
        >
          Earned UGC XP
        </Typography>
        <PointsGraph />
      </Box>
    </Box>
  );
}
