import * as React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Modal,
  Button,
  useMediaQuery,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ProfileAndWalletInfo from "./profileAndWalletInfo";
import html2canvas from "html2canvas";
import CustomText from "@/components/GeneralComponents/customText";
import { useSelector } from "react-redux";

const ModalContent = ({ walletAddress }) => {
  const modalStyle = {
    height: { sm: "240px", xs: "120px" },
    width: { xs: "100%", sm: "94%" },
    backgroundColor: "#FFFFFF",
    border: "2px solid #000000",
    borderRadius: "25px",
    padding: "20px",
    boxShadow: "2px 2px 0px black",
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <ProfileAndWalletInfo walletAddress={walletAddress} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { sm: "24px", xs: "12px" },
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

export default function ReferralButton({ walletAddress, small }) {
  const [open, setOpen] = useState(false);
  const componentRef = React.useRef(null);
  const { userInfo } = useSelector((state) => state.profile);
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openToast, setOpenToast] = useState(false);
  const handleCopyImage = async () => {
    if (componentRef.current) {
      // Apply the background styles to the componentRef element
      componentRef.current.style.backgroundImage = "url(./ugc-swirly.png)";
      componentRef.current.style.backgroundRepeat = "no-repeat";
      componentRef.current.style.backgroundSize = "cover";
      componentRef.current.style.backgroundPosition = "center";
      componentRef.current.style.position = "relative"; // Ensure the overlay works

      // Create a pseudo-element for the overlay
      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.mixBlendMode = "multiply";
      overlay.style.filter = "blur(4px)";
      overlay.style.zIndex = "-1";

      // Append the overlay to the componentRef element
      componentRef.current.appendChild(overlay);

      const canvas = await html2canvas(componentRef.current, {
        useCORS: true,
        scale: 2,
        logging: false,
        backgroundColor: null,
      });

      canvas.toBlob(async (blob) => {
        try {
          if (navigator.clipboard && navigator.clipboard.write) {
            const item = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([item]);
          } else {
            throw new Error("Clipboard API not supported");
          }
        } catch (error) {
          console.error("Failed to copy image to clipboard:", error);
        }
      }, "image/png");

      // Remove the overlay after capturing the image
      componentRef.current.removeChild(overlay);
    }
    setOpenToast(true);
    setTimeout(() => {
      setOpenToast(false);
    }, 2000);
  };

  const [openToast2, setOpenToast2] = useState(false);
  const handleCopyLink = () => {
    console.log("user info");
    const tweetText = `Join the movement using my referral code!\n\n👉 Add the image from your clipboard or grab it from your 'Downloads' folder and attach it to this tweet!\n Referral Link: http://ugc.fun/${
      userInfo?.referral_code ? userInfo?.referral_code : userInfo?.name
    }`;
    const twitterIntentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    navigator.clipboard.writeText(twitterIntentUrl);
    setOpenToast2(true);
    setTimeout(() => {
      setOpenToast2(false);
    }, 2000);
  };

  const handleShareOnTwitter = () => {
    const tweetText = `Join the movement using my referral code!\n\n👉 Add the image from your clipboard or grab it from your 'Downloads' folder and attach it to this tweet!\n Referral Link: http://ugc.fun/${
      userInfo?.referral_code ? userInfo?.referral_code : userInfo?.name
    }`;
    const twitterIntentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterIntentUrl, "_blank");
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        style={{
          border: "2px solid #000000",
          backgroundColor: "#FFFFFF",
          padding: "8px 6px",
          marginBottom: "20px",
          borderRadius: "25px",
          cursor: "pointer", // Add pointer cursor to indicate clickability
        }}
        sx={{ width: { xs: "294px", sm: small ? "fit-content" : "340px" } }}
      >
        <Box
          style={{
            display: "flex",
            backgroundColor: "#DCEC55",
            border: "2px solid #000000",
            padding: "8px 14px",
            borderRadius: "18px",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography component="div" style={{ fontFamily: "Skrapbook" }}>
            REFER TO EARN MORE UGC XP
          </Typography>
          <GroupAddIcon style={{ height: "30px", width: "30px" }} />
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiBackdrop-root": {
            backgroundImage: "url(./modal-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3, // Adjust opacity as needed
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "360px", sm: "800px" },
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: "25px",
            p: 4,
            backgroundColor: "#F5F5F5",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#FFFFFF", // Example color
              mixBlendMode: "multiply",
              filter: "blur(14px)",
              zIndex: -1,
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Skrapbook",
              fontSize: { sm: "24px", xs: "14px" },
              textAlign: "center",
              color: "#201C18",
              marginBottom: { sm: "16px", xs: "6px" },
            }}
          >
            The Meme Mafia grows everyday. Add your homies. <br /> We must pump
            our bags together.
          </Typography>
          <Box
            ref={componentRef}
            sx={{
              backgroundColor: "transparent",
              position: "relative", // Ensure the overlay works
              padding: { sm: "16px", xs: "4px" },
              borderRadius: "25px",
            }}
          >
            <ModalContent walletAddress={walletAddress} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleCopyImage}
              sx={{
                width: "100%",
                mb: 2,
                backgroundColor: "#B74AFF",
                color: "white",
                fontFamily: "Skrapbook",
                fontSize: { xs: "16px", sm: "18px" }, // Responsive font size
                border: "2px solid black",
                borderRadius: "25px",
                boxShadow: "2px 2px 0px black",
                marginTop: "10px",
                maxWidth: { sm: "700px", xs: "300px" },
                position: "relative",
              }}
            >
              {openToast && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translate(-50%, -120%)",
                    zIndex: 1,
                    backgroundImage: "url(./copyed.png)",
                    backgroundSize: "cover",
                    width: "91px",
                    height: "41px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Skrapbook",
                      fontSize: "20px",
                      color: "#000",
                    }}
                  >
                    Copyed!
                  </Typography>
                </Box>
              )}
              <CustomText
                text="Copy Image to Clipboard"
                fontFamily="Skrapbook"
                fontSize={isMobile ? "18px" : "28px"}
              />
            </Button>
            <Button
              onClick={handleShareOnTwitter}
              sx={{
                width: "100%",
                backgroundColor: "#1DA1F2",
                color: "white",
                fontFamily: "Skrapbook",
                fontSize: { xs: "16px", sm: "18px" }, // Responsive font size
                border: "2px solid black",
                borderRadius: "25px",
                boxShadow: "2px 2px 0px black",
                maxWidth: { sm: "700px", xs: "300px" },
              }}
            >
              <CustomText
                text="Share on Twitter"
                fontFamily="Skrapbook"
                fontSize={isMobile ? "18px" : "28px"}
              />
            </Button>
            <Button
              sx={{
                display: "flex",
                justifyContent: "cemter",
                gap: 2,
                alignItems: "center",
                position: "relative",
              }}
              onClick={handleCopyLink}
            >
              {openToast2 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translate(-50%, -120%)",
                    zIndex: 1,
                    backgroundImage: "url(./copyed.png)",
                    backgroundSize: "cover",
                    width: "91px",
                    height: "41px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Skrapbook",
                      fontSize: "20px",
                      color: "#000",
                    }}
                  >
                    Copyed!
                  </Typography>
                </Box>
              )}
              <Typography
                sx={{
                  fontFamily: "Skrapbook",
                  fontSize: { xs: "18px", sm: "28px" },
                  color: "#201C18",
                  marginTop: "10px",
                }}
              >
                COPY LINK
              </Typography>
              <img
                alt="copy"
                src="./campaign-copy.png"
                width={28}
                height={28}
              />
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
