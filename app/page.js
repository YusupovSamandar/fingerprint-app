'use client'
import * as React from 'react';
import Table from './components/table';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export default function Home() {
  const [dateValue, setDateValue] = React.useState(dayjs('2022-04-17'));
  return (
    <main>
      <br />
      <div style={{ textAlign: 'center' }}>
        <DatePicker
          label="Choose Date"
          value={dateValue}
          onChange={(newValue) => setDateValue(newValue)}
        />
      </div>
      <br />
      <br />
      <Table />
    </main>
  )
}
