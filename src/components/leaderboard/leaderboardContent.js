/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState, useEffect } from "react";
import CustomText from "../GeneralComponents/customText";
import { formatNumber } from "@/action/generalAction";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Popup from "./components/popup";
import { useGetAuthToken } from "@/action/authAction";
import { useSearchParams } from "next/navigation";

const leaderboardItems = Array.from({ length: 10 }, (_, index) => ({
  rank: index + 1,
  username: `@USER${index + 1}`,
  score: `${100 * (index + 1)}K`,
  points: `${3000 + index * 100}`,
}));
const MainQuestsContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("token_contract");
  const campaigns = useSelector((state) => state.campaigns?.items || {});
  const filteredCampaign = campaigns.find(
    (campaign) => campaign.token_contract === query
  );
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log("filteredCampaign", filteredCampaign);
  return (
    <Box
      sx={{
        maxHeight: "170vh",
        overflow: "auto",
        padding: { xs: "0px", sm: "10px 40px" },

        marginLeft: { xs: "0", sm: "10px" },
        "&::-webkit-scrollbar": {
          width: "12px !important",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#FFFFFF !important",
          borderRadius: "8px !important",
          border: "1px solid #000000 !important",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#201C18 !important",
          borderRadius: "8px !important",
          border: "1px solid #000000 !important",
        },
        "&::-webkit-scrollbar-button": {
          display: "none !important",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#333333 !important",
        },
        scrollbarWidth: "thin", // For Firefox
        scrollbarColor: "#201C18 #FFFFFF", // Thumb and track color for Firefox
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: "To Japan",
          fontSize: { sm: "36px", xs: "24px" },
          fontWeight: "100",
          marginBottom: "14px",
          lineHeight: "64.93px",
        }}
      >
        Let's Create!
      </Typography>
      <Box sx={{ marginLeft: { sm: "30px", xs: "10px" } }}>
        <Typography
          variant="p"
          sx={{
            fontFamily: "Garfiey",
            fontSize: { xs: "18px", sm: "24px" },
            fontWeight: "400",
            lineHeight: { xs: "14.55px", sm: "24.55px" },
          }}
        >
          You’ve made it this far, but now it’s time to prove yourself. The Meme
          Mafia doesn’t reward mediocrity—we reward legends. <br />
          <br />
          Create on X, tag the{" "}
          {filteredCampaign == null ? "$TICKER" : filteredCampaign.ticker}, and
          show me you’ve got what it takes. Memes, threads, art—whatever your
          weapon of choice, make it hit hard. <br />
          <br />
          Play by the rules, stay sharp, and keep it original. Remember, the
          streets of UGC.Fun are watching. Now go on, make me proud. - Boss
          Picatso 🐾
        </Typography>
      </Box>
      <Box
        sx={{
          padding: { sm: "26px 26px 26px 47px", xs: "10px 20px" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: { sm: "center", xs: "flex-start" },
          width: "100%",
          border: "4px solid #201C18",
          backgroundColor: "#ffffff",
          borderRadius: "35px",
          my: { sm: "80px", xs: "40px" },
          gap: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Garfiey",

            fontSize: { sm: "36px", xs: "24px" },
          }}
        >
          Post your first X tape
        </Typography>
        <Button
  onClick={() => {

    const twitterUsername = userInfo.name;
    // Create the tweet text
    const tweetText = `Check out ${filteredCampaign == null ? "$TICKER" : filteredCampaign.ticker}! 🚀\nhttps://ugc-fun.vercel.app/campaign?token_contract=${filteredCampaign.token_contract}\nUse my referral code to earn extra UGC XP: ${twitterUsername}`;
    
    // Encode the text for URL
    const encodedTweet = encodeURIComponent(tweetText);
    
    // Twitter web intent URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTweet}`;
    
    // Open in new window
    window.open(twitterUrl, '_blank');
  }}
  sx={{
    bgcolor: "#B74AFF",
    border: "3px solid #201C18",
    borderRadius: "25px",
    py: { sm: "14px", xs: "7px" },
    minWidth: { sm: "200px", xs: "100px" },
  }}
>
  <Typography
    sx={{
      fontFamily: "Skrapbook",
      fontSize: { sm: "32px", xs: "20px" },
      textShadow:
        "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -1px 1px #000",
      color: "#ffffff",
    }}
  >
    Start
  </Typography>
</Button>
      </Box>
      <Box sx={{ flexDirection: "column", display: "flex", gap: 4 }}>
        <Box sx={{ marginLeft: "30px" }}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "black",
                  borderRadius: "10px",
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "Garfiey",
                  fontSize: { sm: "24px", xs: "20px" },
                  lineHeight: { sm: "24.55px", xs: "20.55px" },
                  fontWeight: "400",
                }}
              >
                Things Picatso LIKES:
              </Typography>
            </Box>
            <Box sx={{ marginLeft: "30px" }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    fontSize: { sm: "24px", xs: "20px" },
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    fontWeight: "400",
                  }}
                >
                  ✅
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    marginBottom: "8px",
                    fontSize: { sm: "24px", xs: "20px" },
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    fontWeight: "400",
                  }}
                >
                  Create high-quality, original content: Nothing in this world
                  beats original, high-quality content. UGC.Fun is intentionally
                  designed to reward that!
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    fontSize: { sm: "24px", xs: "20px" },
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    fontWeight: "400",
                  }}
                >
                  ✅
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    fontSize: { sm: "24px", xs: "20px" },
                    marginBottom: "8px",
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    fontWeight: "400",
                  }}
                >
                  Engage with your audience: Respond to comments, ask questions,
                  and spark conversations. Build a community, not just
                  followers. Your Likes, Retweets, Comments - everything is
                  account to for. Plus we have strong anti-bot measures in
                  place.
                </Typography>
              </Box>
       
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Skrapbook",
                    fontSize: { sm: "24px", xs: "20px" },
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    fontWeight: "400",
                  }}
                >
                  ✅
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    fontSize: { sm: "24px", xs: "20px" },
                    marginBottom: "8px",
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    fontWeight: "400",
                  }}
                >
                  Tell your friend Boss Picatso is looking for more creators ;
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginLeft: "30px" }}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "black",
                  borderRadius: "10px",
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "Garfiey",
                  fontSize: { sm: "24px", xs: "20px" },
                  lineHeight: { sm: "24.55px", xs: "20.55px" },
                  fontWeight: "400",
                }}
              >
                Things Picatso DOES NOT LIKE:
              </Typography>
            </Box>
            <Box sx={{ marginLeft: "30px" }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Skrapbook",
                    fontSize: { sm: "24px", xs: "20px" },
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    fontWeight: "400",
                  }}
                >
                  ❌
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    fontSize: { sm: "24px", xs: "20px" },
                    marginBottom: "8px",
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    fontWeight: "400",
                  }}
                >
                  Spam self-promotion: Balance shilling with valuable, creative
                  content. Nobody likes overkill. Only ypur top 5 tweets will be
                  counted every 24 hours!
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Skrapbook",
                    fontSize: { sm: "24px", xs: "20px" },

                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    fontWeight: "400",
                  }}
                >
                  ❌
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    fontSize: { sm: "24px", xs: "20px" },
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    marginBottom: "8px",
                    fontWeight: "400",
                  }}
                >
                  Overshare personal details: Stay private. Protect your
                  identity and avoid unnecessary exposure.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Skrapbook",
                    fontSize: "24px",
                    fontWeight: "400",
                    lineHeight: "24.55px",
                  }}
                >
                  ❌
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    fontSize: { sm: "24px", xs: "20px" },
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    marginBottom: "8px",
                    fontWeight: "400",
                  }}
                >
                  Be negative or controversial: Avoid unnecessary drama and
                  conflicts. Keep the vibes positive.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Skrapbook",
                    fontSize: "24px",
                    fontWeight: "400",
                    lineHeight: "24.55px",
                  }}
                >
                  ❌
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    fontSize: { sm: "24px", xs: "20px" },
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    marginBottom: "8px",
                    fontWeight: "400",
                  }}
                >
                  Mention multiple $TICKRs in your tweet: one $TICKR in one
                  tweet! Only!
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Skrapbook",
                    fontSize: "24px",
                    fontWeight: "400",
                    lineHeight: "24.55px",
                  }}
                >
                  ❌
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "Garfiey",
                    fontSize: { sm: "24px", xs: "20px" },
                    lineHeight: { sm: "24.55px", xs: "20.55px" },
                    marginBottom: "8px",
                    fontWeight: "400",
                  }}
                >
                  Bot: Do not bot your tweets! Picatso's shooters will bot you
                  out!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const SideQuestsContent = () => (
  <Box
    sx={{
      maxHeight: "170vh",
      overflow: "auto",
      padding: { xs: "0px", sm: "10px 40px" },

      marginLeft: { xs: "0", sm: "10px" },
      "&::-webkit-scrollbar": {
        width: "12px !important",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#FFFFFF !important",
        borderRadius: "8px !important",
        border: "1px solid #000000 !important",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#201C18 !important",
        borderRadius: "8px !important",
        border: "1px solid #000000 !important",
      },
      "&::-webkit-scrollbar-button": {
        display: "none !important",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#333333 !important",
      },
      scrollbarWidth: "thin", // For Firefox
      scrollbarColor: "#201C18 #FFFFFF", // Thumb and track color for Firefox
    }}
  >
    {leaderboardItems.map((item) => (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        key={item.rank}
        style={{ marginBottom: "16px" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{
            border: "2px solid #000000",
            width: "100%",
            borderRadius: "35px",
            backgroundColor: "#ffffff",
          }}
          sx={{ padding: { xs: "4px", sm: "16px" } }}
        >
          <Grid item style={{ marginLeft: "16px" }}>
            <Typography
              component="div"
              style={{
                fontFamily: "Garfiey",
              }}
              sx={{ fontSize: { xs: "16px", sm: "30px" } }}
            >
              Add “JAK$” to your twitter username
            </Typography>
          </Grid>
          <Button
            size="small"
            sx={{
              width: { xs: "130px", sm: "200px" },
              height: { xs: "50px", sm: "80px" },
              border: "4px solid black",
              backgroundColor: "#B74AFF",
              borderRadius: 8,
              color: "white",
              marginLeft: { xs: "5px", sm: "20px" },
            }}
          >
            <CustomText
              text="VALIDATE"
              fontSize={"20px"}
              fontFamily="Skrapbook"
              fontStroke="5px"
            />
          </Button>
        </Box>
      </Box>
    ))}
  </Box>
);

const LeaderboardContentTab = ({ leaderboardDetail }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return leaderboardDetail != null ? (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            marginBottom: "16px",
            border: { sm: "10px solid #BAC841", xs: "5px solid #BAC841" },
            width: { sm: "90%", xs: "100%" },
            borderRadius: "45px",
          }}
        >
          <Box
            sx={{
              border: "2px solid #000000",
              width: "100%",
              borderRadius: "35px",
              backgroundColor: "#ffffff",
              padding: { sm: "16px", xs: "8px" },
            }}
          >
            <Grid container display="flex" justifyContent="space-between">
              <Grid item display="flex" alignItems="center">
                <Grid sx={{ padding: { sm: "0px 30px", xs: "0 8px" } }}>
                  <CustomText
                    text="1"
                    fontStroke="4px"
                    subTextColor="#BAC841"
                    fontSize={isMobile ? "16px" : "24px"}
                  />
                </Grid>
                <Grid container display="flex" alignItems="center">
                  <Grid item>
                    <Box
                      sx={{
                        height: { sm: "80px", xs: "40px" },
                        width: { sm: "80px", xs: "40px" },
                        borderRadius: { xs: "10px", sm: "25px" },
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={leaderboardDetail[0].image}
                        alt="User Avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: isMobile ? "10px" : "25px",
                          border: "2px solid #000000",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item sx={{ marginLeft: { sm: "16px", xs: "8px" } }}>
                    <Typography
                      component="div"
                      sx={{
                        fontFamily: "Skrapbook",
                        fontSize: { sm: "30px", xs: "14px" },
                      }}
                    >
                      {leaderboardDetail[0].name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                display="flex"
                alignItems="center"
                sx={isMobile ? { width: "40%" } : {}}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    border: "2px solid #BAC841",
                      backgroundColor: "#BAC841",
                    borderRadius: { sm: "25px", xs: "10px" },
                    height: { sm: "64px", xs: "41px" },
                    width: { sm: "180px", xs: "50px" },
                  }}
                >
                  <Typography
                    component="div"
                    style={{
                      color: "#ffffff",
                      fontFamily: "Skrapbook",
                      fontSize: "25px",
                      // fontSize: { sm: "50px", xs: "20px" },
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {leaderboardDetail[0].score}
                  </Typography>
                </Box>
                {/* <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    border: "2px solid #BAC841",
                    backgroundColor: "#BAC841",
                    borderRadius: "25px",
                    height: { sm: "64px", xs: "41px" },
                    width: { sm: "180px", xs: "78px" },
                    overflow: "hidden",
                    px: { sm: 0, xs: "8px" },
                    marginLeft: { sm: "16px", xs: "4px" },
                  }}
                >
                  <CustomText
                    text={formatNumber(3000)}
                    fontStroke="4px"
                    fontSize={isMobile ? "14px" : "20px"}
                  />
                </Box> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          maxHeight: "140vh",
          overflow: "auto",
          padding: { sm: "24px 70px", xs: "12px 0px" },
          marginTop: "16px",
          marginLeft: "10px",
          "&::-webkit-scrollbar": {
            width: "12px !important",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#FFFFFF !important",
            borderRadius: "8px !important",
            border: "1px solid #000000 !important",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#201C18 !important",
            borderRadius: "8px !important",
            border: "1px solid #000000 !important",
          },
          "&::-webkit-scrollbar-button": {
            display: "none !important",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#333333 !important",
          },
          scrollbarWidth: "thin", // For Firefox
          scrollbarColor: "#201C18 #FFFFFF", // Thumb and track color for Firefox
        }}
      >
        {leaderboardDetail.map((item) => (
          <Box
            display="flex"
            justifyContent="center"
            key={item.rank + 1}
            style={{ marginBottom: "16px" }}
          >
            <Box
              sx={{
                border: "2px solid #000000",
                width: "100%",
                borderRadius: "35px",
                backgroundColor: "#ffffff",
                padding: { sm: "16px", xs: "8px" },
              }}
            >
              <Grid container display="flex" justifyContent="space-between">
                <Grid item display="flex" alignItems="center">
                  <Grid sx={{ padding: { sm: "0px 30px", xs: "0 8px" } }}>
                    <CustomText
                      text={item.rank + 1}
                      fontStroke="4px"
                      subTextColor="#BAC841"
                      fontSize={isMobile ? "16px" : "24px"}
                    />
                  </Grid>
                  <Grid container display="flex" alignItems="center">
                    <Grid item>
                      <Box
                        sx={{
                          height: { sm: "80px", xs: "40px" },
                          width: { sm: "80px", xs: "40px" },
                          borderRadius: { xs: "10px", sm: "25px" },
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={item.image}
                          alt="User Avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: isMobile ? "10px" : "25px",
                            border: "2px solid #000000",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item sx={{ marginLeft: { sm: "16px", xs: "8px" } }}>
                      <Typography
                        component="div"
                        sx={{
                          fontFamily: "Skrapbook",
                          fontSize: { sm: "30px", xs: "14px" },
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  display="flex"
                  alignItems="center"
                  sx={isMobile ? { width: "40%" } : {}}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      border: "2px solid #BAC841",
                      backgroundColor: "#BAC841",
                      borderRadius: { sm: "25px", xs: "10px" },
                      height: { sm: "64px", xs: "41px" },
                      width: { sm: "180px", xs: "50px" },
                    }}
                  >
                    <Typography
                      component="div"
                      style={{
                        color: "#ffffff",
                        fontFamily: "Skrapbook",
                        fontSize: "25px",
                        // fontSize: { sm: "50px", xs: "20px" },
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.score}
                    </Typography>
                  </Box>
                  {/* <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      border: "2px solid #BAC841",
                      backgroundColor: "#BAC841",
                      borderRadius: "25px",
                      height: { sm: "64px", xs: "41px" },
                      width: { sm: "180px", xs: "78px" },
                      overflow: "hidden",
                      px: { sm: 0, xs: "8px" },
                      marginLeft: { sm: "16px", xs: "4px" },
                    }}
                  >
                    <CustomText
                      text={formatNumber(3000)}
                      fontStroke="4px"
                      fontSize={isMobile ? "14px" : "20px"}
                    />
                  </Box> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  ) : (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography style={{ fontFamily: "Garfiey" }}>
        No one has joined this campaign yet. Be the first one to join
      </Typography>
    </Box>
  );
};

export default function LeaderboardData({ joinNowState }) {
  const [currentContent, setCurrentContent] = useState("Picatso's Order");
  const [leaderboardData, setLeaderboardData] = useState(null);
  const leaderboardDetail = useSelector((state) => state.leaderboard.items);
  const { connectWallet, handleOpenTwitterConnectWindow } = useGetAuthToken();

  useEffect(() => {
    setLeaderboardData(leaderboardDetail);
    console.log("leaderboard data in LeaderboardContent " + leaderboardDetail);
  }, [leaderboardDetail]);

  const renderContent = () => {
    switch (currentContent) {
      case "Picatso's Order":
        return <MainQuestsContent />;
      case "leaderboard":
        return (
          <LeaderboardContentTab
            leaderboardDetail={JSON.parse(leaderboardData)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      style={{
        padding: "20px",
        backgroundColor: "#5B6220",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {joinNowState === "WALLET_NOT_CONNECTED" ? (
        <Popup
          message={"Connect Your Wallet First, Partner!"}
          subMessage={
            "To view all the stats and extra points to be earned you need to connect your Wallet"
          }
          buttonText={"Connect Wallet"}
          onClick={() => connectWallet}
        />
      ) : joinNowState === "WALLET_CONNECTED" ? (
        <Popup
          message={"Looks like your X isn’t connected ;-;"}
          subMessage={
            "To view all the stats and extra points to be earned you need to connect your X account"
          }
          buttonText={"Connect X"}
          onClick={() => handleOpenTwitterConnectWindow}
        />
      ) : null}
      <Box
        style={{
          marginTop: "20px",
          borderRadius: "35px 35px 0px 0px",
          backgroundColor: "#FFF2C9",
          // height: "200vh",
          minHeight: "100vh",
        }}
      >
        {/* Tab Buttons */}
        <Grid
          container
          style={{ backgroundColor: "#BAC841" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="35px 35px 35px 35px"
          sx={{
            flexWrap: "nowrap",
            gap: { xs: "6px", sm: 0 },
            height: { xs: "74px", sm: "124px" },
          }}
        >
          {["Picatso's Order", "leaderboard"].map((tab) => (
            <Grid item key={tab}>
              <Button
                variant="contained"
                onClick={() => setCurrentContent(tab)}
                style={{
                  height: "50px",
                  boxShadow: "none",
                  margin: "10px",
                  borderRadius: "20px",
                  border: "3px solid black",
                  fontFamily: "Skrapbook",
                  backgroundColor:
                    currentContent === tab ? "#DCEC55" : "#FFFFFF",
                  color: "#000000",
                  lineHeight: "15px",
                  padding: 0,
                }}
                sx={{
                  flex: 1,
                  width: { xs: "100%", sm: "200px" },
                }}
              >
                {tab.toUpperCase().replace(/_/g, " ")}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ padding: { xs: "12px", sm: "24px" } }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}
