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
import InstitutionsTable from '../DataTables/InstitutionsTable';
import { InstitutionsDataProvider } from '../../../contexts/InstitutionsDataContext';

const Institutions = () => {

  return (
    <Box m='0 20px' width={'95%'}>
       <InstitutionsDataProvider>
          <InstitutionsTable />
       </InstitutionsDataProvider>
        
      </Box> 
  )
}

export default Institutions