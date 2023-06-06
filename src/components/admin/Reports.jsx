import { Typography, Button, Box } from '@mui/material';

import {rootURL} from '../../axios/AxiosGlobal'
import Header from './AdminHeader';

const Reports = () => {
    
  return (
    <Box m='0 20px' width={'95%'}>
      <Header title="Audit activities and other reports " subtitle="" />

      <Typography variant="h5" sx={{ fontWeight:"600" }}>Audit Activities</Typography>
      <Button href={`${rootURL}report/audit`} 
      variant="contained" size="small" color="secondary"
      target="_blank" 
      sx={{ textTransform:"none", marginBottom:"20px" }}
      >Download audit activities</Button>

      <Typography variant="h5" sx={{ fontWeight:"600" }}>Draft Document Report</Typography>
      <Button href={`${rootURL}report/drafts`}
      target="_blank" 
      variant="contained" 
      size="small" 
      color="secondary"
      sx={{ textTransform:"none", marginBottom:"20px"  }}
      >Download draft document report</Button>
      </Box> 
  )
}

export default Reports