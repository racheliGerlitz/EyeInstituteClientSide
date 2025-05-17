import { createSlice } from "@reduxjs/toolkit";
import {  fetchAvailableAppointments } from "./thunk/appointmentsthunk";
const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
      appointments: [],
      doctorid: null,
      loading: false,
      error: null,
    },
    reducers: {
        setDoctorId: (state, action) => {
          state.doctorid = action.payload;
        },
    },
    extraReducers: (builder) => {
      
  
      // Handle fetchAvailableAppointments
      builder
        .addCase(fetchAvailableAppointments.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAvailableAppointments.fulfilled, (state, action) => {
          state.loading = false;
          state.appointments = action.payload;
        })
        .addCase(fetchAvailableAppointments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  export const { setDoctorId } = appointmentSlice.actions;
  export default appointmentSlice.reducer;