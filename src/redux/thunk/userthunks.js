// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const checkClient = createAsyncThunk(
//   "clients/checkClient",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/clients/check-client/${id}`);
//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error("Client does not exist.");
//         }
//         throw new Error("An error occurred.");
//       }
//       const data = await response.json(); // Expecting JSON response now
//       return data; // Return the parsed JSON
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const signUpClient = createAsyncThunk(
//   "clients/signUpClient",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await fetch("/api/clients/sign-up", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to sign up");
//       }
//       const data = await response.json();
//       return data; // Assuming the response contains the client ID
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api";

// Check if the client exists (Login)
export const checkClientExists = createAsyncThunk(
  "user/checkClientExists",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`Client/check-client/${id}`);
      console.log("API Response:", response.data);
     
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
      console.log("API Response:", response.data);

     return response.data; // Returns full client details
    } catch (error) {
      return rejectWithValue(error.response?.data || "Sign-up failed");
    }
  }
);