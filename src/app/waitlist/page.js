"use client";
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import Image from "next/image";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CustomCursor from "@/components/GeneralComponents/customCursor";

// Constants
const RAINBOW_COLORS = {
  0: "#FF0000",
  11: "#FF00C6",
  22: "#9600FF",
  33: "#1E00FF",
  44: "#0084FF",
  55: "#00FFE4",
  66: "#00FF36",
  77: "#60FF00",
  88: "#EAFF00",
  100: "#FF6000",
};

// Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const rainbowAnimation = keyframes`
  ${Object.entries(RAINBOW_COLORS)
    .map(([percent, color]) => `${percent}% { color: ${color}; }`)
    .join("\n")}
`;

// Styled Components
const FloatingBox = styled(Box)({
  position: "absolute",
  animation: `${floatAnimation} 3s ease-in-out infinite`,
});

const BackgroundContainer = styled(Box)(({ theme }) => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // More reliable Safari detection
    const isSafariCheck = () => {
      return (
        navigator.vendor &&
        navigator.vendor.indexOf("Apple") > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf("CriOS") === -1 &&
        navigator.userAgent.indexOf("FxiOS") === -1
      );
    };

    setIsSafari(isSafariCheck());
  }, []);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return {
    backgroundImage: isMobile
      ? "url(./waitlist_background_sm.png)"
      : "url(./waitlist_background.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
    paddingTop: isMobile ? (isSafari ? "120px" : "0px") : "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: isMobile && isSafari ? "start" : "center",

    [theme.breakpoints.up("md")]: {
      justifyContent: "end",
      paddingRight: "100px",
    },
  };
});

// Components
const TextWithStroke = ({ text }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const getFontSize = () => {
    if (isMobile) {
      return isSafari ? "44.5px" : "45px";
    }
    return isSafari ? "69px" : "72px";
  };

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // More reliable Safari detection
    const isSafariCheck = () => {
      return (
        navigator.vendor &&
        navigator.vendor.indexOf("Apple") > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf("CriOS") === -1 &&
        navigator.userAgent.indexOf("FxiOS") === -1
      );
    };

    setIsSafari(isSafariCheck());
  }, []);
  return (
    <Box position="relative" display="inline-block">
      <Typography
        component="div"
        sx={{
          fontFamily: "MotleyForces",
          fontSize: getFontSize(),
          fontWeight: "bold",
          whiteSpace: "pre-wrap",
          textShadow:
            "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -2px 2px #000",
          lineHeight: 1,
          transform:
            isSafari && isMobile ? "translate(2px, 2px)" : "translateY(0)",
          animation: "rainbow-color-change 4s infinite linear",
          "@keyframes rainbow-color-change": {
            "0%": {
              color: "#ffc23f",
            },
            "16%": {
              color: "#c1ff6b",
            },
            "33%": {
              color: "#6dffc0",
            },
            "50%": {
              color: "#45b2ff",
            },
            "66%": {
              color: "#4b45ff",
            },
            "83%": {
              color: "#e646ff",
            },
            "100%": {
              color: "#00ff36",
            },
          },
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

const DogImage = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: { xs: "100px", sm: "0px" },
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <Image
        alt="waitlist_dog"
        src="/waitlist.png"
        width={1400}
        height={890}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "bottom",
        }}
        priority
      />
    </Box>
  );
};

const TextContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 1,
        position: "relative",
        marginTop: isMobile ? "5px" : "70px", // Shift down for both mobile and desktop
      }}
    >
      <Image
        src="/cat-stand.png"
        width={186}
        height={186}
        alt="logo"
        style={{
          position: "absolute",
          top: isMobile ? "-105px" : "-160px",
          right: "30px",
          width: isMobile ? "120px" : "186px",
          height: isMobile ? "120px" : "186px",
        }}
      />
      <TextWithStroke text="Y U NO PUMP" />
      <TextWithStroke text="YOUR BAGS" />
    </Box>
  );
};

// Main Component
export default function Form() {
  const [joinWaitlistIsPressed, setJoinWaitlistIsPressed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <CustomCursor>
      {" "}
      {/* Wrapping the content with CustomCursor */}
      <BackgroundContainer>
        <Image
          src="/cat-peek.png"
          width={222}
          height={214}
          alt="logo"
          style={{
            position: "absolute",
            top: isMobile ? "48%" : "70%",
            right: "0px",
            width: isMobile ? "80px" : "162px",
            height: isMobile ? "80px" : "162px",
          }}
        />
        <DogImage />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginTop: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "30px" : "40px",
              marginTop: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            <TextContainer />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 0,
              }}
            >
              <Button
                size="small"
                sx={{
                  padding: { xs: "15px 40px", sm: "20px 60px" },
                  border: "3px solid black",
                  backgroundColor: "#B74AFF",
                  borderRadius: "25px",
                  color: "white",
                  marginTop: "40px",
                  boxShadow: joinWaitlistIsPressed
                    ? "1px 1px 0px black"
                    : "3px 3px 0px black",
                  transform: `${isMobile ? "scale(0.8)" : "scale(1)"} ${joinWaitlistIsPressed ? "translate(2px, 2px)" : ""}`,
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",

                  position: "relative",
                }}
                onMouseDown={() => setJoinWaitlistIsPressed(true)}
                onMouseUp={() => setJoinWaitlistIsPressed(false)}
                onMouseLeave={() => setJoinWaitlistIsPressed(false)}
                onTouchStart={() => setJoinWaitlistIsPressed(true)}
                onTouchEnd={() => setJoinWaitlistIsPressed(false)}
              >
                <Image
                  src="/cat-sit.png"
                  width={158}
                  height={158}
                  alt="sit"
                  style={{
                    position: "absolute",
                    top: isMobile ? "-77px" : "-132px",
                    left: isMobile ? "-27px" : "-62px",
                    width: isMobile ? "90px" : "158px",
                    height: isMobile ? "90px" : "158px",
                  }}
                />
                <Box position="relative" display="inline-block">
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "To Japan",
                      fontSize: { xs: "20px", sm: "24px", md: "28px" },
                      color: "transparent",
                      WebkitTextStroke: {
                        xs: "6px #000000",
                        sm: "8px #000000",
                      },
                      whiteSpace: "nowrap",
                      color: "#ffffff",
                      marginTop: "-8px",
                    }}
                  >
                    Join the Waitlist
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "To Japan",
                      fontSize: { xs: "20px", sm: "24px", md: "28px" },
                      position: "absolute",
                      top: 0,
                      left: 0,
                      marginTop: "-8px",
                      whiteSpace: "nowrap",
                      color: "#ffffff",
                    }}
                  >
                    Join the Waitlist
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px", // Adjust gap between text and circles
            }}
          >
            {/* Overlapping circles */}
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: "36px", sm: "48px", md: "60px" }, // Responsive sizes
                height: { xs: "36px", sm: "48px", md: "60px" },
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
                zIndex: 2, // Ensures correct stacking
              }}
            >
              <Image
                src="/user1.png" // Replace with your image path
                alt="User 1"
                width={60}
                height={60}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: "36px", sm: "48px", md: "60px" },
                height: { xs: "36px", sm: "48px", md: "60px" },
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
                marginLeft: "-25px", // Increased overlap
                zIndex: 1,
              }}
            >
              <Image
                src="/user2.png" // Replace with your image path
                alt="User 2"
                width={60}
                height={60}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>

            {/* Text */}
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                fontSize: { xs: "18px", sm: "20px", md: "24px" },
              }}
            >
              Join Prash, Sneh and many more
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: { xs: "-20px", sm: "0px", md: "-20px" }, // Shift upwards on mobile screens
            }}
          >
            <Typography
              component="div"
              sx={{
                fontFamily: "Skrapbook",
                fontSize: { xs: "18px", sm: "20px", md: "24px" },
              }}
            >
              @2025 | powered by create
            </Typography>
            <Box
              sx={{
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image
                width={28}
                height={28}
                alt="telegram"
                src="/telegrm_black.png"
              />
              <Image
                width={28}
                height={28}
                alt="twitter"
                src="/twitter_black.png"
              />
            </Box>
          </Box>
        </Box>
      </BackgroundContainer>
    </CustomCursor>
  );
}
