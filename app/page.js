'use client';
import * as React from 'react';
import Table from './components/table';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import axios from 'axios';
import Link from 'next/link';
import { API_URL } from './apiConfig';
import Paper from '@mui/material/Paper';


const columns = [
  { id: 'fullName', label: 'Full-Name' },
  {
    id: 'arrivalTime',
    label: 'Arrived At',
    align: 'right',
    format: (value) => value === '-' ? <HighlightOffIcon /> : new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 'departureTime',
    label: 'Left At',
    align: 'right',
    format: (value) => value === '-' ? <HighlightOffIcon /> : new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
];

export default function Home() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [dateValue, setDateValue] = React.useState(dayjs(formattedDate));
  const [searchFieldValue, setSearchFieldValue] = React.useState([]);
  const [allTodaysData, setAllTodaysData] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      const { data: registeredStaffDT } = await axios.get(`${API_URL}/api/staff`);

      const requestingDateFormatted = `${dateValue.$y}-${("" + (dateValue.$M + 1)).padStart(2, '0')}-${("" + dateValue.$D).padStart(2, '0')}`;
      const { data: attendanceRecords } = await axios.get(`${API_URL}/api/attendance/with-date?date=${requestingDateFormatted}`);

      const staffIdsPresent = attendanceRecords.map((r) => r.fingerId);

      const updatedAttendanceRecords = registeredStaffDT.map((perStaff) => {
        if (staffIdsPresent.includes(perStaff.fingerId)) {
          const foundAttendance = attendanceRecords.find((record) => record.fingerId === perStaff.fingerId);
          return {
            ...foundAttendance,
            departureTime: foundAttendance.departureTime ? foundAttendance.departureTime : '-',
            fullName: perStaff.fullName
          }
        } else {
          return {
            fingerId: perStaff.fingerId,
            arrivalTime: "-",
            departureTime: "-",
            fullName: perStaff.fullName
          }
        }
      });
      setRows(updatedAttendanceRecords);
      setAllTodaysData(updatedAttendanceRecords);
    })();
  }, [dateValue]);

  return (
    <main>
      <br />
      <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexWrap: 'wrap', gap: "40px" }}>
        <DatePicker
          label="Choose Date"
          value={dateValue}
          onChange={(newValue) => setDateValue(newValue)}
        />
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <PersonSearchRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search..."
            variant="standard"
            value={searchFieldValue}
            onChange={(e) => {
              const currentWord = e.target.value.toLowerCase();
              const newRows = allTodaysData.filter((obj) => obj.fullName.toLowerCase().includes(currentWord.trim()));
              setRows(newRows);
              setSearchFieldValue(currentWord);
            }}
          />
        </Box>
      </div>
      <br />
      <hr />
      <br />
      {
        rows.length > 0 ?
          <Paper elevation={3} style={{ margin: "10px" }}>
            <Table rows={rows} columns={columns} />
          </Paper>
          : <h4 style={{ textAlign: "center" }} >no data to display</h4>
      }
      <p>
        Staff members {"->"} <Link style={{ color: "blue" }} href={"/staff"}>
          Staff List
        </Link>
      </p>
    </main>
  )
}
