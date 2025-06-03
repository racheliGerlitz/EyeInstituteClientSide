
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkClientExists } from "../../redux/thunk/userthunks";
import { fetchDoctorsById } from "../../redux/thunk/doctorsThunk";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../../redux/userSlice";
import CircularProgress from '@mui/material/CircularProgress';

const Login = ({ onLoginSuccess }) => {
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const {error} = useSelector((state) => state.user); 
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
 const loading2 = useSelector((state) => state.doctors.loading);
  
   

 const handleLogin = async () => {

  try {
    const doctorResult = await dispatch(fetchDoctorsById(id)).unwrap();
    console.log("doctor", doctorResult);
    onLoginSuccess(null);
    navigate("/Login/WellcomeDoctor");
  } 
  catch (err) {
    console.log("API Result error:", err);
    const errMsg = err?.message || err;
    if (typeof errMsg === 'string' && errMsg.includes('doctor does not exist')) {
      try {
        const clientResult = await dispatch(checkClientExists(id)).unwrap();
        if (clientResult) {
          console.log("Client found:", clientResult);
          onLoginSuccess(clientResult.id);
           localStorage.setItem("user", JSON.stringify(clientResult));

          navigate("/Login/Wellcome");
        } else {
          console.log("Client not found, redirecting to SignUp");
          navigate("/Login/SignUp");
        }
      } 
      catch (clientErr) {
        console.log("Error checking client existence:", clientErr);
        await  dispatch(setUserId(id));
        navigate("/Login/SignUp");
      }
    } else {
      // שגיאה אחרת - אפשר להציג הודעה או טיפול אחר
      console.log("Unhandled error:", err);
    }
  }
};

   if (loading||loading2) {
          return (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                  <CircularProgress />
              </Box>
          );
      }
  
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
          
        </>
      </Box>

    </Box>


  );
};

export default Login;