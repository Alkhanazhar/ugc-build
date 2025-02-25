import { useState, useEffect } from "react";
import { Typography, Modal, Box, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomText from "@/components/GeneralComponents/customText";
import { useSelector } from "react-redux";
import { useClaimTokens } from "@/action/contracts/contractInteractionAction";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  bgcolor: "#F5F5F5",
  border: "2px solid #000",
  boxShadow: "2px 2px 0px black",
  borderRadius: "35px",
  //   p: 4,
};

export const ClaimModal = ({
  claimOpen,
  handleCLaimClose,
  availableTokensToClaim,
  tokenAddress,
}) => {
  const [claimNowIsPressed, setClaimNowIsPressed] = useState(false);
  const { claimAvailableTokens } = useClaimTokens();
  const handleClaimNowClick = (tokenAddress) => {
    console.log("claim tokens");
    console.log("token addres inside handleClaimNowClick " + tokenAddress);
    claimAvailableTokens(tokenAddress);
  };
  return (
    <Modal
      open={claimOpen}
      onClose={handleCLaimClose}
      disableScrollLock
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
      <Box sx={modalStyle}>
        <Box
          style={{
            marginTop: "-30px",
            marginRight: "-30px",
          }}
          display="flex"
          justifyContent="flex-end"
        >
          <Box
            onClick={handleCLaimClose}
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{
              border: "2px solid #000000",
              padding: "4px",
              borderRadius: "10px",
              marginBottom: "30px",
              backgroundColor: "#F5F5F5",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </Box>
        </Box>
        <Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-64px",
            }}
          >
            <img height="160px" src="./reward-claim-mascot.png" />
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "16px",
              marginBottom: "60px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Garfiey",
                fontSize: "20px",
              }}
            >
              Total $Token Claimable
            </Typography>
            <Typography
              style={{
                fontFamily: "To Japan",
                fontSize: "70px",
                fontWeight: "400",
                color: "white",
                textShadow: `
      -2px -2px 0 black, 
       2px -2px 0 black, 
      -2px  2px 0 black, 
       2px  2px 0 black
    `,
              }}
            >
              {availableTokensToClaim != null
                ? availableTokensToClaim.toFixed(2)
                : 0}
            </Typography>
          </Box>
        </Box>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "-70px",
          }}
        >
          <Button
            onClick={() => handleClaimNowClick(tokenAddress)}
            size="small"
            sx={{
              width: "240px",
              height: "50px",
              border: "2px solid black",
              backgroundColor: "#B74AFF",
              borderRadius: 4,
              color: "white",
              boxShadow: claimNowIsPressed
                ? "1px 1px 0px black"
                : "2px 2px 0px black",
              transform: claimNowIsPressed ? "translate(2px, 2px)" : "none",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseDown={() => setClaimNowIsPressed(true)}
            onMouseUp={() => setClaimNowIsPressed(false)}
            onMouseLeave={() => setClaimNowIsPressed(false)}
            onTouchStart={() => setClaimNowIsPressed(true)}
            onTouchEnd={() => setClaimNowIsPressed(false)}
          >
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                fontSize: "24px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                textShadow:
                  "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -1px 1px #000",

                color: "#ffffff",
              }}
            >
              Claim Now
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
