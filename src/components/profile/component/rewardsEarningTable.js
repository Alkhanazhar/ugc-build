import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { CustomLoader } from "@/components/GeneralComponents/customLoader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#DCEC56",
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  border: "none",
  [theme.breakpoints.down("sm")]: {
    padding: "8px 4px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:not(:last-child)": {
    borderBottom: "2px solid white",
  },
}));

const CustomText = ({ textValue }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        component="div"
        sx={{
          fontFamily: "To Japan",
          color: "black",
          position: "absolute",
          fontSize: isMobile ? "10px" : "16px",
          textAlign: "center",

          fontWeight: "bold",
          WebkitTextStroke: isMobile ? "1px #000000" : "2px #000000",
          zIndex: 1,
          display: { xs: "none", sm: "block" },
        }}
      >
        {textValue}
      </Typography>
      <Typography
        component="div"
        sx={{
          fontFamily: "To Japan",
          color: "#FFFFFF",
          position: "relative",
          fontSize: isMobile ? "10px" : "16px",
          zIndex: 3,
          textAlign: "center",
          WebkitTextStroke: "1px #000000",
        }}
      >
        {textValue}
      </Typography>
    </Box>
  );
};

export default function RewardsEarningTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [myRewardsValue, setMyRewardsValue] = useState(null);

  const myRewards = useSelector((state) => state.profile.myRewards);

  useEffect(() => {
    setMyRewardsValue(myRewards);
  }, [myRewards]);

  if (!myRewardsValue) {
    return <CustomLoader />;
  }

  const tableHeaders = [
    { id: "name", label: "Campaign Name", align: "left" },
    { id: "score", label: "Score", align: "center" },
    {
      id: "ugc",
      label: isMobile ? "UGC Pts" : "UGC XP Earned",
      align: "center",
    },
    {
      id: "tokens",
      label: isMobile ? "Tokens" : "Token Earned",
      align: "center",
    },
  ];

  return (
    <Box sx={{ mt: 4, px: { xs: 1, sm: 2 } }}>
      <Typography
        component="div"
        sx={{
          fontFamily: "Skrapbook",
          fontSize: { xs: "24px", sm: "30px" },
          ml: 2,
        }}
      >
        Earnings
      </Typography>
      <TableContainer
        sx={{
          border: "2px solid #000000",
          boxShadow: "2px 2px 0px black",
          backgroundColor: "#ffffff",
          borderRadius: { xs: "14px", sm: "28px" },
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
        }}
      >
        <Table
          sx={{ minWidth: { xs: 300, sm: 700 }, width: "100%" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <StyledTableCell
                  key={header.id}
                  align={header.align}
                  sx={{
                    borderRadius: {
                      xs:
                        index === 0
                          ? "14px 0 0 14px"
                          : index === tableHeaders.length - 1
                          ? "0 14px 14px 0"
                          : "0",
                      sm:
                        index === 0
                          ? "25px 0 0 25px"
                          : index === tableHeaders.length - 1
                          ? "0 25px 25px 0"
                          : "0",
                    },
                  }}
                >
                  <CustomText textValue={header.label} />
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {myRewardsValue.length > 0 ? (
              JSON.parse(myRewardsValue).map((row) => (
                <StyledTableRow key={row.campaign_name}>
                  <StyledTableCell
                    sx={{
                      borderRadius: {
                        xs: "14px 0 0 14px",
                        sm: "25px 0 0 25px",
                      },
                    }}
                    component="th"
                    scope="row"
                  >
                    <Typography
                      style={{
                        fontFamily: "Garfiey",
                        fontSize: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {row.campaign_name}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      style={{
                        fontFamily: "Garfiey",
                        fontSize: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {row.total_score}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      style={{
                        fontFamily: "Garfiey",
                        fontSize: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {row.ugc_xp}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ borderRadius: "0 25px 25px 0" }}
                    align="center"
                  >
                    <Typography
                      style={{
                        fontFamily: "Garfiey",
                        fontSize: "20px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {row.total_tokens}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={tableHeaders.length} align="center">
                  <Typography
                    sx={{
                      fontFamily: "Garfiey",
                      fontSize: isMobile ? "12px" : "24px",
                      fontWeight: 400,
                    }}
                  >
                    No Earnings
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
