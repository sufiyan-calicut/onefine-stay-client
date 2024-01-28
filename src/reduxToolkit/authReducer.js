import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: false,
  reducers: {
    doAuthenticate: (state, action) => {
      return (state = true);
    },
    removeAuthentication: (state, action) => {
      return (state = false);
    },
  },
});

//  actions alredy toolkit eyudhivechitund console cheydhl ariyam just use cheydhal madhi

export const { doAuthenticate, removeAuthentication } = authSlice.actions;

export default authSlice.reducer;
