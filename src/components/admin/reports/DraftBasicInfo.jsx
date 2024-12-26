import { Typography } from '@mui/material';
import React from 'react'

const DraftBasicInfo = ({
    documentDetail,
    documentComments,
    documentSections
}) => {
  return (
    <>
      <Typography variant="h3">
        {documentDetail && documentDetail.short_title}
      </Typography>
      <Typography variant="h4">
        {documentDetail && documentDetail.institution.name}
      </Typography>
      <Typography variant="h4">
        {documentDetail && documentDetail.summary}
      </Typography>
    </>
  );
}

export default DraftBasicInfo