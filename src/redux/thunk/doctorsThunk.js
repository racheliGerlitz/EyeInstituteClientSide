import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../api";

// Thunk to fetch doctors by specialization
export const fetchDoctorsBySpecialization = createAsyncThunk(
  'appointments/fetchDoctorsBySpecialization',
  async (specialization, { rejectWithValue }) => {
    try {
      const response = await api.get(`Doctor/choose-appointment/${specialization}`);
       return response.data.$values;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch doctors');
    }
  }
);
