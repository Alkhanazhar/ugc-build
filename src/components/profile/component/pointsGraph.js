"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { dateMonth } from "../../../../utils/date";

export default function PointsGraph() {
  const myUgcXpHistory = useSelector((state) => state.profile.myUgcXpHistory);
  const [dataset, setDataSet] = React.useState([
    { date: "date", value: 10 },
    { date: "Feb", value: 0 },
    { date: "Mar", value: 0 },
    { date: "Apr", value: 0 },
    { date: "May", value: 0 },
    { date: "Jun", value: 0 },
    { date: "Jul", value: 0 },
    { date: "Aug", value: 0 },
    { date: "Sep", value: 0 },
    { date: "Oct", value: 0 },
    { date: "Nov", value: 0 },
    { date: "Dec", value: 0 },
  ]);

  React.useEffect(() => {
    const result = dateMonth(myUgcXpHistory);
    setDataSet(result);
  }, []);

  return (
    <Box
      style={{
        backgroundColor: "#F5F5F5",
        border: "2px solid #000000",
        padding: "10px 20px",
        borderRadius: "35px",
        boxShadow: "4px 4px 0px black",
      }}
    >
      <div style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataset}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "black",
                fontSize: 14,
                fontFamily: "Skrapbook",
              }}
            />
            <Bar
              dataKey="value"
              fill="#D9E76C"
              stroke="black"
              strokeWidth={2}
              radius={[10, 10, 10, 10]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
}
