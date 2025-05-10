// import { createSlice } from "@reduxjs/toolkit";
// import { checkClient } from "./thunk";

// const clientSlice = createSlice({
//   name: "client",
//   initialState: {
//     id: null,
//     status: "idle", // idle | loading | succeeded | failed
//     error: null, // Error message if needed
//   },
//   reducers: {
//     clearClientData: (state) => {
//       state.id = null;
//       state.status = "idle";
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(checkClient.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(checkClient.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.id = action.payload.id; // Assuming payload contains an `id` field
//       })
//       .addCase(checkClient.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload; // Store the error message
//       });
//   },
// });

// export const { clearClientData } = clientSlice.actions;

// export default clientSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { checkClientExists, signUpClient } from "./thunk/userthunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Stores full client details
    status: "idle", // Tracks API call status
    error: null, // Stores error messages
  },
  reducers: {},
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

export default userSlice.reducer;