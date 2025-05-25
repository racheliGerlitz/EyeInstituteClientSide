import { createSlice } from "@reduxjs/toolkit";
import {  fetchAvailableAppointments,fetchMakeAnAppintment,fetchClientAppointments,fetchdeleteAnAppointment } from "./thunk/appointmentsthunk";
const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
      appointments: [],
      userAppointments:[],
      titleAppointment:null,
      doctorid: null,
      loading: false,
      error: null,
    },
    reducers: {
        setDoctorId: (state, action) => {
          state.doctorid = action.payload;
        },
        setTitleAppointment: (state, action) => {
          state.titleAppointment = action.payload;
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
        })
     
        .addCase(fetchMakeAnAppintment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMakeAnAppintment.fulfilled, (state, action) => {
          state.loading = false;
          state.appointments = action.payload;
        })
        .addCase(fetchMakeAnAppintment.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(fetchClientAppointments.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchClientAppointments.fulfilled, (state, action) => {
          state.loading = false;
          state.userAppointments = action.payload.length > 0 ? action.payload : [];
        })
        .addCase(fetchClientAppointments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(fetchdeleteAnAppointment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchdeleteAnAppointment.fulfilled, (state, action) => {
          state.loading = false;
          state.appointments = action.payload;
        })
        .addCase(fetchdeleteAnAppointment.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
        
    },
  });
  export const { setDoctorId,setTitleAppointment } = appointmentSlice.actions;
  export default appointmentSlice.reducer;