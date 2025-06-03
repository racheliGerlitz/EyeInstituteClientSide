import { Card, CardContent,Typography} from '@mui/material';
import { useSelector } from 'react-redux';

const WellcomeDoctor = () => {
 const doctorDetails=useSelector((state)=>state.doctors.currentDoctor);
    return (
       <Card sx={{ padding: "2rem", boxShadow: 3, borderRadius: "10px", backgroundColor: "#e3f2fd" }}>
            <CardContent>

              <Typography variant="h5" align="center" gutterBottom sx={{ color: "#003d5b", fontWeight: "bold" }}>
                ברוך הבא, {doctorDetails.name}!
              </Typography>
              
              <Typography variant="body1" align="center" sx={{ marginBottom: "1rem" }}>
                התמחות {doctorDetails.specialization}
              </Typography>
              
            </CardContent>
          </Card>
    );
    };

    export default WellcomeDoctor;