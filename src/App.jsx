
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import About from './components/About';
import HomePage from './components/homePage';
import Login from './components/MakeAnAppointment/Login';
import ViewTheQueueList from './components/ViewTheQueueList/ViewTheQueueList';
import SignUp from './components/MakeAnAppointment/SignUP';
import SelectAnAppointment from './components/MakeAnAppointment/SelectAnAppointment';
import SelectADoctor from './components/MakeAnAppointment/SelectADoctor';
import SelectDate from './components/MakeAnAppointment/SelectDate';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wellcome from './components/MakeAnAppointment/Wellcome';
import { Typography} from '@mui/material';
import WellcomeDoctor from './components/MakeAnAppointment/WellcomeDoctor';

function App() {
  const [clientId, setClientId] = useState(null); // Global state for storing client ID

  return (
    <BrowserRouter>
      <header className="nav-header">
        <nav className="nav-bar">
          <NavLink to="/">
            <img alt="דף הבית" src="/images/home.png" style={{ width: '2.7rem', height: 'auto' }} />
          </NavLink>
          <NavLink to="/About" className="nav-link">אודות</NavLink>
          <NavLink to="/MakeAnAppointment" className="nav-link">הזמנת תור</NavLink>
          <NavLink to="/ViewTheQueueList" className="nav-link">רשימת תורים</NavLink>
          <NavLink to="/Login" className="nav-link">כניסה למערכת</NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login onLoginSuccess={(id) => setClientId(id)} />} />
          <Route path="/About" element={<About />} />
          <Route path="/MakeAnAppointment" element={clientId? <Navigate to="/MakeAnAppointment/SelectAnAppointment" />:<>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#666' }}>
          עליך להרשם למערכת  
        </Typography></>}/>
          <Route path="/Login/SignUp" element={<SignUp onSignUpSuccess={(id) => setClientId(id)} />}/>
          <Route path="/MakeAnAppointment/SelectAnAppointment" element={ <SelectAnAppointment /> }/>
          <Route path="/MakeAnAppointment/SelectADoctor" element={clientId ? <SelectADoctor  /> : <Login onLoginSuccess={(id) => setClientId(id)} />}/>
          <Route path="/ViewTheQueueList" element={clientId ? <ViewTheQueueList /> :  <Typography variant="h6" sx={{ textAlign: 'center', color: '#666' }}>
          עליך להרשם למערכת  
          </Typography>}/>
          <Route path="/MakeAnAppointment/SelectDate" element={clientId ? <SelectDate /> : <Login onLoginSuccess={(id) => setClientId(id)} />}/>
          <Route path="/Login/Wellcome" element={<Wellcome  />}/>
          <Route path="/Login/WellcomeDoctor" element={<WellcomeDoctor  />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
