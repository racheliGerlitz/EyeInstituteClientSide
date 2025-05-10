import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Thunk to fetch doctors by specialization
export const fetchDoctorsBySpecialization = createAsyncThunk(
  'appointments/fetchDoctorsBySpecialization',
  async (specialization, { rejectWithValue }) => {
    try {
      const response = await api.get(`/Doctor/choose-appointment/${specialization}`);
      return response.data; // List of doctors
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch doctors');
    }
  }
);

// Thunk to fetch available appointments for a doctor
export const fetchAvailableAppointments = createAsyncThunk(
  'appointments/fetchAvailableAppointments',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/Appointment/appointments${doctorId}`);
      return response.data; // List of available appointments
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch appointments');
    }
  }
);

