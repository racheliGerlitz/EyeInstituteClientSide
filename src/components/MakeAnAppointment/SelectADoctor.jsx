import  { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorsBySpecialization } from '../../redux/thunk/doctorsThunk';
import { setDoctorId } from '../../redux/appointmentSlice';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const SelectADoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const selectedDoctorRef = useRef(null);
  const doctors = useSelector((state) => state.doctors.doctors);
  const specialization = useSelector((state) => state.doctors.specialization);
  const loading = useSelector((state) => state.doctors.loading);
  const loading2 = useSelector((state) => state.appointments.loading);
  const [doctorsWithImages, setDoctorsWithImages] = useState([]);

  useEffect(() => {
    const updatedDoctorsWithImages = doctors.map((doctor) => {
      const imageIndex = Number(doctor.id) % 10;  
      const imageUrl = `/images/doctors/${imageIndex}.png`;
      return {
        ...doctor,
        imageUrl,
      };
    });
    setDoctorsWithImages(updatedDoctorsWithImages);
  }, [doctors]);

  useEffect(() => {
    if (specialization) {
      dispatch(fetchDoctorsBySpecialization(specialization));
    }
  }, [dispatch, specialization]);

 useEffect(() => {
    if (selectedDoctor && selectedDoctorRef.current) 
      selectedDoctorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
 }, [selectedDoctor]);

  

  const handleDoctorClick = async(doctor) => {
    setSelectedDoctor(doctor);
    console.log(`Selected doctor: ${doctor.id} - ${doctor.name}`);
    dispatch(setDoctorId(doctor.id));
    // await dispatch(fetchAvailableAppointments(doctor.id));//אולי מיותר
  };

  
      if (loading||loading2) {
          return (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                  <CircularProgress />
              </Box>
          );
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
        {Array.isArray(doctorsWithImages) && doctorsWithImages.map((doctor) => (
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
        <Box 
        ref={selectedDoctorRef}
        sx={{ marginTop: '2rem', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: '#003d5b', fontWeight: 'bold' }}>
            בחרת את הרופא: {selectedDoctor.name}
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: '1rem',
              backgroundColor: '#003d5b',
              color: 'white',
              '&:hover': {
                backgroundColor: '#002b49',
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
