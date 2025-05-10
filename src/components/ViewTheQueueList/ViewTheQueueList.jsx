import React from 'react';
import { Box, Typography } from '@mui/material';
import ViewAQueue from './ViewAQueue';

const ViewTheQueueList = () => {
  // נתוני תורים לדוגמה
  const dummyQueues = [
    {
      id: 1,
      type: 'בדיקת ראייה כללית',
      date: '2025-05-12',
      day: 'שני',
      time: '14:30',
      doctor: 'ד"ר יוסי כהן',
      details: 'בדיקה יסודית של חדות ראייה, בדיקת עיניים כללית ואבחון בעיות פוטנציאליות',
    },
    {
      id: 2,
      type: 'ייעוץ עם מומחה',
      date: '2025-05-20',
      day: 'שלישי',
      time: '10:00',
      doctor: 'ד"ר מרים לוי',
      details: 'פגישה עם מומחית למחלות עיניים מורכבות, כולל בדיקת רקמות וקרנית',
    },
  ];

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
