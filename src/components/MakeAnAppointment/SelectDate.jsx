import  { useState, useEffect,useRef } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { format, isSameDay } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableAppointments, fetchMakeAnAppintment } from '../../redux/thunk/appointmentsthunk';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CircularProgress from '@mui/material/CircularProgress';

const SelectDate = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const appointmentsRaw = useSelector((state) => state.appointments.appointments);
  const appointments = Array.isArray(appointmentsRaw) ? appointmentsRaw : [];
  const doctorid = useSelector((state) => state.appointments.doctorid);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const hoursRef = useRef(null); 
  const selectedRef = useRef(null);

  const navigate = useNavigate();
  const loading = useSelector((state) => state.appointments.loading);

  useEffect(() => {
    if (doctorid&& appointments.length === 0) {
      dispatch(fetchAvailableAppointments(doctorid));
    }
  }, [dispatch, doctorid,appointments]);


  useEffect(() => {
    if (selectedHour && hoursRef.current) 
      hoursRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectedHour]);
  

  const handleHourClick = async (appointment) => {
    if (window.confirm(`האם אתה בטוח שאתה רוצה לקבוע תור בתאריך ${format(new Date(appointment.date), 'dd/MM/yyyy')} בשעה: ${`${new Date(appointment.date).getHours()}:${String(new Date(appointment.date).getMinutes()).padStart(2, '0')}`}?`)) {
      setSelectedAppointment(appointment);
      await dispatch(fetchMakeAnAppintment({
        clientId: user.id,
        appointment: {
          id: appointment.id,
          date: appointment.date,
          hour: appointment.hour,
          doctorId: doctorid
        }
      })).unwrap();
      setShowAppointment(true);
        setTimeout(() => {
        if (selectedRef.current) {
          selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  };

  useEffect(() => {
    if (showAppointment) {
      const timer = setTimeout(() => {
        navigate('/ViewTheQueueList');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAppointment, navigate]);

  const availableDates = appointments
    .map(app => format(new Date(app.date), 'yyyy-MM-dd'))
    .filter((value, index, self) => self.indexOf(value) === index)
    .map(dateStr => new Date(dateStr));

  const isDateAvailable = (date) => {
    return availableDates.some(d => isSameDay(d, date));
  };

  const hoursForSelectedDate = selectedDate
    ? appointments.filter(app => isSameDay(new Date(app.date), selectedDate))
    : [];


       if (loading) {
          return (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                  <CircularProgress />
              </Box>
          );
      }
  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#003d5b' }}>
        בחר תאריך
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={(newDate) => {
            if (isDateAvailable(newDate)) {
              setSelectedDate(newDate);
              setShowAppointment(false);
              setSelectedHour(newDate);
            }
          }}
          shouldDisableDate={(date) => !isDateAvailable(date)}
          renderDay={(day, _value, DayComponentProps) => {
            const disabled = !isDateAvailable(day);
            return (
              <div
                style={{
                  position: 'relative',
                  opacity: disabled ? 0.4 : 1,
                }}
              >
                <Button
                  {...DayComponentProps}
                  disabled={disabled}
                  sx={{
                    minWidth: 36,
                    minHeight: 36,
                    padding: 0,
                    color: disabled ? 'red' : 'inherit',
                  }}
                >
                  {format(day, 'd')}
                </Button>
                {disabled && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 2,
                      right: 6,
                      color: 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    ×
                  </span>
                )}
              </div>
            );
          }}
        />
      </LocalizationProvider>

      {selectedDate && (
        <Box 
        ref={hoursRef}
        sx={{ marginTop: '2rem' }}>
          <Typography variant="h6" gutterBottom>
            שעות זמינות ליום {format(selectedDate, 'dd/MM/yyyy')}:
          </Typography>
          {hoursForSelectedDate ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {hoursForSelectedDate.map((app) => {
                const hourText = `${new Date(app.date).getHours()}:${String(new Date(app.date).getMinutes()).padStart(2, '0')}`;
                return (
                  <Button
                    key={app.id}
                    variant="contained"
                    color="primary"
                    onClick={() => handleHourClick(app)}
                  >
                    {hourText}
                  </Button>
                );
              })}
            </Box>
          ) : (
            <Typography>אין תורים זמינים ביום זה</Typography>
          )}
        </Box>
      )}

      {showAppointment && selectedAppointment && (
        <Card 
        ref={selectedRef}
        sx={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e3f2fd' }}>
          <CardContent>
            <Typography variant="h6">
              קבעת תור בתאריך {format(new Date(selectedAppointment.date), 'dd/MM/yyyy')} בשעה: {`${new Date(selectedAppointment.date).getHours()}:${String(new Date(selectedAppointment.date).getMinutes()).padStart(2, '0')}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              מעבירים אותך לרשימת התורים שלך...
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SelectDate;
