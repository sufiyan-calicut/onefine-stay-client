import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    booking:[]
  },
  reducers: {
    setBooking: (state, action) => {
      state.booking = action.payload;
    },
  },
});

export const {setBooking} = bookingSlice.actions;
export default bookingSlice.reducer;