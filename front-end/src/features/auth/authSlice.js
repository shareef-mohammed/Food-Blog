import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { name, accessToken } = action.payload;
      state.name = name;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.name = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.name;
export const selectCurrentToken = (state) => state.auth.token;
