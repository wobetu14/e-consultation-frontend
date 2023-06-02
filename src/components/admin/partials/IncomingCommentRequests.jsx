import { Typography, Button, Stack, Chip, Grid, Alert } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState, useMemo, useLayoutEffect, useContext } from 'react'
import axios from '../../../axios/AxiosGlobal'
import Header from '../AdminHeader';
import { DataGrid } from '@mui/x-data-grid';
import { SignalCellularNullOutlined } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import {motion} from 'framer-motion'
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
import AcceptExternalRequestDialog from '../drafts/external_requests/AcceptExternalRequestDialog';
import RejectExternalRequest from '../drafts/external_requests/RejectExternalRequest';
import AssignCommenters from '../drafts/external_requests/AssignCommenters';


const IncomingCommentRequests = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode); 
    const [incomingCommentData, setIncomingCommentData]=useState(null);

    // Hide and show dialogs
    const [openExternalAcceptanceDialog, setOpenExternalAcceptanceDialog]=useState(false);
    const [openExternalRejectionDialog, setOpenExternalRejectionDialog]=useState(false);
    const [openAssignCommenterDialog, setOpenAssignCommenterDialog]=useState(false);

    const [serverErrorMsg, setServerErrorMsg]=useState(null);
    const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

  const errorStyle={
    color:'red',
    fontWeight:'400',
    fontSize:'18px'
  }

  const successStyle={
   color:'green',
   fontWeight:'400',
   fontSize:'18px'
 }

    const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

    const showExternalAcceptanceDialog=()=>{
      setOpenExternalAcceptanceDialog(true);
    }

    const showExternalRejectionDialog=()=>{
      setOpenExternalRejectionDialog(true);
    }

    const showAssignCommenterDialog=()=>{
      setOpenAssignCommenterDialog(true)
    }

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

<Grid align='center' sx={{ paddingBottom:"15px", paddingTop:'15px' }}>
              <motion.span
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 0.3 }}
              > 
                <Typography variant='h1'>
                  {serverSuccessMsg ? <Alert severity='success' style={successStyle}>{serverSuccessMsg}</Alert>:null}
                </Typography>
                
                <Typography variant='h1'>
                {serverErrorMsg ? <Alert severity='error' style={errorStyle}>{serverErrorMsg}</Alert>:null}
                </Typography> 
              </motion.span>
          </Grid>

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
            <TableCell colSpan={4}>
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
                <Typography variant="body1">
                  {
                    incommingData.status ===0 ? "Pending":(
                    incommingData.status===1 ? "Accepted":"Rejected"
                  )}
                  </Typography>
              </TableCell>
              <TableCell>

              </TableCell>
              <TableCell>
                <Button
                    size='small' 
                    variant="contained" 
                    color="primary" 
                    href={`/admin/external_request_details/${incommingData.draft_id}`}
                    sx={{ textTransform:"none", marginRight:"5px" }}
                    >
                      Detail
                  </Button>

                  {
                    incommingData.status===0 ? (
                      <>
                          <Button
                            size='small' 
                            variant="contained" 
                            onClick={showExternalAcceptanceDialog}
                            sx={{ textTransform:"none", marginRight:"5px", backgroundColor:colors.successColor[200], color:colors.grey[300] }}
                            >
                              Accept
                            </Button>

                            <Button
                                size='small' 
                                variant="contained" 
                                onClick={showExternalRejectionDialog}
                                sx={{ textTransform:"none", marginRight:"5px", backgroundColor:colors.dangerColor[200], color:colors.grey[300] }}
                              >
                              Reject
                            </Button>              
                      </>
                    ):(
                      incommingData.status===1 ? (
                        <>
                          <Button
                            size='small' 
                            variant="contained" 
                            color="info" 
                            onClick={showAssignCommenterDialog}
                            sx={{ textTransform:"none", marginRight:"5px" }}
                            >
                              Assign Commenters
                            </Button>
                        </>
                      ):""
                    )
                  }
                    {
                      openExternalAcceptanceDialog && (
                        <AcceptExternalRequestDialog 
                        requestDetail={incommingData}
                        serverSuccessMsg={serverSuccessMsg}
                        serverErrorMsg={serverErrorMsg}
                        setServerSuccessMsg={setServerSuccessMsg}
                        setServerErrorMsg={setServerErrorMsg}
                        openExternalAcceptanceDialog={openExternalAcceptanceDialog}
                        setOpenExternalAcceptanceDialog={setOpenExternalAcceptanceDialog}
                        title="Accept draft and assign expert to comment"
                        />
                      )
                    }

                    {
                      openExternalRejectionDialog && (
                        <RejectExternalRequest 
                        requestDetail={incommingData}
                          serverSuccessMsg={serverSuccessMsg}
                          serverErrorMsg={serverErrorMsg}
                          setServerSuccessMsg={setServerSuccessMsg}
                          setServerErrorMsg={setServerErrorMsg}
                          openExternalRejectionDialog={openExternalRejectionDialog}
                          setOpenExternalRejectionDialog={setOpenExternalRejectionDialog}
                          title="Reject this draft commenting request"
                        />
                      )
                    }
                    {
                      openAssignCommenterDialog && (
                        <AssignCommenters
                        requestDetail={incommingData}
                        serverSuccessMsg={serverSuccessMsg}
                        serverErrorMsg={serverErrorMsg}
                        setServerSuccessMsg={setServerSuccessMsg}
                        setServerErrorMsg={setServerErrorMsg}
                        openAssignCommenterDialog={openAssignCommenterDialog}
                        setOpenAssignCommenterDialog={setOpenAssignCommenterDialog}
                        title="Assign more commenters for this draft document."
                        />
                      )
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

export default IncomingCommentRequests;

