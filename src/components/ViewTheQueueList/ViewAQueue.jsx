import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdeleteAnAppointment, fetchClientAppointments } from '../../redux/thunk/appointmentsthunk';
import { format } from 'date-fns';
import CircularProgress from '@mui/material/CircularProgress';

const ViewAQueue = ({ queue }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const doctors = useSelector((state) => state.doctors.doctors);
    const doctor = doctors?.find(doc => doc.id === queue.doctorId);
    const appointmentOptions = useSelector((state) => state.appointments.appointmentOptions);
    let title;

    if (doctor && Array.isArray(appointmentOptions) && appointmentOptions.length > 0) {
        const found = appointmentOptions.find(option => option.value === doctor.specialization);
        title = found ? found.title : '';
    }


    const handleCancelAppointment = async () => {
        await dispatch(fetchdeleteAnAppointment(queue));
        alert('תור בוטל', queue.id);
        await dispatch(fetchClientAppointments(user.id));
        setOpenDialog(false);
    };

    return (
        <Card sx={{ width: '90%', maxWidth: 600, boxShadow: 4, borderRadius: 3, backgroundColor: '#ffffff' }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>


                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'inline', marginRight: 1 }}>תאריך:</Typography>
                        <Typography variant="body1">
                            {format(queue.date, 'dd/MM/yyyy')}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'inline', marginRight: 1 }}>שעה:</Typography>
                        <Typography sx={{ display: 'inline' }}>
                            {`${new Date(queue.date).getHours()}:${String(new Date(queue.date).getMinutes()).padStart(2, '0')}`}
                        </Typography>
                    </Box>
                </Box>



                <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setShowDetails(prev => !prev)}
                        startIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{
                            color: '#003d5b',
                            borderColor: '#003d5b',
                            '&:hover': {
                                borderColor: '#002b49',
                                backgroundColor: '#e3f2fd',
                            },
                        }}
                    >
                        פרטים נוספים
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => setOpenDialog(true)}
                        sx={{
                            backgroundColor: '#003d5b',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#002b49',
                            },
                        }}
                    >
                        ביטול תור
                    </Button>

                </Box>

                <Collapse in={showDetails}>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography><strong>רופא:</strong> {doctor ? doctor.name : 'לא נמצא'}</Typography>
                        <Typography><strong>פירוט:</strong> {title} </Typography>
                    </Box>
                </Collapse>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>אישור ביטול</DialogTitle>
                    <DialogContent>
                        האם אתה בטוח שברצונך לבטל את התור?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="#003d5b">
                            לא
                        </Button>
                        <Button onClick={handleCancelAppointment} color="#003d5b">
                            כן, בטל
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default ViewAQueue;
