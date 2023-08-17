import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeveloperGuide from '../downloadable_files/FDRE E-Consultation Portal - Developer Guide.pdf';

const DownloadDeveloperGuide = () => {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight:"600" }}>
            Developer Guide
        </Typography>

        <Typography gutterBottom>
          A guide to help developers to configure, maintain and scale up the project.
        </Typography>
        <Button
         href={DeveloperGuide}
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

export default DownloadDeveloperGuide;