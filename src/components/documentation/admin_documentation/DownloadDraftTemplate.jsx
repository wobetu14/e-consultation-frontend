import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DraftTemplateDoc from '../downloadable_files/FDRE E-Consultation Portal - Draft Template.docx';

const DownloadDraftTemplate = () => {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight:"600" }}>
            Draft Template
        </Typography>

        <Typography gutterBottom>
            A template that help you to prepare the draft document.
        </Typography>

        <Button
         href={DraftTemplateDoc}
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

export default DownloadDraftTemplate;