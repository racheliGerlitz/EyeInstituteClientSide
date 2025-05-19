import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useDispatch } from 'react-redux';
import { fetchdeleteAnAppointment} from '../../redux/thunk/appointmentsthunk';

const ViewAQueue = ({ queue }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
const dispatch=useDispatch();
    const handleCancelAppointment = async () => {
        // כאן תוכל לשלב קריאה ל-Redux או API
        await dispatch(fetchdeleteAnAppointment(queue));

        console.log('תור בוטל:', queue.id);
        setOpenDialog(false);
    };

    return (
        <Card sx={{ width: '90%', maxWidth: 600, boxShadow: 4, borderRadius: 3, backgroundColor: '#ffffff' }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>


                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'inline', marginRight: 1 }}>תאריך:</Typography>
                        <Typography sx={{ display: 'inline' }}>{queue.date}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', display: 'inline', marginRight: 1 }}>שעה:</Typography>
                        <Typography sx={{ display: 'inline' }}>{queue.hour}</Typography>
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
                        <Typography><strong>רופא:</strong> {queue.doctor}</Typography>
                        <Typography><strong>פירוט:</strong> {queue.details}</Typography>
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
