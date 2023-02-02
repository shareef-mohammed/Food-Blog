import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: { location:'' },
  reducers: {
    setLocationCredentials: (state, action) => {
        
      const name  = action.payload;
      state.name = name;
      
    },
  },
});

export const { setLocationCredentials } = locationSlice.actions;

export default locationSlice.reducer;

export const selectCurrentLocation = (state) => state.location.name;

