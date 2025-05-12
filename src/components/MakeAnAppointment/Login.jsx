// // import React, { useState } from "react";
// // import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
// // import { Box } from "@mui/system";
// // import { useDispatch } from "react-redux";
// // import { checkClient } from "../redux/thunk"; // Adjust the import path as necessary
// // import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// // const Login = () => {
// //   const [id, setId] = useState("");
// //   const [showSignUp, setShowSignUp] = useState(false); // State for showing the sign-up form
// //   const dispatch = useDispatch();

// //   const handleLogin = async (id) => {
// //     try {
// //       const result = await dispatch(checkClient(id)).unwrap(); // Wait for the thunk to resolve
// //       localStorage.setItem("clientId", result.id); // Assuming `result` contains an `id`
// //       return true;
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       return false;
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const exists = await handleLogin(id);
// //     if (!exists) {
// //       setShowSignUp(true); // Show the sign-up form if the user does not exist
// //     }
// //   };

// //   return (
// //     <Box
// //       display="flex"
// //       justifyContent="center"
// //       alignItems="flex-start"
// //       height="100%"
// //       sx={{ backgroundColor: "#e3f2fd", paddingTop: "2rem" }}
// //     >
// //       <Card
// //         sx={{
// //           width: "80%",
// //           maxWidth: "500px",
// //           borderRadius: "10px",
// //           boxShadow: 3,
// //           marginTop: "3rem",
// //           padding: "4rem",
// //           height: "auto",
// //         }}
// //       >
// //         <CardContent>
// //           <Typography
// //             variant="h5"
// //             gutterBottom
// //             align="center"
// //             sx={{ color: "#003d5b", fontWeight: "bold" }}
// //           >
// //             הכנס מספר זהות
// //           </Typography>

// //           {/* Login Form */}
// //           <form onSubmit={handleSubmit}>
// //             <TextField
// //               label="מספר זהות"
// //               variant="outlined"
// //               fullWidth
// //               value={id}
// //               onChange={(e) => setId(e.target.value)}
// //               sx={{
// //                 marginBottom: "1.5rem",
// //                 "& .MuiInputLabel-root": {
// //                   color: "#003d5b",
// //                 },
// //                 "& .MuiOutlinedInput-root": {
// //                   "& fieldset": {
// //                     borderColor: "#1976d2",
// //                   },
// //                   "&:hover fieldset": {
// //                     borderColor: "#1565c0",
// //                   },
// //                 },
// //                 marginTop: "2rem",
// //               }}
// //               inputProps={{ dir: "ltr" }}
// //             />

// //             <Button
// //               type="submit"
// //               variant="contained"
// //               fullWidth
// //               sx={{
// //                 backgroundColor: "#e3f2fd",
// //                 color: "#003d5b",
// //                 fontSize: "1.2rem",
// //                 "&:hover": {
// //                   backgroundColor: "#b0dcff",
// //                 },
// //                 marginTop: "3rem",
// //                 height: "3rem",
// //               }}
// //             >
// //               לאישור
// //             </Button>
// //           </form>

// //           {/* Show Sign-Up Form if the user does not exist */}
// //           {showSignUp && (
// //             <Box sx={{ marginTop: "2rem" }}>
// //               <Typography
// //                 variant="h6"
// //                 align="center"
// //                 sx={{ color: "#003d5b", fontWeight: "bold", marginBottom: "1rem" }}
// //               >
// //                 משתמש לא קיים. אנא הרשמו למערכת.
// //               </Typography>
// //               {/* Sign-Up Form */}
// //               <TextField
// //                 label="שם מלא"
// //                 variant="outlined"
// //                 fullWidth
// //                 sx={{ marginBottom: "1.5rem" }}
// //               />
// //               <TextField
// //                 label="כתובת"
// //                 variant="outlined"
// //                 fullWidth
// //                 sx={{ marginBottom: "1.5rem" }}
// //               />
// //               <Button
// //                 variant="contained"
// //                 fullWidth
// //                 sx={{
// //                   backgroundColor: "#e3f2fd",
// //                   color: "#003d5b",
// //                   "&:hover": {
// //                     backgroundColor: "#b0dcff",
// //                   },
// //                 }}
// //               >
// //                 הירשם
// //               </Button>
// //             </Box>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </Box>
// //   );
// // };

// // export default Login;
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { checkClientExists } from "../../redux/thunk/userthunks"; // Adjusted the import path
// import { TextField, Button, Typography, Box, Card, CardContent } from "@mui/material";
// import SignUp from "./SignUP";
// import SelectAnAppointment from "./SelectAnAppointment";

// const Login = ({ onLoginSuccess }) => {
//   const [id, setId] = useState(""); // State for the entered ID
//   const [showSignUp, setShowSignUp] = useState(false); // State to toggle SignUp component
//   const [userDetails, setUserDetails] = useState(null); // State to store user details
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.user); // Access Redux state

//   const handleLogin = async () => {
//     console.log("user", { id });
//     try {
//       const result = await dispatch(checkClientExists(id)).unwrap(); // Dispatch the thunk
//       console.log("API Result:", result); // Debugging: Log the result
//       if (result) {
//         setUserDetails(result); // Store user details in state
//         onLoginSuccess(result.id); // Pass the client ID to the parent or global state
//       }
//     } catch (err) {
//       console.error("Login Error:", err); // Debugging: Log the error
//       setShowSignUp(true); // Show the SignUp component if the user is not found
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//       sx={{ backgroundColor: "#e3f2fd" }}
//     >
//       <Box sx={{ width: "400px", padding: "2rem", boxShadow: 3, borderRadius: "10px", backgroundColor: "#fff" }}>
//         {!userDetails && !showSignUp ? (
//           <>
//             <Typography variant="h5" align="center" gutterBottom>
//               כניסה למערכת
//             </Typography>
//             <TextField
//               label="תעודת זהות"
//               variant="outlined"
//               fullWidth
//               value={id}
//               onChange={(e) => setId(e.target.value)}
//               sx={{ marginBottom: "1.5rem" }}
//             />
//             {error && (
//               <Typography variant="body2" color="error" align="center" sx={{ marginBottom: "1rem" }}>
//                 {error}
//               </Typography>
//             )}
//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleLogin}
//               sx={{
//                 backgroundColor: "#e3f2fd",
//                 color: "#003d5b",
//                 "&:hover": { backgroundColor: "#b0dcff" },
//               }}
//             >
//               כניסה
//             </Button>
//           </>
//         ) : showSignUp ? (
//           <SignUp onSignUpSuccess={onLoginSuccess} /> // Render SignUp component if user is not found
//         ) : (
//           <Card sx={{ padding: "2rem", boxShadow: 3, borderRadius: "10px", backgroundColor: "#e3f2fd" }}>
//             <CardContent>
//               <Typography variant="h5" align="center" gutterBottom sx={{ color: "#003d5b", fontWeight: "bold" }}>
//                 ברוך הבא, {userDetails.name}!
//               </Typography>
//               <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
//                 כתובת מייל: {userDetails.email}
//               </Typography>
//               <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
//                 מספר טלפון: {userDetails.phoneNumber}
//               </Typography>
//               <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
//                 גיל: {userDetails.age}
//               </Typography>
//               <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
//                 מספר בעין שמאל: {userDetails.leftEyeNumber}
//               </Typography>
//               <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
//                 מספר בעין ימין: {userDetails.rightEyeNumber}
//               </Typography>
//               <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
//                 צילינדר: {userDetails.cylinder}
//               </Typography>
//             </CardContent>
//           </Card>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Login;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkClientExists } from "../../redux/thunk/userthunks"; // Adjusted the import path
import { TextField, Button, Typography, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Wellcome from "./Wellcome";

const Login = ({ onLoginSuccess }) => {
  const [id, setId] = useState(""); // State for the entered ID
  const [showSignUp, setShowSignUp] = useState(false); // State to toggle SignUp component
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [showAppointment, setShowAppointment] = useState(false); // State to show SelectAnAppointment
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user); // Access Redux state
const navigate = useNavigate();

useEffect(() => {
  if (showAppointment) {
    const timer = setTimeout(() => {
      navigate("/MakeAnAppointment/SelectAnAppointment");
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [showAppointment, navigate]);

  const handleLogin = async () => {
    console.log("user", { id });
    try {
      const result = await dispatch(checkClientExists(id)).unwrap(); // Dispatch the thunk
      console.log("API Result:", result); // Debugging: Log the result
      if (result) {
        setUserDetails(result); // Store user details in state
        setShowAppointment(true); // Show the appointment component
        console.log("showAppointment:", showAppointment, "userDetails:", userDetails);
        onLoginSuccess(result.id); // Pass the client ID to the parent or global state
      }
    } catch (err) {
      console.error("Login Error:", err); // Debugging: Log the error
      setShowSignUp(true); // Show the SignUp component if the user is not found
      navigate("/MakeAnAppointment/SignUp");
    }
  };


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "#e3f2fd" }}
    >
      <Box sx={{ width: "400px", padding: "2rem", boxShadow: 3, borderRadius: "10px", backgroundColor: "#fff" }}>
          <>
          
            <Typography variant="h5" align="center" gutterBottom>
              כניסה למערכת
            </Typography>
            <TextField
              label="תעודת זהות"
              variant="outlined"
              fullWidth
              value={id}
              onChange={(e) => setId(e.target.value)}
              sx={{ marginBottom: "1.5rem" }}
            />
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ marginBottom: "1rem" }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#003d5b",
                "&:hover": { backgroundColor: "#b0dcff" },
              }}
            >
              כניסה
            </Button>
             {showAppointment && <Wellcome userDetails={userDetails} />}
          </>
      </Box>
      
    </Box>
   

  );
};

export default Login;