"use client";
import * as React from "react";
import { useState } from "react";
import { Box, Typography, Grid, Button, Modal } from "@mui/material";
import Link from "next/link";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ProfileAndWalletInfo from "./profileAndWalletInfo";
import html2canvas from "html2canvas";
import ReferralButton from "./referralButton";
import { useSelector } from "react-redux";

const pointsBoxStyle = {
  height: "240px",
  width: { xs: "100%", sm: "94%" },
  backgroundColor: "#FFFFFF",
  border: "2px solid #000000",
  borderRadius: "25px",
  padding: "20px",
  boxShadow: "2px 2px 0px black",
};

const bodyStyle = {
  fontFamily: "To Japan",
  fontSize: "60px",
  fontWeight: 400,
};

const ModalContent = ({ walletAddress }) => {
  const modalStyle = {
    height: "240px",
    width: { xs: "100%", sm: "94%" },
    backgroundColor: "#FFFFFF",
    border: "2px solid #000000",
    borderRadius: "25px",
    padding: "20px",
    boxShadow: "2px 2px 0px black",
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography
        sx={{
          fontFamily: "Skrapbook",
          fontSize: "24px",
          textAlign: "center",
          color: "#201C18",
          marginBottom: "16px",
        }}
      >
        The Meme Mafia grows everyday. Add your homies. <br /> We must pump our
        bags together.
      </Typography>

      <ProfileAndWalletInfo walletAddress={walletAddress} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: "24px", sm: "12px" },
        }}
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              border: "2px solid #201C18",
              borderRadius: "16px",
              width: "100%",
              py: "6px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Garfiey",
                fontSize: "16px",
                textAlign: "center",
                color: "#201C18",
              }}
            >
              UGC XP
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "75%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Garfiey",
                fontSize: "36px",
                textAlign: "center",
                color: "#201C18",
              }}
            >
              33,020,110
            </Typography>
          </Box>
        </Box>
        <Box sx={modalStyle}>
          <Box
            sx={{
              border: "2px solid #201C18",
              borderRadius: "16px",
              width: "100%",
              py: "6px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Garfiey",
                fontSize: "16px",
                textAlign: "center",
                color: "#201C18",
              }}
            >
              Total Campaign Points
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "75%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Garfiey",
                fontSize: "36px",
                textAlign: "center",
                color: "#201C18",
              }}
            >
              23,320,650
            </Typography>
          </Box>
        </Box>
        <Box sx={modalStyle}>
          <Box
            sx={{
              border: "2px solid #201C18",
              borderRadius: "16px",
              width: "100%",
              py: "6px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Garfiey",
                fontSize: "16px",
                textAlign: "center",
                color: "#201C18",
              }}
            >
              Total Campaign Points
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "75%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Garfiey",
                fontSize: "36px",
                textAlign: "center",
                color: "#201C18",
              }}
            >
              2240
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default function RewardsPoints({ walletAddress }) {
  const [referralModalOpen, setReferralModalOpen] = useState(false);

  const handleOpenReferralModal = () => {
    setReferralModalOpen(true);
  };

  const handleCloseReferralModal = () => {
    setReferralModalOpen(false);
  };

  const referralCount = useSelector((state) => state.profile.referralCount);
  const myUgcXp = useSelector((state) => state.profile.myUgcXp);

  return (
    <>
      <Grid
        container
        sx={{
          mt: { xs: "18px", sm: "10px" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "18px", sm: "0px" },
        }}
      >
        <Grid
          item
          xs={12}
          sm={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box sx={pointsBoxStyle}>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Typography component="div" style={{ fontFamily: "Skrapbook" }}>
                  Total UGC XP
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  transform: "translate(0%, -12%)",
                }}
              >
                <Typography component="div" style={bodyStyle}>
                  {myUgcXp}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ...pointsBoxStyle }}>
              <Box sx={{ filter: "blur(4px)", height: "100%" }}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    component="div"
                    style={{ fontFamily: "Skrapbook" }}
                  >
                    Total Abs XP
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    transform: "translate(0%, -12%)",
                  }}
                >
                  <Typography component="div" style={bodyStyle}>
                    XXX
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
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
                  }}
                >
                  <Typography
                    component="div"
                    style={{
                      fontFamily: "Skrapbook",
                      fontSize: "16px",
                      display: "flex",
                      textAlign: "center",
                    }}
                  >
                    Create a Reward Pool {">"} Pool Tokens {">"} Get Rewarded
                    with UGC XP
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
        <Grid
          item
          display="flex"
          xs={12}
          sm={3}
          sx={{
            width: { xs: "100%", sm: "220px" },
            maxWidth: { xs: "100%", sm: "25%" },
            paddingLeft: { xs: "0px", sm: "20px" },
          }}
        >
          <Box sx={{ ...pointsBoxStyle, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                border: "2px solid #000000",
                backgroundColor: "white",
                borderRadius: "15px",
                flex: 1,
                height: "70%",
                padding: "16px",
              }}
            >
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Typography component="div" style={{ fontFamily: "Skrapbook" }}>
                  Total Referrals
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  height: "100%",
                }}
              >
                <Typography component="div" style={bodyStyle}>
                  {referralCount}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <ReferralButton walletAddress={walletAddress} small />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Referral Modal */}
      <Modal
        open={referralModalOpen}
        onClose={handleCloseReferralModal}
        aria-labelledby="referral-modal-title"
        aria-describedby="referral-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // width: {sm: 800, xs: "300px"},
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: "25px",
            p: 4,
            backgroundColor: "#F5F5F5",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "transparent",
              position: "relative",
              padding: "16px",
              borderRadius: "25px",
            }}
          >
            <ModalContent walletAddress="your-wallet-address-here" />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
