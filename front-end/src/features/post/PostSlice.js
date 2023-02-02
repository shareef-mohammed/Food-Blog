import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: { post:'' },
  reducers: {
    setPostCredentials: (state, action) => {
        
      const name  = action.payload;
      state.name = name;
      
    },
  },
});

export const { setPostCredentials } = postSlice.actions;

export default postSlice.reducer;

export const selectCurrentPost = (state) => state.post.name;

