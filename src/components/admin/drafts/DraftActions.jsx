import { Box, Collapse, Card, CardActions, CardContent, CircularProgress, Grid, Paper, Stack, Typography, useTheme, ListItemButton, ListItemText, Button, TextField, List, ListItem, ListItemAvatar, Avatar, Chip, Alert } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import axios from '../../../axios/AxiosGlobal'
import { tokens } from '../../../theme'
import {motion} from 'framer-motion'
import SectionFeedbacks from '../../guest/partials/SectionFeedbacks';
import AddSectionComment from '../../guest/partials/AddSectionComment';
// import NestedList from './partials/SectionNavigationMenu';
import SendIcon from '@mui/icons-material/Send';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DocumentLevelComments from '../../guest/partials/DocumentLevelComments';
import AddDocumentLevelComments from '../../guest/partials/AddDocumentLevelComments';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Drafts, FileDownload } from '@mui/icons-material';
import SectionNavigationMenu from '../../guest/partials/SectionNavigationMenu';
import { UserContext } from '../../../contexts/UserContext';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import DraftMetaInfo from './DraftMetaInfo';
import DocumentPreview from './DocumentPreview';
import OutgoingCommentRequestsDialog from '../partials/OutgoingCommentRequestsDialog';

const DraftActions = ({
      documentDetail,
      serverErrorMsg, 
      serverSuccessMsg, 
      setServerErrorMsg, 
      setServerSuccessMsg, 
      setDocumentDetail
    }) => {
  const params=useParams();
  const [documentSections, setDocumentSections]=useState(null);
  const [documentComments, setDocumentComments]=useState(null);

  const [openDialog, setOpenDialog]=useState(false);

  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

  const [contentBgColor, setContentBgColor]=useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

  return (
    <Box>
 
      <Stack direction="row" spacing={1} justifyContent="end" sx={{ marginRight:"20px" }}>     
            {
           userRole==="Approver" ? (
            (documentDetail && documentDetail.draft_status.name==="Requested") ? (
              <>
              <AcceptApprovalRequest
               documentDetail={documentDetail} 
               serverSuccessMsg={serverSuccessMsg}
               serverErrorMsg={serverErrorMsg}
               setServerSuccessMsg={setServerSuccessMsg} 
               setServerErrorMsg={setServerErrorMsg}
               openDialog={openDialog}
               setOpenDialog={setOpenDialog}
                />
              <RejectApprovalRequest documentDetail={documentDetail} setServerSuccessMsg={setServerSuccessMsg} setServerErrorMsg={setServerErrorMsg} />
            </>
            ):(documentDetail && documentDetail.draft_status.name==="Open") ? (
              <>
              <InviteCommenters documentDetail={documentDetail} setServerSuccessMsg={setServerSuccessMsg} setServerErrorMsg={setServerErrorMsg} />
              <AssignRepliers documentDetail={documentDetail} setServerSuccessMsg={setServerSuccessMsg} setServerErrorMsg={setServerErrorMsg} />
              </>
            ) :""
           ):
           (
              userRole==="Uploader" ? (
                (documentDetail && documentDetail.draft_status.name==="Pending") ?(
                  <>
                   <SendApprovalRequest documentDetail={documentDetail} setServerSuccessMsg={setServerSuccessMsg} setServerErrorMsg={setServerErrorMsg} />
                  {/* <Button variant="contained" color="warning" size="small" sx={{ textTransform:"none" }}>Reject</Button> */}
                  </>
                ):""
              ):""
           )
         }
      </Stack>

    </Box>
  )
}

export default DraftActions;

const SendApprovalRequest = ({documentDetail, setServerSuccessMsg, setServerErrorMsg}) => {
  
const sendOpeningRequest=async () => {
    return await axios.post(`request-for-comment/draft/${documentDetail.id}`)
    .then(res => {
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null)
    })
    .catch(errors =>{
       setServerErrorMsg(errors.response.data.message);
      setServerSuccessMsg(null) 
    }) 
   }

  return(
    <>
      <Button 
      variant="contained" 
      color="secondary" 
      sx={{ textTransform:"none" }}
       onClick={sendOpeningRequest}
      >
        <Typography variant="body1">
            Send opening request &nbsp;
        </Typography>
         <SendIcon fontSize='small' />
      </Button>
    </>
  )
}


const AcceptApprovalRequest =({documentDetail, serverSuccessMsg, serverErrorMsg, setServerSuccessMsg, setServerErrorMsg, openDialog, setOpenDialog})=>{
  const showDialog=()=>{
    setOpenDialog(true);
}

  const acceptCommentOpening=async () => {
    return await axios.post(`approve-comment-opening/draft/${documentDetail.id}`)
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
        onClick={showDialog}
        >  
        Accept
      </Button>

      {
                    openDialog && (
                        <OutgoingCommentRequestsDialog
                          key={documentDetail.id}
                          draftInfo={documentDetail} 
                          serverSuccessMsg={serverSuccessMsg}
                          serverErrorMsg={serverErrorMsg}
                          setServerSuccessMsg={setServerSuccessMsg} 
                          setServerErrorMsg={setServerErrorMsg}
                          openDialog={openDialog}
                          setOpenDialog={setOpenDialog}
                          showDialog={showDialog}
                          title="Accept and Invite Document for Comment."
                        />
                    )
                  }
  </>
)

}

const RejectApprovalRequest = ({documentDetail, setServerSuccessMsg, setServerErrorMsg}) => {
  const rejectCommentOpening=async () => {
    return await axios.post(`request-rejection/draft/${documentDetail.id}`)
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

const InviteCommenters =({documentDetail, setServerSuccessMsg, setServerErrorMsg})=>{
  const inviteCommenters=async () => {
    return await axios.post(`approve-comment-opening/draft/${documentDetail.id}`)
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
        onClick={inviteCommenters}
        > 
        <Typography variant="body2">
          Invite
        </Typography> 
      </Button>
  </>
)

}

const AssignRepliers =({documentDetail, setServerSuccessMsg, setServerErrorMsg})=>{
  const assignRepliers=async () => {
    return await axios.post(`approve-comment-opening/draft/${documentDetail.id}`)
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
        color="primary" 
        sx={{ textTransform:"none", marginRight:"5px" }}
        onClick={assignRepliers}
        >  
        <Typography variant="body2">
          Assign Repliers
        </Typography>
      </Button>
  </>
)

}