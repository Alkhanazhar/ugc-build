/* eslint-disable @next/next/no-img-element */
"use client";
import { useHomeAction } from "@/action/homeAction";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CampaignCard from "@/components/GeneralComponents/campaignCard";
import NavBar from "@/components/GeneralComponents/navbar";
import { WebsiteLoader } from "@/components/GeneralComponents/website-loader";
import CustomDropdown from "@/components/Home/customDropdown";
import FooterSection from "@/components/Home/footerSection";
import SearchBox, { useSearchFilter } from "@/components/Home/searchBox";
import Link from "next/link";
import CustomText from "@/components/GeneralComponents/customText";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { fetchCampaigns, fetchConstant } = useHomeAction();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Graduating");

  useEffect(() => {
    const fetchData = async () => {
      await fetchConstant();
    };
    fetchData();
  }, []);

  // const fetchCampaignsMemoized = useCallback(fetchCampaigns, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       await fetchCampaigns();
  //     } catch (error) {
  //       console.error("Error fetching campaigns:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [fetchCampaignsMemoized]);

  const campaigns = useSelector((state) => state.campaigns?.items || {});
  console.log("campaigns", campaigns);
  const { filteredCampaigns, searchTerm, handleSearchChange } =
    useSearchFilter(campaigns);

  const isCampaignsLoaded = campaigns.length > 0;

  if (isLoading && !isCampaignsLoaded) {
    return <WebsiteLoader />;
  }

  return (
    <Box>
      <main>
        <Box
          sx={{
            backgroundPosition: { xs: "top left", sm: "center" },
            minHeight: "100vh",
            overflow: "hidden",
          }}
        >
          <NavBar />
          {/* Header Section */}
          <Box style={{ position: "relative" }}>
            <Box
              // className="bottom-0 left-0 z-[10] absolute w-full h-[200px]"
              style={{
                maskImage: "linear-gradient(transparent, #FEEDB2 85%)",
                position: "absolute",
                backgroundColor: "#FEEDB2",
                bottom: 0,
                left: 0,
                zIndex: 10,
                height: "200px",
                width: "100%",
              }}
            />
            <Box
              sx={{
                width: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                height: "100dvh",
                bottom: "auto",
                zIndex: -3,
                backgroundImage: {
                  sm: "url(./ugc_landing.png)",
                  xs: "url(./ugc_landing_mobile.png)",
                },
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Box sx={{ minHeight: "40vh", position: "relative" }}>
              <img
                alt="memecoin"
                className="meme-coin"
                src="./meme-coin.png"
                width={isMobile ? 87 : 160}
                style={{
                  position: "absolute",
                  top: isMobile ? "-50px" : "-20px",
                  left: isMobile ? "28px" : "88px",
                  zIndex: 1,
                }}
              />
              <img
                alt="memecoin"
                className="ugc-coin"
                src="./ugc-coin.png"
                width={isMobile ? 87 : 160}
                style={{
                  position: "absolute",
                  top: isMobile ? "-50px" : "-120px",
                  right: isMobile ? "8px" : "130px",
                  zIndex: 1,
                }}
              />
              <img
                alt="memecoin"
                className="star-coin"
                src="./star-coin.png"
                width={isMobile ? 87 : 160}
                style={{
                  position: "absolute",
                  bottom: isMobile ? "40px" : "20px",
                  right: isMobile ? "20px" : "240px",
                  zIndex: 1,
                }}
              />
              <img
                alt="memecoin"
                className="abstract-coin"
                src="./abstract-coin.png"
                width={isMobile ? 87 : 160}
                style={{
                  position: "absolute",
                  bottom: isMobile ? "40px" : "-20px",
                  left: isMobile ? "20px" : "400px",
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  mb: 2,
                  mt: isMobile ? 6 : 16,
                  textAlign: isMobile ? "center" : "inherit",
                  flexDirection: "column",
                  gap: 4,
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box position="relative" display="inline-block">
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "To Japan",
                      fontSize: isMobile ? "62px" : "96px",
                      fontWeight: "900",
                      textShadow:
                        "7px 0 #000, -7px 0 #000, 0 7px #000, 0 -7px #000, 7px 7px #000, -7px -7px #000, 7px -7px #000, -7px 7px #000",
                      WebkitTextStroke: "0px #000000",
                      whiteSpace: "pre-wrap",
                      letterSpacing: "-10px",
                      lineHeight: 1.2,
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
                    {isMobile ? `PUMP\nYOUR\nBAGS` : `PUMP YOUR BAGS`}
                  </Typography>
                </Box>
                {isMobile && (
                  <Link href="/form">
                    <Button
                      size="small"
                      sx={{
                        width: "180px",
                        height: "48px",
                        border: "4px solid black",
                        backgroundColor: "#DCEC55",
                        borderRadius: 4,
                        marginRight: { xs: "0", sm: "20px" },
                        color: "white",
                        animation: "pressEffect 0.2s ease-in-out infinite", // Animation for Create Campaign
                        "&:hover": {
                          animation: "none", // Stops animation on hover
                          boxShadow: "2px 2px 0px black",
                          transform: "none",
                        },
                        transition: "transform 0.1s, box-shadow 0.1s",
                      }}
                    >
                      <CustomText
                        text="CREATE CAMPAIGN"
                        fontSize="20px"
                        fontFamily="Skrapbook"
                        fontStroke="5px"
                      />
                    </Button>
                  </Link>
                )}
              </Box>
              {/* Sub-header Section */}
              {!isMobile && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4,
                    mb: 14,
                    position: "relative",
                  }}
                >
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "To Japan",
                      color: "#FFFFFF",
                      position: "absolute",
                      fontSize: "20px",
                      WebkitTextStroke: "1px #000000",
                      textShadow:
                        "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -2px 2px #000",
                      textAlign: "center",
                    }}
                  >
                    EARN <span style={{ color: "#DCEC55" }}>REWARDS</span> BY
                    SHILLING MEMECOINS!!
                  </Typography>
                </Box>
              )}
            </Box>
            {/* Filter Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                flexWrap: "nowrap",
                gap: isMobile ? 6 : 0,
              }}
            >
              <CustomDropdown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
              <SearchBox
                sx={{ width: isMobile ? "100%" : "auto" }}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
              />
            </Box>
            {/* Campaigns Section */}
            <Box sx={{ p: 3, flexGrow: 1, zIndex: 20, position: "relative" }}>
              <Grid container spacing={4}>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CampaignCard campaign={campaign} />
                    </Grid>
                  ))
                ) : (
                  <Typography
                    component="div"
                    sx={{ textAlign: "center", width: "100%", mt: 4 }}
                    variant="h6"
                  >
                    No campaigns available
                  </Typography>
                )}
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                px: 4,
                position: "relative",
                zIndex: 20,
              }}
            >
              <Link
                href="/all-campaigns"
                style={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Skrapbook",
                    fontWeight: 400,
                    fontSize: "20px",
                    color: "#201C18",
                  }}
                >
                  View All Campaigns
                </Typography>
                <img
                  src="./ugc-right.svg"
                  alt="arrow-right"
                  width={20}
                  height={15}
                />
              </Link>
            </Box>
          </Box>
          {/* Footer */}
          <FooterSection />
        </Box>
      </main>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes rainbow-color-change {
          0% {
            color: #ffc23f;
          }
          16% {
            color: #c1ff6b;
          }
          33% {
            color: #6dffc0;
          }
          50% {
            color: #45b2ff;
          }
          66% {
            color: #4b45ff;
          }
          83% {
            color: #e646ff;
          }
          100% {
            color: #00ff36;
          }
          }
        }
      `}</style>
    </Box>
  );
};

export default Home;
