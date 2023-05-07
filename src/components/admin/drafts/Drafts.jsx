import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react'
import axios from '../../../axios/AxiosGlobal'
import Header from '../AdminHeader';
import { DataGrid } from '@mui/x-data-grid';
import { SignalCellularNullOutlined } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { useTable } from 'react-table';
import '../../Table.css'
import { useSortBy, useGlobalFilter, usePagination } from 'react-table';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterTable from '../FilterTable';
import DraftsTable from '../DataTables/DraftsTable';
import { DraftsDataProvider } from '../../../contexts/DraftsDataContext';


const Drafts = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode); 

  return (
    <Box m='0 20px' width={'95%'}>
      <Header title="Draft Documents / Consultations" subtitle="Manage draft documents / consultations" />
      <DraftsDataProvider>
       <DraftsTable />
     </DraftsDataProvider>
      </Box> 
  )
}

export default Drafts