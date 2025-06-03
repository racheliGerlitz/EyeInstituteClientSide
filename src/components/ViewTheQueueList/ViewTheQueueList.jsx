import  { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ViewAQueue from './ViewAQueue';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientAppointments} from '../../redux/thunk/appointmentsthunk';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAllDoctors } from '../../redux/thunk/doctorsThunk';

const ViewTheQueueList = () => {

  const dispatch=useDispatch();
  const user = useSelector((state) => state.user.user);
  const dummyQueues =  useSelector((state) => state.appointments.userAppointments);
  const loading = useSelector((state) => state.user.loading);
  const loading2 = useSelector((state) => state.appointments.loading);
  const error = useSelector((state) => state.appointments.error);



useEffect(() => {
  const fetchData = async () => {
    if (user) {
      await dispatch(fetchClientAppointments(user.id));
      await dispatch(fetchAllDoctors());
    }
  };
  fetchData();
}, [dispatch, user]);
  
  if (loading2) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }
  
if(error){
  return (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'red', mt: 4 }}>
  <ErrorOutlineIcon sx={{ fontSize: 48, mb: 1 }} />
  <Typography variant="h6">אירעה שגיאה</Typography>
</Box>
  );
}

return (
  <Box sx={{ padding: '2rem', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
    <Typography variant="h4" sx={{ textAlign: 'center', color: '#003d5b', fontWeight: 'bold', marginBottom: '2rem' }}>
      רשימת התורים שלך
    </Typography>

    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      {dummyQueues.length > 0 ? (
        dummyQueues.map(queue => (
          <ViewAQueue key={queue.id} queue={queue} />
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#666', marginTop:'8%'}}>
          אין תורים זמינים
        </Typography>
      )}
    </Box>
  </Box>
   
  )};

export default ViewTheQueueList;
