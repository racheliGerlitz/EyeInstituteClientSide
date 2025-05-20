
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpClient } from "../../redux/thunk/userthunks";
import { Card, CardContent, TextField, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onSignUpSuccess }) => {
  const [client, setClient] = useState({ 
    id: "",
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
    city:"",
    street:"",
    houseNumber:""
    }
    );

  
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

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
    const newUser={client,address};
    e.preventDefault();
    try {
      const result = await dispatch(signUpClient(newUser)).unwrap();
      alert("Registration successful!");
      setUserDetails(result); 
      onSignUpSuccess(result.id);
      navigate("/makeAnAppointment/SelectAnAppointment");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

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
              value={client.leftEyeNumber}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="מספר בעין ימין"
              variant="outlined"
              fullWidth
              name="rightEyeNumber"
              value={client.rightEyeNumber}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
            <TextField
              label="צילינדר"
              variant="outlined"
              fullWidth
              name="cylinder"
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
            <TextField
              label="קופת חולים"
              variant="outlined"
              fullWidth
              name="healthInsurance"
              value={client.healthInsurance}
              onChange={handleChangeClient}
              sx={{ marginBottom: "1.5rem" }}
            />
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
              onChange={handleChangeAddress}
              sx={{ marginBottom: "1.5rem" }}
            />
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ marginBottom: "1.5rem" }}>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth>
              הרשמה
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;