import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const About = () => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* תמונה מאחורי הסרגל הראשי */}
            <div
                style={{
                    backgroundImage: "url('/images/akis.svg')",
                    backgroundSize: 'cover', // שינוי ל-cover כדי שהרקע יתפוס את כל המסך
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center', // ממרכז את התמונה
                    backgroundColor: '#e3f2fd',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                    opacity: 0.4,
                }}
            ></div>

            {/* תוכן */}
            <div
                style={{
                    padding: '2rem 4rem',
                    direction: 'rtl',
                    textAlign: 'right',
                    maxWidth: '900px',
                    margin: '0 auto',
                    whiteSpace: 'pre-line',
                }}
            >
                <h1 style={{ textAlign: 'center', marginTop: '0.5rem' }}>אודות מכון העיניים</h1>

                {/* תיאור המכון */}
                <p style={{ fontSize: '1rem' }}>
                    <b>
                        ברוכים הבאים למכון העיניים שלנו – מרכז רפואי מתקדם המתמחה באבחון, טיפול וניתוחים בתחום רפואת העיניים.
                        אנו מציעים מגוון רחב של שירותים מקצועיים לכל הגילאים, בליווי צוות רופאים מנוסה, ציוד חדשני ויחס אישי.
                    </b>
                </p>

                {/* היסטוריה */}
                <h2>היסטוריית המכון</h2>
                <p style={{ fontSize: '1rem' }}>
                    מכון העיניים הוקם בשנת 2000 מתוך חזון להציע שירותים רפואיים מתקדמים בתחום רפואת העיניים. במשך השנים, המכון עבר תהליך של צמיחה ושדרוג,
                    והיום אנו גאים להציע את הציוד הרפואי המתקדם ביותר, והצוות המנוסה ביותר בתחום.
                </p>

                {/* הצוות הרפואי */}
                <h2>הכירו את צוות הרופאים שלנו</h2>
                <p style={{ fontSize: '1rem' }}>
                    הצוות הרפואי שלנו מורכב ממומחים בעלי ניסיון רחב בתחום רפואת העיניים. כל אחד מהרופאים שלנו עבר הכשרה מעמיקה ונחשב למומחה בתחומו.
                    אנחנו בטוחים שתהיו בידיים טובות ותקבלו את הטיפול הטוב ביותר.
                </p>
                {/* אפשר להוסיף תמונה של הצוות */}
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <img src="/images/49.jpg" alt="צוות הרופאים" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }} />
                </div>
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <img src="/images/67.jpg" alt="צוות הרופאים" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }} />
                </div>
                {/* שירותים נוספים */}
                <h2>שירותים נוספים</h2>
                <ul style={{ listStyleType: 'none', paddingRight: '1rem' }}>
                    <li> בדיקת ראייה כללית.</li>
                    <li> בדיקת התאמה לפני ניתוחי עיניים.</li>
                    <li> טיפולים שונים בעיניים – דלקות, יובש, גלאוקומה ועוד.</li>
                    <li> ייעוץ עם מומחה.</li>
                    <li> ניתוחי קטרקט.</li>
                    <li> ניתוחי לייזר להסרת משקפיים.</li>
                </ul>

                {/* תמונה שממחישה את השירות */}
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <img src="/images/man-having-ophthalmology-appointment.jpg" alt="שירותים רפואיים" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }} />
                </div>

                {/* כפתור הזמנת תור */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <NavLink to="/MakeAnAppointment">
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#e0f7fa',
                                color: '#003d5b',
                                padding: '1rem 2rem',
                                fontSize: '1.2rem',
                                border: '2px solid #003d5b',
                                borderRadius: '5px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                transition: 'background-color 0.3s ease, transform 0.3s',
                                marginTop:'3rem'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#90caf9';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#e0f7fa';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                              לקביעת תור
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default About;
