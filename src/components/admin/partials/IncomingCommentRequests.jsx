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


const IncomingCommentRequests = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode); 
    const [incomingCommentData, setIncomingCommentData]=useState(null);

    const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

    const incomingCommentRequests =async() =>{
      return await  axios.get(`comment-request?commenter_institution_id=${userInfo.user.institution_id}`)
        .then(res=>res.data.data)
        .then(res=>{
          console.log("Incoming requests")
          setIncomingCommentData(res)
        }).catch(error=>{
          console.log(error.message);
        })
      }
      
    useEffect(()=>{ 
      incomingCommentRequests();
    },[]);

  return (
    <Box>
      
      <Paper elevation={1} sx={{ padding:"5px", backgroundColor:colors.grey[400] }}>
        <Typography variant="h5" sx={{ fontWeight:"600", color:colors.primary[200] }}>
            Incoming Comment Requests
        </Typography>
        <Typography variant="body1" sx={{color:"#000"}}>
            Incoming request for comment from other institutions.
        </Typography>
      </Paper>

      <TableContainer component={Paper} sx={{ marginTop:"20px", marginBottom:"50px" }}>
      <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
          {
                userRole==="Approver"? ( 
                  <TableCell>
                    <Typography variant="h5" fontWeight={600}>From (Institution)</Typography>
                  </TableCell>
                ):""
              }
            <TableCell>
            <Typography variant="h5" fontWeight={600}>Title</Typography>
            </TableCell>
            <TableCell>
            <Typography variant="h5" fontWeight={600}>Acceptance Status</Typography>
            </TableCell>
            <TableCell>
            <Typography variant="h5" fontWeight={600}>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomingCommentData ? incomingCommentData.map((incommingData) => (
            <TableRow
              key={incommingData.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>
                <Typography variant="body1">{incommingData.requester_institution_name}</Typography>
                </TableCell>
              <TableCell>
                <Typography variant="body1">{incommingData.draft_id}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{incommingData.status === 0 ? "Pending":"Accepted"}</Typography>
              </TableCell>
              <TableCell>

              </TableCell>
              <TableCell>
                <Button
                 size='small' 
                 variant="contained" 
                 color="primary" 
                 href={`/admin/document_details/${incommingData.draft_id}`}
                 sx={{ textTransform:"none", marginRight:"5px" }}
                 >
                   {/* <PreviewIcon size="small"/> */}
                   Detail
                </Button>

                {/* <Button
                  size='small' 
                  variant="contained" 
                  color="success" 
                  // href={`/admin/document_details/${incommingData.draft_id}`}
                  sx={{ textTransform:"none", marginRight:"5px" }}
                  >
                   Accept
                </Button> */}
              </TableCell>
            </TableRow>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>
      </Box> 
  )
}

export default IncomingCommentRequests;


const AcceptRequest=({})=>{
  return (
    <>
    <Button 
        size='small' 
        variant="contained" 
        color="success" 
        // href={`/admin/document_preview/${draft.id}`}
        sx={{ textTransform:"none", marginRight:"5px" }}
        >  
        {/* <ApproveIcon size="small" /> */}
        Accept
      </Button>
    </>
  )
}

const RejectRequest =({})=>{
  return (
    <>
      <Button 
          size='small' 
          variant="contained" 
          color="warning" 
          // href={`/admin/document_preview/${draft.id}`}
          sx={{ textTransform:"none" }}
          >  
          {/* <RejectIcon size="small"/> */}
        Reject
        </Button>
    </>
  )
}