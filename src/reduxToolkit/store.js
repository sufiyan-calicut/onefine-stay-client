import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import alertReducer from './alertsReducer';
import searchSlice from './searchSlice';
import bookingSlice from './hotelBookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    alerts: alertReducer,
    search: searchSlice,
    booking: bookingSlice,
  },
});

export default store;
