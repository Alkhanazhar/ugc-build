"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";

// Custom styled TextField
const CustomTextFieldStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    height: "40px",
    backgroundColor: "#ffffff",
    "& fieldset": {
      borderColor: "black",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& input": {
    textAlign: "center",
    fontFamily: "Skrapbook",
    height: "40px",
    padding: "0 10px",
  },
}));

export default function CustomTextField({
  label,
  placeholder,
  disable,
  value,
  onChange,
  onBlur,
  // isLoading,
  // isShowLoading = false,
}) {
  // const [isFetched, setIsFetched] = useState(false);

  // useEffect(() => {
  //   // Simulate fetching status
  //   if (!isLoading && value) {
  //     setIsFetched(true);
  //   } else {
  //     setIsFetched(false);
  //   }
  // }, [isLoading, value]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        component="div"
        sx={{
          fontFamily: "Skrapbook",
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <CustomTextFieldStyle
        id="outlined-basic"
        variant="outlined"
        placeholder={placeholder}
        disabled={disable}
        value={value}
        onChange={onChange}
        onBlur={onBlur ? onBlur : null}
        // inputProps={{
        //   endadornment:
        //     isShowLoading && value.length === 42 ? (
        //       isLoading ? (
        //         <CircularProgress size={20} />
        //       ) : isFetched ? (
        //         <CheckCircleIcon sx={{ color: "green" }} />
        //       ) : null
        //     ) : null,
        // }}
      />
    </Box>
  );
}
