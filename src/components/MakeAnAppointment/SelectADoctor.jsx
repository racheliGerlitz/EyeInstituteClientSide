import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography,Button } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorsBySpecialization } from '../../redux/thunk/doctorsThunk';
import {fetchAvailableAppointments} from '../../redux/thunk/appointmentsthunk';
import {setDoctorId} from '../../redux/appointmentSlice';
import { useNavigate } from 'react-router-dom';
const SelectADoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = useSelector((state) => state.doctors.doctors);
  const specialization = useSelector((state) => state.doctors.specialization);
  const loading = useSelector((state) => state.doctors.loading);

  //console.log("Specialization from Redux:", specialization);
 // console.log("Doctors from Redux:", doctors);

  useEffect(() => {
    if (specialization) {
      //console.log("Dispatching fetchDoctorsBySpecialization with:", specialization);
      dispatch(fetchDoctorsBySpecialization(specialization));
    }
  }, [dispatch, specialization]);

  useEffect(() => {
    //console.log("Doctors updated:", doctors);
  }, [doctors]);

  const handleDoctorClick = (doctor) => {
    //console.log('נבחר רופא:', doctor.name);
    setSelectedDoctor(doctor);
    dispatch(setDoctorId(doctor.id)); 
    dispatch(fetchAvailableAppointments(doctor.id));
  };


  if (loading) {
    return <p>טוען רופאים...</p>;
  }

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
        {Array.isArray(doctors) && doctors.map((doctor) => (
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
      {selectedDoctor && (
        <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: '#003d5b', fontWeight: 'bold' }}>
            בחרת את הרופא: {selectedDoctor.name}
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
            onClick={() => navigate('/MakeAnAppointment/SelectDate')}
          >
            המשך לרישום
          </Button>
        </Box>
      )}
    </Box>

  );
};

export default SelectADoctor;
