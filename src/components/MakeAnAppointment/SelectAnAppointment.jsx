import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

const SelectAnAppointment = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const userDetails = useSelector((state) => state.user.user); // Access user details from Redux
  const appointmentOptions = [
    { id: 1, title: 'בדיקת ראייה כללית', imageUrl: '/images/eye_exam.jpg' ,value:"אופטומטריסט"},
    { id: 2, title: 'בדיקת התאמה לפני ניתוחי עיניים', imageUrl: '/images/eye_surgery.jpg',value:"אופטומטריסט" },
    { id: 3, title: 'טיפולים שונים בעיניים – דלקות, יובש, גלאוקומה ועוד', imageUrl: '/images/eye_treatment.jpg',value:"רופא" },
    { id: 4, title: 'ייעוץ עם מומחה', imageUrl: '/images/expert_advice.jpg' ,value:"רופא"},
    { id: 5, title: 'ניתוחי קטרקט', imageUrl: '/images/cataract_surgery.jpg',value:"קטרקט" },
    { id: 6, title: 'ניתוחי לייזר להסרת משקפיים', imageUrl: '/images/laser_surgery.jpg',value:"לייזר" }
  ];
  const handleCardClick = (appointment) => {
    setSelectedAppointment(appointment);
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
          <Typography variant="body1" sx={{ color: '#003d5b' }}>
            כתובת מייל: {userDetails.email}
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
            onClick={() => alert('ממשיך להירשם לתור')}
          >
            המשך לרישום
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SelectAnAppointment;