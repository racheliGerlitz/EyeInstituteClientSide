import { useEffect, useState ,useRef} from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector} from 'react-redux';
import {setSpecialization} from '../../redux/doctorsSlice';
import { useNavigate} from 'react-router-dom';
import { fetchDoctorsBySpecialization } from '../../redux/thunk/doctorsThunk';
import CircularProgress from '@mui/material/CircularProgress';

const SelectAnAppointment = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const selectedRef = useRef(null);
  const userDetails = useSelector((state) => state.user.user); // Access user details from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.doctors.loading); // Access loading state from Redux

  useEffect(() => {
    if (selectedAppointment && selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedAppointment]);

  const appointmentOptions=useSelector((state) => state.appointments.appointmentOptions);

  const handleCardClick = async(appointment) => {
    setSelectedAppointment(appointment);
   await dispatch(setSpecialization(appointment.value)); 
   await dispatch(fetchDoctorsBySpecialization(appointment.value));
  };

//  if (loading) {
//           return (
//               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
//                   <CircularProgress />
//               </Box>
//           );
//       }

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

      <Box 
      display="flex"
      justifyContent="center"
      flexWrap="wrap"
      sx={{maxWidth:'1000px',margin: '0 auto'}}
      >
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
        <Box
        ref={selectedRef} 
        sx={{ marginTop: '2rem', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: '#003d5b', fontWeight: 'bold' }}>
            בחרת את התור: {selectedAppointment.title}
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: '1rem',
              color: 'white',
              backgroundColor:'#003d5b',
              '&:hover': {
                backgroundColor: '#002b49',
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