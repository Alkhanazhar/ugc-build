"use client";

"use client";
import { useHomeAction } from "@/action/homeAction";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import React from 'react';

import CampaignCard from "@/components/GeneralComponents/campaignCard";
import { CustomLoader } from "@/components/GeneralComponents/customLoader";
import NavBar from "@/components/GeneralComponents/navbar";
import CustomDropdown from "@/components/Home/customDropdown";
import SearchBox, { useSearchFilter } from "@/components/Home/searchBox";

const AllCampaignsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { fetchCampaigns, fetchConstant } = useHomeAction();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = React.useState("Graduating");

  useEffect(() => {
    const fetchData = async () => {
      await fetchConstant();
    };
    fetchData();
  }, []);

  const fetchCampaignsMemoized = useCallback(fetchCampaigns, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchCampaigns();
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchCampaignsMemoized]);

  const campaigns = useSelector((state) => state.campaigns?.items || {});
  const { filteredCampaigns, searchTerm, handleSearchChange } =
    useSearchFilter(campaigns);

  const isCampaignsLoaded = campaigns.length > 0;

  if (isLoading && !isCampaignsLoaded) {
    return <CustomLoader />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { sm: 12, xs: 2 },
        mb: 6,
      }}
    >
      <Box
        sx={{
          backgroundImage: "url(./ugc-all.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100dvh",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <NavBar />
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
      <Box
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, sm: 10 }}
          sx={{ maxWidth: { sm: "80%" } }}
        >
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <Grid
                item
                xs={12}
                sm={6}
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
    </Box>
  );
};

export default AllCampaignsPage;
