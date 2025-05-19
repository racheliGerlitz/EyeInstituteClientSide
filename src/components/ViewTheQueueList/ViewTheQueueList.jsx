import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ViewAQueue from './ViewAQueue';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientAppointments} from '../../redux/thunk/appointmentsthunk';

const ViewTheQueueList = () => {

  const dispatch=useDispatch();
  const user = useSelector((state) => state.user.user);
  const dummyQueues =  useSelector((state) => state.appointments.userAppointments);


useEffect(()=>{
  if(user){
  dispatch(fetchClientAppointments(user.id));
  }
},[dispatch,user])
  

  

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', color: '#003d5b', fontWeight: 'bold', marginBottom: '2rem' }}>
        רשימת התורים שלך
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        {dummyQueues.map(queue => (
          <ViewAQueue key={queue.id} queue={queue} />
        ))}
      </Box>
    </Box>
  );
};

export default ViewTheQueueList;
