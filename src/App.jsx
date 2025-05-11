// // import './App.css';
// // import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
// // import About from './components/About';
// // import HomePage from './components/homePage';
// // import Login from './components/MakeAnAppointment/Login';
// // import ViewTheQueueList from './components/ViewTheQueueList/ViewTheQueueList';
// // import SignUp from './components/MakeAnAppointment/SignUP';
// // import SelectAnAppointment from './components/MakeAnAppointment/SelectAnAppointment';
// // import SelectADoctor from './components/MakeAnAppointment/SelectADoctor';
// // import SelectDate from './components/MakeAnAppointment/SelectDate';

// // function App() {
  
// //   return (
// //     <BrowserRouter> {/* מקיף את כל התוכן של ה-App */}
// //       <header className="nav-header">
// //         <nav className="nav-bar">
// //           <NavLink to="/">
// //             <img alt="דף הבית" src='/images/home.png' style={{ width: '2.7rem', height: 'auto' }}></img>
// //           </NavLink>
// //           <NavLink to="/About" className="nav-link">אודות</NavLink>
// //           <NavLink to="/MakeAnAppointment" className="nav-link">הזמנת תור</NavLink>
// //           <NavLink to="/ViewTheQueueList" className="nav-link">רשימת תורים</NavLink>
// //           <NavLink style={{ background: 'none', border: 'none' }} to="/">
// //             <img src='/images/arrow-left.png' alt="חזרה" style={{ width: '2.2rem', height: 'auto' }} />
// //           </NavLink>
// //         </nav>
// //       </header>

// //       <main className="main-content">
// //         <Routes>
// //           <Route path='/' element={<HomePage />} />
// //           <Route path='/About' element={<About />} />
// //           <Route path='/MakeAnAppointment' element={<SelectAnAppointment/>} />
// //           <Route path='/ViewTheQueueList' element={<ViewTheQueueList />} />
// //         </Routes>
// //       </main>
// //     </BrowserRouter>
// //   );
// // }

// //export default App;
// import './App.css';
// import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
// import About from './components/About';
// import HomePage from './components/homePage';
// import Login from './components/MakeAnAppointment/Login';
// import ViewTheQueueList from './components/ViewTheQueueList/ViewTheQueueList';
// import SignUp from './components/MakeAnAppointment/SignUP';
// import SelectAnAppointment from './components/MakeAnAppointment/SelectAnAppointment';
// import SelectADoctor from './components/MakeAnAppointment/SelectADoctor';
// import SelectDate from './components/MakeAnAppointment/SelectDate';
// import { useState } from 'react';
// function App() {
//   const [clientId, setClientId] = useState(null); // שמירת תעודת זהות במצב גלובלי

//   return (
//     <BrowserRouter>
//       <header className="nav-header">
//         <nav className="nav-bar">
//           <NavLink to="/">
//             <img alt="דף הבית" src='/images/home.png' style={{ width: '2.7rem', height: 'auto' }} />
//           </NavLink>
//           <NavLink to="/About" className="nav-link">אודות</NavLink>
//           <NavLink to="/MakeAnAppointment" className="nav-link">הזמנת תור</NavLink>
//           <NavLink to="/ViewTheQueueList" className="nav-link">רשימת תורים</NavLink>
//         </nav>
//       </header>

//       <main className="main-content">
//         <Routes>
//           {/* דף הבית */}
//           <Route path="/" element={<HomePage />} />

//           {/* עמוד אודות */}
//           <Route path="/About" element={<About />} />

//           {/* דף התחברות */}
//           <Route
//             path="/MakeAnAppointment"
//             element={<Login onLoginSuccess={(id) => setClientId(id)} />}
//           />

//           {/* דף הרשמה */}
//           <Route
//             path="/SignUp"
//             element={<SignUp onSignUpSuccess={(id) => setClientId(id)} />}
//           />

//           {/* דף בחירת סוג תור */}
//           <Route
//             path="/SelectAnAppointment"
//             element={
//               clientId ? <SelectAnAppointment /> : <Login onLoginSuccess={(id) => setClientId(id)} />
//             }
//           />

//           {/* דף בחירת רופא */}
//           <Route
//             path="/SelectADoctor"
//             element={
//               clientId ? <SelectADoctor /> : <Login onLoginSuccess={(id) => setClientId(id)} />
//             }
//           />

//           {/* דף רשימת תורים */}
//           <Route path="/ViewTheQueueList" element={<ViewTheQueueList />} />
//         </Routes>
//       </main>
//     </BrowserRouter>
//   );
// }

// export default App;
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
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<About />} />
          <Route path="/MakeAnAppointment" element={clientId? <Navigate to="/MakeAnAppointment/SelectAnAppointment" />:<Login onLoginSuccess={(id) => setClientId(id)} />}/>
          <Route path="/MakeAnAppointment/SignUp" element={<SignUp onSignUpSuccess={(id) => setClientId(id)} />}/>
          <Route path="/MakeAnAppointment/SelectAnAppointment" element={clientId ? <SelectAnAppointment /> : <Login onLoginSuccess={(id) => setClientId(id)} />}/>
          <Route path="/MakeAnAppointment/SelectADoctor" element={clientId ? <SelectADoctor /> : <Login onLoginSuccess={(id) => setClientId(id)} />}/>
          <Route path="/ViewTheQueueList" element={<ViewTheQueueList />} />
          <Route path="/MakeAnAppointment/SelectDate" element={clientId ? <SelectDate /> : <Login onLoginSuccess={(id) => setClientId(id)} />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
