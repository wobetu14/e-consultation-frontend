import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DraftTemplateDoc from '../downloadable_files/FDRE E-Consultation Portal - Draft Template.docx';
import { useTranslation } from 'react-i18next';

const DownloadDraftTemplate = () => {
  const {t}=useTranslation();
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight:"600" }}>
            {t('draft_template')}
        </Typography>

        <Typography gutterBottom>
            {t('draft_template_description')}
        </Typography>

        <Button
         href={DraftTemplateDoc}
         variant="outlined"
         color="secondary"
         size="small"
         sx={{ textTransform:"none" }}
         >
            <Typography>
              {t('download')}
            </Typography>
        </Button>
      </CardContent>
    </Card>
  );
}

export default DownloadDraftTemplate;