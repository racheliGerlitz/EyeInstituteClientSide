import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorsBySpecialization, fetchDoctorsById, fetchAllDoctors } from "./thunk/doctorsThunk";
const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    loading: false,
    error: null,
    specialization: null,
    currentDoctor: null
  },
  reducers: {
    setSpecialization: (state, action) => {
      state.specialization = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchDoctorsBySpecialization
    builder
      .addCase(fetchDoctorsBySpecialization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsBySpecialization.fulfilled, (state, action) => {
        console.log("Doctors fetched from API:", action.payload); // חשוב!

        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsBySpecialization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDoctorsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDoctor = action.payload;
      })
      .addCase(fetchDoctorsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSpecialization } = doctorsSlice.actions;
export default doctorsSlice.reducer;