
import { createSlice } from "@reduxjs/toolkit";
import { checkClientExists, signUpClient } from "./thunk/userthunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Stores full client details
    status: "idle", // Tracks API call status
    error: null, // Stores error messages
  },
  reducers: {
    setUser: (state) => {
      state.user = null;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkClientExists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkClientExists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Store full client details
      })
      .addCase(checkClientExists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.user = null;
      })
      .addCase(signUpClient.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Store full client details
      })
      .addCase(signUpClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setUser } =  userSlice.actions;

export default userSlice.reducer;