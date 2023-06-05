import { Typography, Button, Stack, Chip, Grid, Alert, CircularProgress, LinearProgress } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState, useMemo, useLayoutEffect, useContext } from 'react'
import axios from '../../../axios/AxiosGlobal'
import Header from '../AdminHeader';
import { DataGrid } from '@mui/x-data-grid';
import { SignalCellularNullOutlined } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { useTable } from 'react-table';
import {motion} from 'framer-motion'
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


const DraftApprovalRequest = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode); 
    const [draftsData, setDraftsData]=useState(null);

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

    const fetchDrafts =async() =>{
      return await  axios.get('mydrafts')
        .then(res=>{
          console.log(res.data.data)
          setDraftsData(res.data.data)
        }).catch(error=>{
          console.log(error.message);
        })
      }
      
    useEffect(()=>{ 
        fetchDrafts();
    },[draftsData]);

    const closeCommenting=async (draftID) => {
      return await axios.post(`close-comment/draft/${draftID}`)
      .then(res => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null)
      })
      .catch(errors =>{
         setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null) 
      }) 
     }

  return (
    <Box m='0 20px' width={'95%'}>
      <Header title="Draft Approval Request" />
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
      <TableContainer component={Paper} sx={{ marginTop:"50px", marginBottom:"350px" }}>
      <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
          {
                userRole==="Approver"? ( 
                  <TableCell>
                    <Typography variant="h5" fontWeight={600}>Uploader</Typography>
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
              {
                userRole==="Approver"? ( 
                  <TableCell>
                    <Typography variant="body1">{draft.uploader.first_name +" "+ draft.uploader.middle_name}</Typography>
                  </TableCell>
                ):""
              }
              <TableCell>
                <Typography variant="body1">{draft.short_title.substr(0, 30)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{draft.summary.substr(0, 20)}...</Typography>
              </TableCell>
              <TableCell>

                {
                  draft.draft_status.name==="New" ? (
                    <Chip label={draft.draft_status.name} size="small" sx={{ backgroundColor:colors.successColor[200], color:colors.grey[300] }} />
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

                {
                  draft.draft_status.name==="Open" ? (
                    <Chip label={draft.draft_status.name} size="small" sx={{ backgroundColor:colors.successColor[100], color:colors.grey[300]}} />
                  ):""
                }

                {
                  draft.draft_status.name==="Closed" ? (
                    <Chip label={draft.draft_status.name} size="small" sx={{ backgroundColor:colors.dangerColor[200], color:colors.grey[300]}} />
                  ):""
                }
  
              </TableCell>
              <TableCell>
                <Button
                 size='small' 
                 variant="contained" 
                 color="primary" 
                 href={`/admin/document_details/${draft.id}`}
                 sx={{ textTransform:"none", marginRight:"5px" }}
                 >
                   {/* <PreviewIcon size="small"/> */}
                   Detail
                </Button>
              
              {
                userRole==="Uploader" ? (
                  draft.draft_status.name==="New" ? (
                    // <TableCell align="right">
                     <SendApprovalRequest draft={draft} setServerSuccessMsg={setServerSuccessMsg} setServerErrorMsg={setServerErrorMsg} />
                  ):""
                ):
                
                ( ""
                  /* draft.draft_status.name==="Requested" ? (
                    // <TableCell align="right">
                        <>
                          <AcceptApprovalRequest draft={draft} setServerSuccessMsg={setServerSuccessMsg} setServerErrorMsg={setServerErrorMsg}/>
                          <RejectApprovalRequest draft={draft} setServerSuccessMsg={setServerSuccessMsg} setServerErrorMsg={setServerErrorMsg}/>
                        </>
                  ):
                    (
                      draft.draft_status.name==="Open" ? (
                        <Button 
                        variant="contained" 
                        size="small" 
                        sx={{ textTransform:"none", backgroundColor:colors.dangerColor[200], color:colors.grey[300] }}
                        onClick={()=>closeCommenting(draft.id)}
                        >
                          Close Commenting
                        </Button>
                      ):""
                  ) */
                )
                
              }
              </TableCell>
            </TableRow>
          )):
          (
            <TableRow>
              <TableCell colsPan={5}>
                <LinearProgress color='secondary'  />
              </TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
      </Box> 
  )
}

export default DraftApprovalRequest;

const SendApprovalRequest = ({draft, setServerSuccessMsg, setServerErrorMsg}) =>{

  const sendRequestForApproval=async () => {
    return await axios.post(`request-for-comment/draft/${draft.id}`)
    .then(res => {
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null)
    })
    .catch(errors =>{
       setServerErrorMsg(errors.response.data.message);
       setServerSuccessMsg(null) 
    }) 
   }

  return (
    <>
       <Button 
          size='small' 
          variant="contained" 
          color="secondary" 
          sx={{ textTransform:"none", marginRight:"5px" }}
          onClick={sendRequestForApproval}
          >  
          Send Request
        </Button>
    </>
  )
}

const AcceptApprovalRequest =({draft, setServerSuccessMsg, setServerErrorMsg})=>{
  const acceptCommentOpening=async () => {
    return await axios.post(`approve-comment-opening/draft/${draft.id}`)
    .then(res => {
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null)
    })
    .catch(errors =>{
       setServerErrorMsg(errors.response.data.message);
      setServerSuccessMsg(null) 
    }) 
   }

return (
  <>
    <Button 
        size='small' 
        variant="contained" 
        color="success" 
        sx={{ textTransform:"none", marginRight:"5px" }}
        onClick={acceptCommentOpening}
        >  
        Accept
      </Button>
  </>
)

}

const RejectApprovalRequest = ({draft, setServerSuccessMsg, setServerErrorMsg}) => {
  const rejectCommentOpening=async () => {
    return await axios.post(`request-rejection/draft/${draft.id}`)
    .then(res => {
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null)
    })
    .catch(errors =>{
       setServerErrorMsg(errors.response.data.message);
      setServerSuccessMsg(null) 
    }) 
   }
  return (
    <>
      <Button 
          size='small' 
          variant="contained" 
          color="warning" 
          sx={{ textTransform:"none" }}
          onClick={rejectCommentOpening}
          >  
        Reject
        </Button>
    </>
  )
}