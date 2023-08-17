import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserManualPDF from '../documentation/downloadable_files/E-Consultation Portal - User Manual.pdf';

const DownloadUserManual = () => {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight:"600" }}>
            User Manual
        </Typography>
        <Typography gutterBottom>
          In case you want the PDF version of the user manual, you can download here. 
        </Typography>
        <Button
         href={UserManualPDF}
         variant="outlined"
         color="secondary"
         size="small"
         sx={{ textTransform:"none" }}
         >
            <Typography>
             Download
            </Typography>
        </Button>
      </CardContent>
    </Card>
  );
}

export default DownloadUserManual;