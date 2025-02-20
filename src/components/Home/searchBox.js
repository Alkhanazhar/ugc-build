"use client";
import React, { useState, useMemo, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import useMediaQuery from "@mui/material/useMediaQuery";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: {sm: "24px", xs: "12px"},
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
