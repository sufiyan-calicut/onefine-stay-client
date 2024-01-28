import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { useDispatch } from 'react-redux';
import { setCheckinDate, setCheckoutDate } from '../../../../reduxToolkit/searchSlice';
import 'react-calendar/dist/Calendar.css';
import './Navbar.css';

function MyCalendar() {
  const dispatch = useDispatch();
  const [date, setDate] = useState([]);

  const handleDateChange = (selectedDates) => {
    const [checkIn, checkOut] = selectedDates;
    if (checkIn && checkOut) {
      const checkInDate = checkIn.toLocaleString('default', {
        weekday: 'long', 
        day: 'numeric',
        month: 'long',
      });
      const checkOutDate = checkOut.toLocaleString('default', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
      dispatch(setCheckinDate(checkInDate));
      dispatch(setCheckoutDate(checkOutDate));
    }
    setDate(selectedDates);
  };

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <Calendar
      className="selected left-0 right-0 mx-auto mt- absolute z-10 w-96 overflow-auto tracking-tight"
      onChange={handleDateChange}
      value={date}
      activeStartDate={new Date()}
      showDoubleView
      selectRange
      minDate={minDate}
    />
  );
}

export default MyCalendar;
