'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = [
  { id: 'fullName', label: 'Full-Name' },
  {
    id: 'timeOfArrival',
    label: 'Arrived At',
    align: 'right',
    format: (value) => value === 'none' ? <HighlightOffIcon /> : value,
  },
  {
    id: 'timeOfDeparture',
    label: 'Left At',
    align: 'right',
    format: (value) => value === 'none' ? <HighlightOffIcon /> : value,
  }
];

function createData(fullName, timeOfArrival, timeOfDeparture) {
  return { fullName, timeOfArrival, timeOfDeparture };
}

const rows = [
  createData('Samandar Yusupov', '09:00', '19:20'),
  createData("Ikromjon Mo'ydinov", '12:30', 'none'),
  createData('Abdurashid Abdullayev', '05:00', '23:04'),
  createData('Xojakbar Abdujabborov', '16:00', 'none'),
  createData('Jasur Erkinov', 'none', 'none'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, ind) => (
                <StyledTableCell
                  key={ind}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, ind) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={ind}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {(column.id === 'timeOfArrival' && value === 'none') ||
                            (column.id === 'timeOfDeparture' && value === 'none')
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, { label: 'All', value: -1 }]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}