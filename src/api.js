
import axios from 'axios';

// הגדרת הכתובת הבסיסית (Base URL) ל-API
const baseUrl = 'http://localhost:5105/api/';

// יצירת מופע של axios עם הגדרות ברירת מחדל
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// פונקציות עזר לקריאות API


// ייצוא ברירת מחדל של מופע ה-axios
export default api;
