import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (state, action) => action.payload,
    logout: (state, action) => null
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
