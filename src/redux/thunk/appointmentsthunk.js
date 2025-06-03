import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';


// Thunk to fetch available appointments for a doctor
export const fetchAvailableAppointments = createAsyncThunk(
  'appointments/fetchAvailableAppointments',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await api.get(`Appointment/appointments/${doctorId}`);
      return response.data.$values; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch appointments');
    }
  }
);

export const fetchMakeAnAppintment = createAsyncThunk(
  'appointments/fetchMakeAnAppintment',
  async ({ clientId, appointment }, { rejectWithValue }) => {
    try {
      const response = await api.put(`Appointment/${clientId}`, JSON.stringify(appointment), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data // List of available appointments
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to make an appointment');
    }
  }
);

export const fetchClientAppointments = createAsyncThunk(
  'appointments/fetchClientAppointments',
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await api.get(`Appointment/ClientAppointments/${clientId}`);
      return response.data.$values; // List of available appointments
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch appointments');
    }
  }
);

export const fetchdeleteAnAppointment = createAsyncThunk(
  'appointments/fetchdeleteAnAppointment',
  async (appointment, { rejectWithValue }) => {
    try {
      const response = await api.put(`Appointment/deleteAppointment`,appointment);
      return response.data; // List of available appointments
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch appointments');
    }
  }
);