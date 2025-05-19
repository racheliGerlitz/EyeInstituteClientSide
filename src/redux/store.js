import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './userSlice'; // Handles user-related state
import appointmentReducer from './appointmentSlice'; // Handles appointment-related state
import doctorsReducer from './doctorsSlice';

export const store = configureStore({
  reducer: {
    user: clientReducer, // User slice
    appointments: appointmentReducer, // Appointment slice
    doctors: doctorsReducer, // Doctors slice
  },
});

export default store;