"use client";
import { useDepositTokens } from "@/action/contracts/contractInteractionAction";
import { useFormAction } from "@/action/formAction";
import CustomTextField from "@/components/form/customTextField";
import { CustomLoader } from "@/components/GeneralComponents/customLoader";
import CustomText from "@/components/GeneralComponents/customText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NavBar from "@/components/GeneralComponents/navbar";
import CloseIcon from "@mui/icons-material/Close";
import { useWebSocket } from "@/network/connection";
import {
  setCampaignCreated,
  setContractAddressInfo,
} from "@/redux/slice/formSlice.js";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Container, Grid, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import CampaignCreated from "../campaign_created/page";
import { useAbstractClient } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "600px",
  bgcolor: "#F5F5F5",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "15px",
  p: 4,
  transform: "translate(-50%, -50%)",
};

const infoModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "350px", sm: "800px" },
  height: { xs: "600px", sm: "fit-content" },
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "35px",
  boxShadow: "2px 2px 0px black",
  p: { xs: "12px", sm: 4 },
};

const fileTypes = ["JPG", "PNG", "GIF"];
export default function Form() {
  const [file, setFile] = useState(null);
  const { sendCampaignImageRequest } = useWebSocket();
  const [showMore, setShowMore] = useState(false);
  const [isDisable, setIsdisabled] = useState(true);
  const [depositMemecoinIsPressed, setDepositMemecoinPressed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { fetchContractAddressInfo } = useFormAction();
  const [isLoading, setIsLoading] = useState(true);
  const [contractTicker, setContractTicker] = useState("");
  const [contractName, setContractName] = useState("");
  const [contractDescription, setContractDescription] =
    useState("Let's GO UGC");
  const [contractImage, setContractImage] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [isDepositLoadingState, setIsDepositLoadingState] = useState(false);
  const [poolValue, setPoolValue] = useState("");
  const [open, setOpen] = useState(false);
  const { depositTokens } = useDepositTokens();
  const components = useMemo(() => ["10000", "25000", "50000"], []);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [eqValue, setEqValue] = useState();
  const [infoModal, setInfoModal] = useState(false);

  const [contractAddress, setContractAddress] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const contractAddressInfo = useSelector(
    (state) => state.contractAddressInfo?.items || null
  );
  const isDepositLoading = useSelector(
    (state) => state.contractAddressInfo?.isDepositLoading || false
  );
  const isCampaignCreated = useSelector(
    (state) => state.contractAddressInfo?.isCampaignCreated || false
  );
  const [isFileUploaded, setIsFileUploaded] = useState(false); // State to track file upload
  const { status } = useAccount();
  const { data: agwClient } = useAbstractClient();

  const handleFileChange = (file) => {
    setFile(file);
    setIsFileUploaded(true); // Set the state to true when a file is uploaded
  };
  useEffect(() => {
    if (isCampaignCreated) {
      router.push("/campaign_created");
    }
  }, [isCampaignCreated]);

  useEffect(() => {
    setIsDepositLoadingState(isDepositLoading);
  }, [isDepositLoading]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTouched, setIsTouched] = useState(false); // Track if the field has been touched

  const handleContractAddressChange = useCallback(
    async (event) => {
      const value = event.target.value;
      setContractAddress(value);

      // Clear error message while typing
      if (errorMessage) {
        setErrorMessage("");
      }
      if (value.length === 42 && /^0x[a-fA-F0-9]{40}$/.test(value)) {
        try {
          const data = await fetchContractAddressInfo(value);
          console.log(data, "data");
        } catch (error) {
          console.error("Error fetching contract address info:", error);
        }
      }
    },
    [errorMessage]
  );

  const handleContractAddressBlur = useCallback(() => {
    setIsTouched(true); // Mark the field as touched on blur

    // Validate Ethereum address format
    const isEthereumAddress = /^0x[a-fA-F0-9]{40}$/.test(contractAddress);

    // Reject URLs
    const isUrl = /^(http:\/\/|https:\/\/|www\.)/i.test(contractAddress);

    if (isUrl) {
      setErrorMessage("Links are not allowed.");
      return;
    }

    if (!isEthereumAddress && contractAddress.length > 0) {
      setErrorMessage("Please enter a valid Ethereum contract address.");
      return;
    }

    setErrorMessage(""); // Clear error message if input is valid
  }, [contractAddress]);

  // Disable submit button if there is an error or the field is empty
  const isSubmitDisabled = !!errorMessage || !contractAddress;
  const handleDescriptionChange = useCallback(
    async (event) => {
      const value = event.target.value;
      setContractDescription(value);
    },
    [contractAddressInfo]
  );
  const handleTwitterLinkChange = useCallback(
    async (event) => {
      const value = event.target.value;
      setTwitterLink(value);
    },
    [contractAddressInfo]
  );
  const handleTelegramLinkChange = useCallback(
    async (event) => {
      const value = event.target.value;
      setWebsiteLink(value);
    },
    [contractAddressInfo]
  );
  const handleWebsiteLinkChange = useCallback(
    async (event) => {
      const value = event.target.value;
      setContractAddress(value);
    },
    [contractAddressInfo]
  );

  const handlePoolValueChange = useCallback(
    async (event) => {
      const inputValue = event.target.value;
      if (/^[0-9]*$/.test(inputValue)) {
        setPoolValue(inputValue);
      } else {
        console.log("Please enter only numeric values.");
      }
    },
    [contractAddressInfo]
  );

  const campaigns = useSelector((state) => state.campaigns?.items || {});
  const handleContinue = () => {
    if (!campaigns || !Array.isArray(campaigns) || !campaigns.length) {
      router.push("/");
    }
    const searchedCampaign = campaigns.find(
      (campaign) => campaign.token_contract === contractAddress
    );
    console.log(searchedCampaign, "searchedCampaign");
    if (searchedCampaign) {
      // Generate the URL with the campaign's contract address
      const campaignLink = `https://beta.ugc.fun/campaign?token_contract=${searchedCampaign.token_contract}`;
      window.location.href = campaignLink; // This will navigate to the campaign link
    } else {
      router.push("/");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (contractAddressInfo) {
      if (contractAddressInfo["can_create_campaign"] == false) {
        handleOpen();
      }
      if (contractAddressInfo.approx_usd_conv) {
        setEqValue(Number(contractAddressInfo.approx_usd_conv));
      }
    }
  }, [contractAddressInfo]);

  useEffect(() => {
    dispatch(setContractAddressInfo(null));
    setIsdisabled(true);

    // Cleanup on component unmount
    return () => {
      dispatch(setContractAddressInfo(null));
      setIsdisabled(true);
    };
  }, [dispatch]);

  useEffect(() => {
    if (contractAddressInfo) {
      setContractName(contractAddressInfo.name || "");
      setContractTicker(contractAddressInfo.ticker || "");
      setContractName(contractAddressInfo["token_name"]);
      setContractTicker(contractAddressInfo["token_ticker"]);
      if (contractAddressInfo["can_create_campaign"] != false) {
        setIsdisabled(false);
      }
    }
  }, [contractAddressInfo]);

  const handleDeposit = async () => {
    if (errorMessage) {
      return;
    }
    if (!agwClient) {
      console.log("Agw Client is not available");
      return;
    }

    let base64Image = null;
    if (file) {
      // Convert the image file to base64
      base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Data = reader.result.split(",")[1];
          resolve(base64Data);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    }
    console.log("base64Image", base64Image);
    // return;
    await depositTokens(
      poolValue,
      contractAddress,
      contractDescription,
      twitterLink,
      telegramLink,
      websiteLink,
      base64Image
    );
    if (base64Image) {
      const image = await sendCampaignImageRequest(
        contractAddress,
        base64Image
      );
      console.log("Image uploaded", image);
    }
  };
  useEffect(() => {
    if (agwClient !== undefined || status !== "connected") return;
    // Stops if agwClient is valid or status is not "connected"

    console.log("campaignAddress is not valid, waiting 5 seconds to reload...");

    const timeout = setTimeout(() => {
      console.log(
        "_____________________________________________________________refreshing"
      );
      window.location.reload();
    }, 5000);

    return () => clearTimeout(timeout); // Clear timeout if dependencies change
  }, [agwClient, status]); // Add status as a dependency
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
        <Box
          sx={modalStyle}
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Typography
            component="div"
            sx={{ fontFamily: "Garfiey", margin: "30px 0px 20px 0px" }}
          >
            Contract address is already in us! <br /> Taking you to respective
            campaign
          </Typography>
          <Box>
            <Button onClick={handleContinue}>
              <Button
                size="small"
                onClick={handleClose}
                sx={{
                  width: "300px",
                  height: "60px",
                  border: "2px solid black",
                  backgroundColor: "#ffffff",
                  borderRadius: 4,
                  padding: "10px 0",
                  color: "black",
                  marginTop: "40px",
                }}
              >
                <Typography component="div" sx={{ fontFamily: "Garfiey" }}>
                  Continue
                </Typography>
              </Button>
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        style={{
          backgroundImage: "url(/form-background.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center center",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ zIndex: 999999, position: "relative" }}>
          <NavBar />
        </Box>
        {isCampaignCreated ? (
          <CampaignCreated />
        ) : isDepositLoadingState ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomLoader />
            {/* <CampaignCreated /> */}
          </Box>
        ) : (
          <>
            <Container maxWidth="sm" sx={{ position: "relative" }}>
              <Button
                sx={{
                  position: "absolute",
                  right: { sm: "-100px", xs: "20px" },
                  top: { xs: "-8px", sm: "20px" },
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #201C18",
                  borderRadius: "10px",
                  padding: "4px",
                  width: "fit-content",
                  minWidth: 0,
                }}
                onClick={() => setInfoModal(true)}
              >
                <img src="./info.svg" width={24} height={24} alt="info" />
              </Button>
              <Box style={{ marginTop: "20px", paddingBottom: "20px" }}>
                <CustomTextField
                  label={"CONTRACT ADDRESS:"}
                  placeholder={"CONTRACT ADDRESS: 0"}
                  value={contractAddress}
                  onChange={handleContractAddressChange}
                  onBlur={handleContractAddressBlur} // Add onBlur handler
                />
                {isTouched &&
                  errorMessage && ( // Display error message below the field
                    <Typography
                      sx={{
                        color: "red",
                        fontFamily: "Skrapbook",
                        fontSize: "14px",
                        marginTop: "4px",
                      }}
                    >
                      {errorMessage}
                    </Typography>
                  )}
                <CustomTextField
                  label={"NAME"}
                  placeholder={"NAME B)"}
                  value={contractName}
                  disable={true}
                />
                <CustomTextField
                  label={"TICKER"}
                  placeholder={"TICKER :3"}
                  value={contractTicker}
                  disable={true}
                />
                <Box>
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <CustomTextField
                      label={"POOL IN"}
                      placeholder={"AMOUNT (MIN 1000)"}
                      value={poolValue}
                      disable={isDisable}
                      onChange={handlePoolValueChange}
                    />
                    <Typography
                      variant="span"
                      sx={{
                        fontFamily: "Skrapbook",
                        color: "#000",
                        position: "absolute",
                        right: 0,
                        top: "0",
                        fontSize: 16,
                      }}
                    >
                      {eqValue
                        ? `Equivalent to $${(eqValue * poolValue)?.toFixed(2)}`
                        : ""}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Typography
                      component="div"
                      sx={{
                        fontFamily: "Skrapbook",
                        color: "#B74AFF",
                        fontSize: 16,
                        margin: "-16px 0px 0px 0px",
                      }}
                    >
                      OR!
                    </Typography>
                  </Box>
                  <Grid
                    container
                    display="flex"
                    flexDirection="row"
                    spacing={1}
                  >
                    {components.map((component, index) => (
                      <Grid item xs={4} key={index}>
                        <Box
                          onClick={() => {
                            if (!isDisable) {
                              setPoolValue(components[index]);
                              setSelectedIndex(index);
                            }
                          }}
                          style={{
                            cursor: isDisable ? "not-allowed" : "pointer",
                            borderRadius: "12px",
                            height: "38px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isDisable
                              ? "grey"
                              : selectedIndex === index
                              ? "#B74AFF"
                              : "white",
                            color: isDisable
                              ? "white"
                              : selectedIndex === index
                              ? "white"
                              : "black",
                            border: "2px solid #000000",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                            lineHeight: "38px",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          {component}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid
                    container
                    spacing={isMobile ? 2 : 4}
                    style={{ marginTop: "20px" }}
                  >
                    <Grid item xs={6} sm={6}>
                      <Typography
                        component="div"
                        sx={{ fontFamily: "Skrapbook" }}
                      >
                        Description
                      </Typography>
                      <TextField
                        id="filled-multiline-static"
                        disabled={isDisable}
                        onChange={handleDescriptionChange}
                        multiline
                        rows={2}
                        defaultValue="Let's GO UGC"
                        variant="filled"
                        placeholder="Description :@"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            textAlign: "center",
                            fontSize: "20px",
                            padding: "16px",
                            fontFamily: "Garfiey",
                            backgroundColor: "#ffffff",
                            borderRadius: "25px",
                          },
                        }}
                        sx={{
                          width: "100%",
                          backgroundColor: "white",
                          border: "2px solid black",
                          borderRadius: "20px",
                          height: "114px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          "& .MuiInputBase-input": {
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} sm={6}>
                      <Typography
                        component="div"
                        sx={{
                          fontFamily: "Garfiey",
                          fontSize: isMobile ? "15px" : "15px",
                        }}
                      >
                        IMAGE OR VIDEO (OPTIONAL)
                      </Typography>
                      <Box
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          border: "2px solid black",
                          borderRadius: "20px",
                          textAlign: "center",
                          padding: "16px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          height: "114px",
                          position: "relative",
                        }}
                      >
                        <FileUploader
                          handleChange={handleFileChange}
                          name="file"
                          disabled={isDisable}
                          types={fileTypes}
                          label={
                            file == null
                              ? "DRAG AND DROP AN IMAGE OR VIDEO >_>"
                              : file.name
                          }
                        >
                          <Box>
                            <Typography
                              component="div"
                              style={{
                                color: "#BDBDBD",
                                fontFamily: "Garfiey",
                              }}
                            >
                              {file == null
                                ? "DRAG AND DROP AN IMAGE OR VIDEO >_>"
                                : file.name}
                            </Typography>
                          </Box>
                        </FileUploader>
                        {isFileUploaded && ( // Display the green tick if a file is uploaded
                          <CheckCircleIcon
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "10px",
                              color: "green",
                              fontSize: "24px",
                            }}
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={2}>
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "Skrapbook",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    SHOW MORE OPTIONS
                    <span
                      onClick={() => setShowMore(!showMore)}
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      {showMore ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </span>
                    <span
                      style={{
                        opacity: 0.3,
                        color: "#201C18",
                        marginLeft: "8px",
                      }}
                    >
                      PSST THESE ARE OPTIONAL :)
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 4,
                    overflow: "hidden",
                    height: showMore ? "auto" : "0", // Control the height for smooth transition
                    transition: "height 0.3s ease-in-out", // Smooth transition
                  }}
                >
                  {showMore && (
                    <Box>
                      <CustomTextField
                        label={"TWITTER LINK"}
                        placeholder={"IT'S ACTUALLY X NOW B)"}
                        disable={isDisable}
                        onChange={handleTwitterLinkChange}
                      />
                      <CustomTextField
                        label={"TELEGRAM LINK"}
                        placeholder={"TELE :)"}
                        disable={isDisable}
                        onChange={handleTelegramLinkChange}
                      />
                      <CustomTextField
                        label={"WEBSITE"}
                        placeholder={"WWW.COOLDUDE.XYZ"}
                        disable={isDisable}
                        onChange={handleWebsiteLinkChange}
                      />
                    </Box>
                  )}
                </Box>
                <Button
                  size="small"
                  fullWidth
                  onClick={handleDeposit}
                  sx={{
                    height: "48px",
                    border: "4px solid black",
                    backgroundColor: isDepositLoadingState
                      ? "black" // Black when loader is active
                      : isDepositLoadingState ||
                        !poolValue ||
                        !contractAddress ||
                        !contractDescription ||
                        !contractName ||
                        !contractTicker ||
                        errorMessage?.length > 0
                      ? "#B0B0B0" // Grey when disabled
                      : "#B74AFF", // Purple when enabled
                    borderRadius: 4,
                    color: "white",
                    marginTop: "40px",
                    boxShadow: depositMemecoinIsPressed
                      ? "1px 1px 0px black"
                      : "2px 2px 0px black",
                    transform: depositMemecoinIsPressed
                      ? "translate(2px, 2px)"
                      : "none",
                    transition: "transform 0.1s, box-shadow 0.1s",
                  }}
                  onMouseDown={() => setDepositMemecoinPressed(true)}
                  onMouseUp={() => setDepositMemecoinPressed(false)}
                  onMouseLeave={() => setDepositMemecoinPressed(false)}
                  onTouchStart={() => setDepositMemecoinPressed(true)}
                  onTouchEnd={() => setDepositMemecoinPressed(false)}
                  disabled={
                    isDepositLoadingState ||
                    !poolValue ||
                    !contractAddress ||
                    !contractDescription ||
                    !contractName ||
                    !contractTicker ||
                    errorMessage?.length > 0
                  }
                >
                  {/* {isDepositLoadingState ? (
                <img
                  src="/picartso.gif" // Ensure this path is correct
                  alt="Loading"
                  style={{ width: "25px", height: "35px", marginTop: "5px" }}
                />
              ) : ( */}
                  <CustomText
                    text={!agwClient ? "Loading..." : "DEPOSIT MEMECOIN!"}
                    fontSize="20px"
                    fontFamily="Skrapbook"
                    fontStroke="5px"
                  />
                  {/* )} */}
                </Button>
              </Box>
            </Container>
            <Modal
              open={infoModal}
              onClose={() => setInfoModal(false)}
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
              <Box sx={infoModalStyle}>
                <Box display="flex" justifyContent="flex-end">
                  <Box
                    onClick={() => setInfoModal(false)}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      border: "2px solid #000000",
                      padding: "4px",
                      borderRadius: "10px",
                    }}
                  >
                    <CloseIcon />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <CustomText
                    text="How to Create a Campaign"
                    fontStroke="4px"
                  />
                </Box>

                {/* Depositors Section */}
                <Typography
                  component="div"
                  style={{
                    fontFamily: "Garfiey",
                    fontWeight: 600,
                    fontSize: "18px",
                    marginBottom: "10px",
                    color: "#000",
                  }}
                >
                  🛠️ Set it up
                </Typography>
                <Typography
                  component="div"
                  style={{
                    fontFamily: "Garfiey",
                    fontSize: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>1️⃣</span> Add your
                    token&apos;s contract address.
                  </Box>
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>2️⃣</span> ⁠Decide how
                    much to pool: Pick from the preset options or enter your
                    custom amount.
                  </Box>
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>3️⃣</span> The Reward
                    Pool goes live once it has $1400 worth of tokens.
                  </Box>
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>4️⃣</span> Every Reward
                    Pool stays live for 7 days.
                  </Box>
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>5️⃣</span> ⁠You can
                    invite people to pool in too! TOGETHER!
                  </Box>
                </Typography>

                {/* Creators Section */}
                <Typography
                  component="div"
                  style={{
                    fontFamily: "Garfiey",
                    fontWeight: 600,
                    fontSize: "18px",
                    marginBottom: "10px",
                    color: "#000",
                  }}
                >
                  🎨 Describe it
                </Typography>
                <Typography
                  component="div"
                  style={{
                    fontFamily: "Garfiey",
                    fontSize: "16px",
                  }}
                >
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>1️⃣</span> Add a
                    description to tell creators what kind of content you’re
                    looking for.
                  </Box>
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>2️⃣</span> Drag and drop
                    an image that represents your token best. (ideally, the
                    token logo.)
                  </Box>
                </Typography>
                <Typography
                  component="div"
                  style={{
                    fontFamily: "Garfiey",
                    fontWeight: 600,
                    fontSize: "18px",
                    marginBottom: "10px",
                    color: "#000",
                  }}
                >
                  🌐 Launch it:
                </Typography>
                <Typography
                  component="div"
                  style={{
                    fontFamily: "Garfiey",
                    fontSize: "16px",
                  }}
                >
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>1️⃣</span> ⁠Hit Deposit
                    Token! to setup the Reward Pool.
                  </Box>
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>2️⃣</span> ⁠The Pool
                    goes live when the minimum USD criteria is met.
                  </Box>
                  <Box sx={{ marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>3️⃣</span> ⁠Once your
                    campaign is live, creators can jump in and start creating
                    content for you.
                  </Box>
                </Typography>
              </Box>
            </Modal>
          </>
        )}
      </Box>
    </div>
  );
}
