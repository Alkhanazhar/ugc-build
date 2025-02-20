import { useState, useEffect } from "react";
import { Typography, Modal, Box, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomText from "@/components/GeneralComponents/customText";
import { useSelector } from "react-redux";

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
  p: 4,
};

export const ExtendModal = ({
  extendOpen,
  handleExtendClose,
  depositTokens,
  tokenContract,
  campaignAddress,
}) => {
  const [poolValue, setPoolValue] = useState(0);
  const [selectedBox, setSelectedBox] = useState(0);

  console.log("campaign address in extend modal " + campaignAddress);

  // UseSelector to fetch USD constant
  const usdConstant = useSelector(
    (state) => state.campaigns?.campaignStartUsd || 1
  );

  console.log("usd constant " + usdConstant["campaign_start_usd"]);

  // Calculate pool values based on usdConstant
  const poolValues = [
    1 * usdConstant["campaign_start_usd"],
    2 * usdConstant["campaign_start_usd"],
    4 * usdConstant["campaign_start_usd"],
    6 * usdConstant["campaign_start_usd"],
  ];

  const hours = [`6 hours`, `12 hours`, `24 hours`, `48 hours`];

  // Update poolValue when selectedBox changes
  useEffect(() => {
    setPoolValue(poolValues[selectedBox]);
  }, [selectedBox, poolValues]);

  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };

  return (
    <Modal
      open={extendOpen}
      onClose={handleExtendClose}
      disableScrollLock
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="flex-end">
          <Box
            onClick={handleExtendClose}
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{
              border: "2px solid #000000",
              padding: "4px",
              borderRadius: "10px",
              marginBottom: "30px",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </Box>
        </Box>
        <Typography
          style={{
            fontFamily: "Skrapbook",
            marginLeft: "20px",
            fontSize: "24px",
          }}
        >
          Extend by
        </Typography>

        {/* Pool Value Selection Boxes */}
        <Grid
          container
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          mb={4}
        >
          {poolValues.map((value, index) => (
            <Grid
              item
              key={index}
              xs={5.5}
              onClick={() => handleBoxClick(index)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{
                border: "2px solid #000",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: selectedBox === index ? "#DCEC55" : "#FFFFFF",
                borderRadius: "20px",
              }}
            >
              <Typography
                style={{
                  fontFamily: "Skrapbook",
                  fontSize: "20px",
                }}
              >
                {hours[index]}
              </Typography>
              <Typography
                style={{ fontFamily: "Skrapbook", fontSize: " 16px" }}
              >
                {`$${value}`}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Extend Button */}
        <Box display="flex" justifyContent="center">
          <Button
            size="small"
            onClick={() =>
              depositTokens(
                poolValue,
                tokenContract,
                "",
                "",
                "",
                "",
                campaignAddress
              )
            }
            sx={{
              width: "220px",
              height: "50px",
              border: "2px solid black",
              backgroundColor: "#DCEC55",
              borderRadius: 4,
              color: "white",
            }}
          >
            <CustomText
              text="Extend!!"
              fontSize="20px"
              fontFamily="Skrapbook"
              fontStroke="4px"
            />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
