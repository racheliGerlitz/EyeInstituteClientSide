import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import { he } from 'date-fns/locale'; // ייבוא של השפה העברית
import { addDays } from 'date-fns';

const SelectDate = () => {
  // פונקציה לחישוב כל התאריכים בחודש הקרוב
  const [dates, setDates] = useState([]);
  
  useEffect(() => {
    const today = new Date();
    const endDate = addDays(today, 30); // 30 יום קדימה מהיום
    const days = eachDayOfInterval({ start: today, end: endDate });
    setDates(days);
  }, []);
  

  // תצוגת תורים פנויים לדוגמה
  const getAvailableAppointments = (date) => {
    // אם היום שבת (יום 6 בשבוע), מחזירים מערך ריק (לא יהיו תורים)
    if (date.getDay() === 6) {
      return []; // אין תורים בשבת
    }
    return ['09:00', '11:00', '14:00']; // תורים לדוגמה
  };

  // פונקציה שתתבצע כאשר לוחצים על שעה
  const handleTimeClick = (time) => {
    // לדוגמה, אפשר להציג את השעה שנבחרה או לבצע פעולה אחרת
    alert(`בחרת את השעה: ${time}`);
    // אפשר לעדכן את הסטייט או לבצע ניתוב לעמוד אחר
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
              <TableCell align="center"><Typography variant="h6">יום בשבוע</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">תאריך</Typography></TableCell>
              <TableCell align="center"><Typography variant="h6">תורים פנויים</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dates.map((date, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
                <TableCell align="center">
                  <Typography variant="body1" sx={{ color: isToday(date) ? '#1976d2' : '#000' }}>
                    {format(date, 'eeee', { locale: he })} {/* יום בשבוע בעברית */}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">
                    {format(date, 'dd/MM/yyyy')} {/* התאריך */}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box>
                    {getAvailableAppointments(date).length > 0 ? (
                      getAvailableAppointments(date).map((time, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          sx={{
                            color: '#1976d2',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                          onClick={() => handleTimeClick(time)} // קריאה לפונקציה כשלוחצים על שעה
                        >
                          {time}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        אין תורים
                      </Typography>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SelectDate;
