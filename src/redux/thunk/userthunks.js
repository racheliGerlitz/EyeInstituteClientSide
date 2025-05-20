
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

// Check if the client exists (Login)
export const checkClientExists = createAsyncThunk(
  "user/checkClientExists",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`Client/check-client/${id}`);
      return response.data;
       // Ensure this returns the correct client details
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("Client not found");
      }
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);



// Sign up a new client
export const signUpClient = createAsyncThunk(
  "user/signUpClient",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('Client/sign-up', userData);
     return response.data; // Returns full client details
    } catch (error) {
      return rejectWithValue(error.response?.data || "Sign-up failed");
    }
  }
);