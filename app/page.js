'use client'
import * as React from 'react';
import Table from './components/table';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';

const rows = [
  {
    "fullName": "Samandar Yusupov",
    "timeOfArrival": "09:00",
    "timeOfDeparture": "19:20"
  },
  {
    "fullName": "Ikromjon Mo'ydinov",
    "timeOfArrival": "12:30",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "Abdurashid Abdullayev",
    "timeOfArrival": "05:00",
    "timeOfDeparture": "23:04"
  },
  {
    "fullName": "Xojakbar Abdujabborov",
    "timeOfArrival": "16:00",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "Jasur Erkinov",
    "timeOfArrival": "none",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "kamron Yusupov",
    "timeOfArrival": "09:00",
    "timeOfDeparture": "19:20"
  },
  {
    "fullName": "Durbek Mo'ydinov",
    "timeOfArrival": "12:30",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "qora Abdullayev",
    "timeOfArrival": "05:00",
    "timeOfDeparture": "23:04"
  },
  {
    "fullName": "jasur Abdujabborov",
    "timeOfArrival": "16:00",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "eshmat Erkinov",
    "timeOfArrival": "none",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "Toshmat Yusupov",
    "timeOfArrival": "09:00",
    "timeOfDeparture": "19:20"
  },
  {
    "fullName": "iflos Mo'ydinov",
    "timeOfArrival": "12:30",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "chos Abdullayev",
    "timeOfArrival": "05:00",
    "timeOfDeparture": "23:04"
  },
  {
    "fullName": "doe log",
    "timeOfArrival": "16:00",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "vvalie Erkinov",
    "timeOfArrival": "none",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "firekracker Yusupov",
    "timeOfArrival": "09:00",
    "timeOfDeparture": "19:20"
  },
  {
    "fullName": "bowler Mo'ydinov",
    "timeOfArrival": "12:30",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "princess Abdullayev",
    "timeOfArrival": "05:00",
    "timeOfDeparture": "23:04"
  },
  {
    "fullName": "prince Abdujabborov",
    "timeOfArrival": "16:00",
    "timeOfDeparture": "none"
  },
  {
    "fullName": "barrel Erkinov",
    "timeOfArrival": "none",
    "timeOfDeparture": "none"
  }
];

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

export default function Home() {
  const [dateValue, setDateValue] = React.useState(dayjs('2022-04-17'));
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
          <TextField id="input-with-sx" label="Search..." variant="standard" />
        </Box>
      </div>
      <br />
      <br />
      <Table rows={rows} columns={columns} />
    </main>
  )
}
