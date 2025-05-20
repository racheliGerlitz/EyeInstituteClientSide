import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import {setSpecialization} from '../../redux/doctorsSlice';
import { useNavigate } from 'react-router-dom';
import { fetchDoctorsBySpecialization } from '../../redux/thunk/doctorsThunk'; // Import the action to fetch doctors

const SelectAnAppointment = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const userDetails = useSelector((state) => state.user.user); // Access user details from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appointmentOptions = [
    { id: 1, title: 'בדיקת ראייה כללית', imageUrl: '/images/בדיקת ראיה.jpg' ,value:"אופטומטריסט"},
    { id: 2, title: 'בדיקת התאמה לפני ניתוחי עיניים', imageUrl: '/images/רפואה (49).jpg',value:"אופטומטריסט" },
    { id: 3, title: 'טיפולים שונים בעיניים – דלקות, יובש, גלאוקומה ועוד', imageUrl: '/images/הרכבת עדשות.jpg',value:"רופא" },
    { id: 4, title: 'ייעוץ עם מומחה', imageUrl: '/images/57.jpg' ,value:"רופא"},
    { id: 5, title: 'ניתוחי קטרקט', imageUrl: '/images/מכשיר בדיקת ראיה.jpg',value:"קטרקט" },
    { id: 6, title: 'ניתוחי לייזר להסרת משקפיים', imageUrl: '/images/משקפיים (2).jpg',value:"לייזר" }
  ];
  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
   // console.log('Selected appointment:', appointment.value);
    dispatch(setSpecialization(appointment.value)); 
   dispatch(fetchDoctorsBySpecialization(appointment.value));
  };


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: '#e3f2fd', paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      <Typography variant="h4" sx={{ color: '#003d5b', fontWeight: 'bold', marginBottom: '2rem' }}>
        בחר את התור שלך
      </Typography>
 
      {/* Display user details */}
      {userDetails ? (
        <Box sx={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#003d5b' }}>
            שלום, {userDetails.name}!
          </Typography>
        </Box>
      )   : (
        <p>לא נמצאו פרטי משתמש.</p>
      )}

      <Box display="flex"  justifyContent="center">
        {appointmentOptions.map((option) => (
          <Card
            key={option.id}
            sx={{
              width: '300px',
              margin: '1rem',
              
              backgroundImage: `url("${option.imageUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '250px',
              borderRadius: '10px',
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleCardClick(option)}
          >
            <CardContent
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background with transparency
                padding: '1rem',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {option.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Display selected appointment */}
      {selectedAppointment && (
        <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: '#003d5b', fontWeight: 'bold' }}>
            בחרת את התור: {selectedAppointment.title}
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: '1rem',
              backgroundColor: '#1976d2',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
            onClick={() => navigate('/MakeAnAppointment/SelectADoctor')}

          >
            המשך לרישום
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SelectAnAppointment;