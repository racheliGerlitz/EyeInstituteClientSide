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
      appointmentOptions :[
          { id: 1, title: 'בדיקת ראייה כללית', imageUrl: '/images/בדיקת ראיה.jpg' ,value:"אופטומטריסט"},
          { id: 2, title: 'בדיקת התאמה לפני ניתוחי עיניים', imageUrl: '/images/רפואה (49).jpg',value:"אופטומטריסט" },
          { id: 3, title: 'טיפולים שונים בעיניים – דלקות, יובש, גלאוקומה ועוד', imageUrl: '/images/הרכבת עדשות.jpg',value:"רופא" },
          { id: 4, title: 'ייעוץ עם מומחה', imageUrl: '/images/57.jpg' ,value:"רופא"},
          { id: 5, title: 'ניתוחי קטרקט', imageUrl: '/images/מכשיר בדיקת ראיה.jpg',value:"קטרקט" },
          { id: 6, title: 'ניתוחי לייזר להסרת משקפיים', imageUrl: '/images/משקפיים (2).jpg',value:"לייזר" }
        ]
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