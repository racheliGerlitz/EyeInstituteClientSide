import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorsBySpecialization, fetchAvailableAppointments } from "./thunk/appointmentsthunk";
const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
      doctors: [],
      appointments: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      // Handle fetchDoctorsBySpecialization
      builder
        .addCase(fetchDoctorsBySpecialization.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDoctorsBySpecialization.fulfilled, (state, action) => {
          state.loading = false;
          state.doctors = action.payload;
        })
        .addCase(fetchDoctorsBySpecialization.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  
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
  
  export default appointmentSlice.reducer;