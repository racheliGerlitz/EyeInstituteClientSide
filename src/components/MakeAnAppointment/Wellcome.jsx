const Wellcome = ({userDetails}) => {
    return (
       <Card sx={{ padding: "2rem", boxShadow: 3, borderRadius: "10px", backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom sx={{ color: "#003d5b", fontWeight: "bold" }}>
                ברוך הבא, {userDetails.name}!
              </Typography>
              <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
                כתובת מייל: {userDetails.email}
              </Typography>
              <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
                מספר טלפון: {userDetails.phoneNumber}
              </Typography>
              <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
                גיל: {userDetails.age}
              </Typography>
              <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
                מספר בעין שמאל: {userDetails.leftEyeNumber}
              </Typography>
              <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
                מספר בעין ימין: {userDetails.rightEyeNumber}
              </Typography>
              <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
                צילינדר: {userDetails.cylinder}
              </Typography>
            </CardContent>
          </Card>
    );
    };

    export default Wellcome;