import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react'
import { SectorsDataProvider } from '../../../contexts/SectorsDataContext';
import Header from '../AdminHeader';
import SectorsTable from '../DataTables/SectorsTable';


const Sectors = () => {
    
  return (
    <Box m='0 20px' width={'95%'}>
      <Header title="Sectors" subtitle="Manage sectors" />
        <SectorsDataProvider>
          <SectorsTable />
        </SectorsDataProvider>
      </Box> 
  )
}

export default Sectors