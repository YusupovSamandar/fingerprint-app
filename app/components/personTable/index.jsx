'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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



export default function CustomizedTables({ rows }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell align="right">arrived At</StyledTableCell>
                        <StyledTableCell align="right">Left At</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.date}>
                            <StyledTableCell component="th" scope="row">
                                {new Date(row.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit' })}
                            </StyledTableCell>
                            <StyledTableCell align="right">{new Date(row.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</StyledTableCell>
                            <StyledTableCell align="right">{row.departureTime ? new Date(row.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : <HighlightOffIcon />}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}