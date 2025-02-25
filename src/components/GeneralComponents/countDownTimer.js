import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { calculateTimeRemaining } from "@/action/generalAction";

const CountdownTimer = ({ epochStartTime, epochEndTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    useState(calculateTimeRemaining(epochStartTime, epochEndTime))
  );

  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      const updatedTime = calculateTimeRemaining(epochStartTime, epochEndTime);
      setTimeRemaining(updatedTime);

      // Clear interval if time is up
      if (updatedTime === "Time is up!") {
        clearInterval(timer);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [epochStartTime, epochEndTime]);

  // Return "Time is up!" if the countdown has ended
  if (timeRemaining === "Time is up!") {
    return (
      <Grid item>
        <Typography
          component="div"
          sx={{ fontFamily: "Skrapbook", marginLeft: "16px" }}
        >
          Time is up!
        </Typography>
      </Grid>
    );
  }

  if (!timeRemaining) {
    return;
  }

  // Display the remaining time
  return (
    <Grid item>
      <Typography
        component="div"
        sx={{ fontFamily: "Skrapbook", marginLeft: "16px" }}
      >
        {timeRemaining.hours}H {timeRemaining.minutes}M
      </Typography>
    </Grid>
  );
};

export default CountdownTimer;
