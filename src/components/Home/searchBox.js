"use client";
import React, { useState, useMemo, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import useMediaQuery from "@mui/material/useMediaQuery";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: { sm: "24px", xs: "12px" },
  backgroundColor: "#ffffff",
  boxShadow: "4px 4px 0px black",
  border: "2px solid #000000",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    width: "540px",
    height: "70px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: "52px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#000000",
  backgroundColor: "#DCEC55",
  padding: "2px 10px",
  borderRadius: "16px",
  fontSize: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
    padding: "2px 8px",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  paddingRight: "56px",
  fontFamily: "Skrapbook",
  fontSize: "24px",
  height: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      padding: theme.spacing(1),
    },
  },
}));

export const useSearchFilter = (initialCampaigns) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCampaigns = useMemo(() => {
    if (!searchTerm) return initialCampaigns;

    const lowerCaseSearch = searchTerm.toLowerCase();
    return initialCampaigns.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(lowerCaseSearch) ||
        campaign.token_contract.toLowerCase().includes(lowerCaseSearch) ||
        campaign.ticker.toLowerCase().includes(lowerCaseSearch)
    );
  }, [initialCampaigns, searchTerm]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return { filteredCampaigns, searchTerm, handleSearchChange };
};

export const useCampaignFilter = (initialCampaigns) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("GRADUATING");

  // Predefined status options
  const statusOptions = ["All", "LIVE", "STARTING", "GRADUATING"];

  const filteredCampaigns = useMemo(() => {
    // If no campaigns, return empty array
    if (!initialCampaigns || initialCampaigns.length === 0) return [];

    // If no filters applied, return original array
    if (selectedOption === "All" && !searchTerm) return initialCampaigns;

    return initialCampaigns.filter((campaign) => {
      // Case-insensitive status matching
      const statusMatch =
        selectedOption === "All" ||
        campaign.status.toLowerCase() === selectedOption.toLowerCase();

      // Return status match if no search term
      if (!searchTerm) return statusMatch;

      // Search term filtering
      const lowerCaseSearch = searchTerm.toLowerCase();
      const searchMatch =
        campaign.name.toLowerCase().includes(lowerCaseSearch) ||
        campaign.token_contract.toLowerCase().includes(lowerCaseSearch) ||
        campaign.ticker.toLowerCase().includes(lowerCaseSearch);

      return statusMatch && searchMatch;
    });
  }, [initialCampaigns, searchTerm, selectedOption]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleOptionChange = useCallback((event) => {
    setSelectedOption(event.target.value);
  }, []);

  return {
    filteredCampaigns,
    searchTerm,
    selectedOption,
    statusOptions,
    handleSearchChange,
    handleOptionChange,
    setSelectedOption,
  };
};
export default function SearchBox({ searchTerm, onSearchChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Search>
      <StyledInputBase
        placeholder={
          isMobile
            ? "SEARCH TICKER OR CONTRACT >.<"
            : "SEARCH YOUR TICKER OR CONTRACT ADDRESS >.<"
        }
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={onSearchChange}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}
