import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent } from '@mui/material';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableAppointments, fetchMakeAnAppintment } from '../../redux/thunk/appointmentsthunk';

const SelectDate = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const dates = useSelector((state) => state.appointments.appointments);
  const doctorid = useSelector((state) => state.appointments.doctorid);
 const [showAppintment,setShowAppintment]=useState(false);
  const appointmentDetails=useSelector((state)=>state.appointments.appointments);
console.log(appointmentDetails);
  useEffect(() => {
    if (doctorid) {
      dispatch(fetchAvailableAppointments(doctorid));
    }
  }, [dispatch, doctorid]);

  const handleDateClick = async (date) => {
    setShowAppintment(true);
     await dispatch(fetchMakeAnAppintment({
      clientId: user.id,
      appointment: {
        id: date.id,
        date: date.date,
        hour: date.hour,
        doctorId: doctorid
      }
    })).unwrap();

    // if (result) {
    //   setAppointmentDetails({
    //     date: format(date.date, 'dd/MM/yyyy'),
    //     hour: date.hour,
    //     doctorId: date.doctorid // אם צריך להציג גם את שם הרופא או מידע נוסף
    //   });
    // }
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#003d5b' }}>
        בחר תאריך
      </Typography>
      
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><Typography variant="h6">תאריך</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">שעה</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {Array.isArray(dates) && dates.map((date, index) => (
    <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
      <TableCell align="center">
        <Typography variant="body1">
          {format(date.date, 'dd/MM/yyyy')}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Box>
          <Typography
            key={date.id}
            variant="body2"
            sx={{
              color: '#1976d2',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => handleDateClick(date)}
          >
            {`${new Date(date.date).getHours()}:${String(new Date(date.date).getMinutes()).padStart(2, '0')}`} {/* שליפת השעה והדקות */}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
      {showAppintment && (
        <Card sx={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e3f2fd' }}>
          <CardContent>
            <Typography variant="h6">
              קבעת תור  {appointmentDetails.date} בשעה: {appointmentDetails.hour}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SelectDate;
