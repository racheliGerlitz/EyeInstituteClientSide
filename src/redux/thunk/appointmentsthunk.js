import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';


// Thunk to fetch available appointments for a doctor
export const fetchAvailableAppointments = createAsyncThunk(
  'appointments/fetchAvailableAppointments',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/Appointment/appointments/${doctorId}`);
      return response.data.$values; // List of available appointments
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch appointments');
    }
  }
);

