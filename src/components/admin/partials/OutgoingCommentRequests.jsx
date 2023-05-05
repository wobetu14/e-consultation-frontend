import { Typography, Button, Stack, Chip } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState, useMemo, useLayoutEffect, useContext } from 'react'
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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserContext } from '../../../contexts/UserContext';
import PreviewIcon from '@mui/icons-material/Visibility';
import ApproveIcon from '@mui/icons-material/Done';
import RejectIcon from '@mui/icons-material/Clear';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import SendIcon from '@mui/icons-material/Send';


const OutgoingCommentRequests = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode); 
    const [draftsData, setDraftsData]=useState(null);

    const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

    const fetchDrafts =async() =>{
      return await  axios.get(`drafts?institution_id=${userInfo.user.institution_id}`)
        .then(res=>res.data.data)
        .then(res=>{
          setDraftsData(res.data)
        }).catch(error=>{
          console.log(error.message);
        })
      }
      
    useEffect(()=>{ 
        fetchDrafts();
    },[]);

  return (
    <Box>
      <Paper elevation={1} sx={{ padding:"5px", backgroundColor:colors.grey[400] }}>
        <Typography variant="h5" sx={{ fontWeight:"600", color:colors.primary[200] }}>
            Outgoing Comment Requests
        </Typography>
        <Typography variant="body1" sx={{color:"#000"}}>
            Outgoing request for comment to other institutions.
        </Typography>
      </Paper>

      <TableContainer component={Paper} sx={{ marginTop:"20px", marginBottom:"100px" }}>
      <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
          {
                userRole==="Approver"? ( 
                  <TableCell>
                    <Typography variant="h5" fontWeight={600}>To (Institution)</Typography>
                  </TableCell>
                ):""
              }
            <TableCell>
            <Typography variant="h5" fontWeight={600}>Title</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" fontWeight={600}>Description</Typography>
              </TableCell>
            <TableCell>
            <Typography variant="h5" fontWeight={600}>Draft Status</Typography>
            </TableCell>
            <TableCell>
            <Typography variant="h5" fontWeight={600}>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {draftsData ? draftsData.map((draft) => (
            <TableRow
              key={draft.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>
                <Typography variant="body1">{draft.institution_id}</Typography>
                </TableCell>
              <TableCell>
                <Typography variant="body1">{draft.short_title.substr(0, 30)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{draft.summary.substr(0, 20)}...</Typography>
              </TableCell>
              <TableCell>

                {
                  draft.draft_status.name==="Pending" ? (
                    <Chip label={draft.draft_status.name} size="small" sx={{ backgroundColor:colors.dangerColor[200], color:colors.grey[300] }} />
                  ):""
                }

                {
                  draft.draft_status.name==="Requested" ? (
                    <Chip label={draft.draft_status.name} size="small" sx={{ backgroundColor:"orange", color:colors.grey[300]}} />
                  ):""
                }
                {
                  draft.draft_status.name==="Rejected" ? (
                    <Chip label={draft.draft_status.name} size="small" sx={{ backgroundColor:"orangered", color:colors.grey[300]}} />
                  ):""
                }
  
              </TableCell>
              <TableCell>
                <Button
                 size='small' 
                 variant="contained" 
                 color="primary" 
                 href={`/admin/external_requests_preview/${draft.id}`}
                 sx={{ textTransform:"none", marginRight:"5px" }}
                 >
                   {/* <PreviewIcon size="small"/> */}
                   View
                </Button>
              {
                  draft.draft_status.name==="Pending" ? (
                    // <TableCell align="right">
                      <SendRequest draft={draft} />
                  ):""
              }
              </TableCell>
            </TableRow>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>
      </Box> 
  )
}

export default OutgoingCommentRequests;

const SendRequest =({draft}) =>{
  return(
    <>
      <Button 
        size='small' 
        variant="contained" 
        color="secondary" 
        href={`/admin/document_preview/${draft.id}`}
        sx={{ textTransform:"none", marginRight:"5px" }}
        >  
        {/* <SendIcon size="small"/> */}
        Send Request
      </Button>
    </>
  )
}

