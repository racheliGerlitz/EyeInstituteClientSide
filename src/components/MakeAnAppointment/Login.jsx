
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkClientExists } from "../../redux/thunk/userthunks"; 
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
    //console.log("user", { id });
    try {
      const result = await dispatch(checkClientExists(id)).unwrap(); // Dispatch the thunk
      console.log("API Result:", result); // Debugging: Log the result
      if (result) {
        setUserDetails(result); // Store user details in state
        setShowAppointment(true); // Show the appointment component
        //console.log("showAppointment:", showAppointment, "userDetails:", userDetails);
        onLoginSuccess(result.id); // Pass the client ID to the parent or global state
      }
    } catch (err) {
      //console.error("Login Error:", err); // Debugging: Log the error
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