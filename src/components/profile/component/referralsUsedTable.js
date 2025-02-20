import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material"; // Added Typography import

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
    fontWeight: "bold",
    padding: "14px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "14px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Mock data creation
function createData(name, joiningDate, pointsEarned) {
  return { name, joiningDate, pointsEarned };
}

const rows = [
  createData("Frozen yoghurt", "2023-01-15", "20K"),
  createData("Ice cream sandwich", "2023-02-18", "20K"),
  createData("Eclair", "2023-03-05", "20K"),
  createData("Cupcake", "2023-04-20", "20K"),
];

export default function ReferralsUsedTable() {
  return (
    <TableContainer
      sx={{
        border: "2px solid #000000",
        boxShadow: "2px 2px 0px black",
        backgroundColor: "#ffffff",
        borderRadius: "28px",
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left"></StyledTableCell>
            <StyledTableCell style={{ fontFamily: "Skrapbook" }} align="center">
              Joining Date
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "Skrapbook" }} align="right">
              Points Earned
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <img
                    src="./profile-icon.png"
                    alt={`${row.name}'s profile`}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "35%",
                      border: "1px solid #000000",
                    }}
                  />
                  <Typography
                    component="div"
                    sx={{
                      fontFamily: "Skrapbook",
                      fontSize: 14,
                      color: "black",
                    }}
                  >
                    @spootsy
                  </Typography>
                </Box>
              </StyledTableCell>
              <StyledTableCell
                style={{ fontFamily: "Skrapbook" }}
                align="center"
              >
                {row.joiningDate}
              </StyledTableCell>
              <StyledTableCell
                style={{ fontFamily: "Skrapbook" }}
                align="right"
              >
                {row.pointsEarned}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
