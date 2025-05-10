import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';

const SelectADoctor = () => {
  // מערך רופאים לדוגמה
  const doctors = [
    { id: 1, name: 'ד"ר יוסי כהן', imageUrl: '/images/optometrist-writing-clipboard.jpg' },
    { id: 2, name: 'ד"ר מרים לוי', imageUrl: '/images/pointing-camera-choosing-you.jpg' },
    { id: 3, name: 'ד"ר רן שמואל', imageUrl: '/images/portrait-eye-exam-arms-crossed-with-optometrist-man-his-office-healthcare-vision-improvement-medical-frame-glasses-with-happy-doctor-clinic-assessment-testing.jpg' },
    { id: 4, name: 'ד"ר תמר ברק', imageUrl: '/images/senior-optician-examination-room.jpg' },
  ];

  // פונקציה לטיפול בלחיצה על רופא
  const handleDoctorClick = (doctor) => {
    // פה תוכל להוסיף את הפעולה שברצונך לבצע אחרי הלחיצה
    console.log('נבחר רופא:', doctor.name);
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
        בחר רופא
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            sx={{
              width: '250px',
              margin: '1rem',
              backgroundImage: `url(${doctor.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '300px',
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
            onClick={() => handleDoctorClick(doctor)}
          >
            <CardContent
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // צבע כהה עם שקיפות ברקע
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
                {doctor.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SelectADoctor;
