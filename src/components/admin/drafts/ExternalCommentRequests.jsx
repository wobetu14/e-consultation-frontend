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
import IncomingCommentRequests from '../partials/IncomingCommentRequests';
import OutgoingCommentRequests from '../partials/OutgoingCommentRequests';
import AutoCompleteExample from '../../../AutocompleteExample';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


const ExternalCommentRequests = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode); 
    const [showBox, setShowBox]=useState(false);
   
  return (
    <Box m='0 20px' width={'95%'}>
      <Header title="External Comment Requests" subtitle="Send and Receive Request for Comment to and from other Institutions" />
      <div sx={{ backgroundColor:colors.brandColor[300], width:"900", height:"900", marginBottom:"100px"  }} onMouseEnter={()=>setShowBox(true)} onMouseLeave={()=>setShowBox(false)}>
        {
          <>
          Hello from React. {showBox && (<ChatBubbleIcon fontSize='small' color='info' sx={{ cursor:"pointer" }} onClick={()=>alert("Mouse hover demo.")} />)}
          </>
        }
      </div>

      <IncomingCommentRequests />

      <OutgoingCommentRequests />

     
    </Box> 
  )
}

export default ExternalCommentRequests