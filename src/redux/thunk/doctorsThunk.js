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

export const fetchDoctorsById = createAsyncThunk(
  'appointments/fetchDoctorsById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`Doctor/check-doctor/${id}`);
       return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch doctors');
    }
  }
);


export const fetchAllDoctors = createAsyncThunk(
  "doctors/fetchAllDoctors",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("Doctor"); // Change URL as needed
      console.log("Doctors fetched from API:", response.data); // Important for debugging
      return response.data.$values;
     
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);