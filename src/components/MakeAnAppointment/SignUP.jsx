
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpClient } from "../../redux/thunk/userthunks";
import { Card, CardContent, TextField, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { setUser } from "../../redux/userSlice";

const SignUp = ({ onSignUpSuccess }) => {
const userId=useSelector((state) => state.user.userId);
  const [client, setClient] = useState({
    id: userId||"",
    name: "",
    age: "",
    phoneNumber: "",
    leftEyeNumber: "",
    rightEyeNumber: "",
    cylinder: "",
    email: "",
    backgroundDiseases: false,
    healthInsurance: "",
  });

  const [address, setAdress] = useState(
    {
      city: "",
      street: "",
      houseNumber: ""
    }
  );

  const loading = useSelector((state) => state.user.loading);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

useEffect(() => {
  if (userId) {
    setClient((prevClient) => ({
      ...prevClient,
      id: userId, 
    }));
  }
}, [userId]);


  const handleChangeClient = (e) => {
    const { name, value, type, checked } = e.target;
    setClient({
      ...client,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleChangeAddress = (e) => {
    const { name, value, type, checked } = e.target;
    setAdress({
      ...address,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    const newUser = { client, address };
    e.preventDefault();
    try {
      const result = await dispatch(signUpClient(newUser)).unwrap();
      alert("Registration successful!");
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/Login/Wellcome");
      onSignUpSuccess(result.id);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  if (loading) {
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
      alignItems="flex-start"
      height="100%"
      sx={{ backgroundColor: "#e3f2fd", paddingTop: "12rem" }}
    >
      <Card sx={{ width: "80%", maxWidth: "500px", borderRadius: "10px", boxShadow: 3, padding: "3rem" }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ color: "#003d5b", fontWeight: "bold", marginBottom: "2rem" }}
          >
            הרשמה למערכת
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="תעודת זהות"
              variant="outlined"
              fullWidth
              name="id"
              value={client.id}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="שם מלא"
              variant="outlined"
              fullWidth
              name="name"
              value={client.name}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="גיל"
              variant="outlined"
              fullWidth
              name="age"
              value={client.age}
              type="number"
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="טלפון"
              variant="outlined"
              fullWidth
              name="phoneNumber"
              value={client.phoneNumber}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="מספר בעין שמאל"
              variant="outlined"
              fullWidth
              name="leftEyeNumber"
              type="number"
              value={client.leftEyeNumber}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="מספר בעין ימין"
              variant="outlined"
              fullWidth
              name="rightEyeNumber"
              type="number"
              value={client.rightEyeNumber}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="צילינדר"
              variant="outlined"
              fullWidth
              name="cylinder"
              type="number"
              value={client.cylinder}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="כתובת מייל"
              variant="outlined"
              fullWidth
              name="email"
              value={client.email}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="backgroundDiseases"
                  checked={client.backgroundDiseases}
                  onChange={handleChangeClient}
                />
              }
              label="מחלות רקע"
            />
            <FormControl fullWidth sx={{ marginBottom: "1.5rem" }}>
              <InputLabel id="healthInsurance-label">קופת חולים</InputLabel>
              <Select
                labelId="healthInsurance-label"
                id="healthInsurance"
                name="healthInsurance"
                value={client.healthInsurance}
                onChange={handleChangeClient}
                label="קופת חולים"
              >
                <MenuItem value="כללית">כללית</MenuItem>
                <MenuItem value="מאוחדת">מאוחדת</MenuItem>
                <MenuItem value="מכבי">מכבי</MenuItem>
                <MenuItem value="לאומית">לאומית</MenuItem>
              </Select>
            </FormControl>


            <TextField
              label="עיר"
              variant="outlined"
              fullWidth
              name="city"
              value={address.city}
              onChange={handleChangeAddress}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="רחוב"
              variant="outlined"
              fullWidth
              name="street"
              value={address.street}
              onChange={handleChangeAddress}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="מספר בנין"
              variant="outlined"
              fullWidth
              name="houseNumber"
              value={address.houseNumber}
              type="number"
              onChange={handleChangeAddress}
              sx={{ marginBottom: "1.5rem" }}
            />
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ marginBottom: "1.5rem" }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained" fullWidth
              sx={{
                backgroundColor: "#003d5b",
                color: "#fff",
                '&:hover': {
                  backgroundColor: "#002b49",
                },
              }}
            >
              הרשמה
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;