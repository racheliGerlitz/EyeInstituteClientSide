import './App.css';
import { NavLink, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import About from './components/About';
import HomePage from './components/homePage';
import Login from './components/MakeAnAppointment/Login';
import ViewTheQueueList from './components/ViewTheQueueList/ViewTheQueueList';
import SignUp from './components/MakeAnAppointment/SignUP';
import SelectAnAppointment from './components/MakeAnAppointment/SelectAnAppointment';
import SelectADoctor from './components/MakeAnAppointment/SelectADoctor';
import SelectDate from './components/MakeAnAppointment/SelectDate';
import Wellcome from './components/MakeAnAppointment/Wellcome';
import WellcomeDoctor from './components/MakeAnAppointment/WellcomeDoctor';

import { useState } from 'react';
import { Typography, Avatar, Tooltip, Menu, MenuItem, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/userSlice';

function App() {
  const [clientId, setClientId] = useState(null);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleClose();
    navigate("/Login/Wellcome");
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    navigate("/Login");
  };

  return (
    <>
      <header className="nav-header">
        <nav className="nav-bar" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <NavLink to="/">
            <img alt="דף הבית" src="/images/home (2).png" style={{ width: '2.7rem', height: 'auto' }} />
          </NavLink>
          <NavLink to="/About" className="nav-link">אודות</NavLink>
          <NavLink to="/MakeAnAppointment" className="nav-link">הזמנת תור</NavLink>
          <NavLink to="/ViewTheQueueList" className="nav-link">רשימת תורים</NavLink>
          <NavLink to="/Login" className="nav-link">כניסה למערכת</NavLink>

          {user?.name && (
            <>
              <Tooltip title="החשבון שלי">
                <IconButton onClick={handleClick} sx={{ ml: 2 }}>
                  <Avatar sx={{ bgcolor: '#1976d2' }}>{user.name.charAt(0)}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleProfile}>הפרופיל שלי</MenuItem>
                <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
              </Menu>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login onLoginSuccess={(id) => setClientId(id)} />} />
          <Route path="/About" element={<About />} />
          <Route path="/MakeAnAppointment" element={clientId ? <Navigate to="/MakeAnAppointment/SelectAnAppointment" /> : (
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#666' }}>
              עליך להרשם למערכת
            </Typography>
          )} />
          <Route path="/Login/SignUp" element={<SignUp onSignUpSuccess={(id) => setClientId(id)} />} />
          <Route path="/MakeAnAppointment/SelectAnAppointment" element={<SelectAnAppointment />} />
          <Route path="/MakeAnAppointment/SelectADoctor" element={clientId ? <SelectADoctor /> : <Login onLoginSuccess={(id) => setClientId(id)} />} />
          <Route path="/ViewTheQueueList" element={clientId ? <ViewTheQueueList /> : (
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#666' }}>
              עליך להרשם למערכת
            </Typography>
          )} />
          <Route path="/MakeAnAppointment/SelectDate" element={clientId ? <SelectDate /> : <Login onLoginSuccess={(id) => setClientId(id)} />} />
          <Route path="/Login/Wellcome" element={<Wellcome />} />
          <Route path="/Login/WellcomeDoctor" element={<WellcomeDoctor />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
