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
import DraftOpeningRejectionDialog from './DraftOpeningRejectionDialog';
import InviteMoreDialog from '../../admin/drafts/InviteMoreDialog'
import AssignMoreRepliersDialog from './AssignMoreRepliersDialog';

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
  const [openRejectionDialog, setOpenRejectionDialog]=useState(false);
  const [openInviteDialog, setOpenInviteDialog]=useState(false);
  const [openAssignRepliersDialog, setOpenAssignRepliersDialog]=useState(false);

  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

  const [contentBgColor, setContentBgColor]=useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

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
              <RejectApprovalRequest 
                documentDetail={documentDetail} 
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg} 
                setServerErrorMsg={setServerErrorMsg}
                openRejectionDialog={openRejectionDialog}
                setOpenRejectionDialog={setOpenRejectionDialog} 
                />
            </>
            ):(documentDetail && documentDetail.draft_status.name==="Open") ? (
              <>
              <InviteCommenters
                documentDetail={documentDetail} 

                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg} 
                setServerErrorMsg={setServerErrorMsg}

                openInviteDialog={openInviteDialog}
                setOpenInviteDialog={setOpenInviteDialog} />
              <AssignRepliers 
              documentDetail={documentDetail} 

              serverSuccessMsg={serverSuccessMsg}
              serverErrorMsg={serverErrorMsg}
              setServerSuccessMsg={setServerSuccessMsg} 
              setServerErrorMsg={setServerErrorMsg}

              openAssignRepliersDialog={openAssignRepliersDialog}
              setOpenAssignRepliersDialog={setOpenAssignRepliersDialog} />

                  <Button 
                      size='small' 
                      variant="contained" 
                      color="primary" 
                      sx={{ textTransform:"none", marginRight:"5px", backgroundColor:colors.dangerColor[200], color:colors.grey[300] }}
                      onClick={()=>closeCommenting(documentDetail.id)}
                    >  
                    <Typography variant="body2">
                      Close Commenting
                    </Typography>
                  </Button>
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

const RejectApprovalRequest = ({
    documentDetail,
    serverSuccessMsg,
    serverErrorMsg,
    setServerSuccessMsg,
    setServerErrorMsg,
    openRejectionDialog,
    setOpenRejectionDialog,
}) => {

  const showRejectionDialog=()=>{
    setOpenRejectionDialog(true)
  }

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
          onClick={showRejectionDialog}
          >  
        Reject
        </Button>

        {
                    openRejectionDialog && (
                        <DraftOpeningRejectionDialog
                          key={documentDetail.id}
                          documentDetail={documentDetail}
                          serverSuccessMsg={serverSuccessMsg}
                          serverErrorMsg={serverErrorMsg}
                          setServerSuccessMsg={setServerSuccessMsg}
                          setServerErrorMsg={setServerErrorMsg}
                          openRejectionDialog={openRejectionDialog}
                          setOpenRejectionDialog={setOpenRejectionDialog}
                          showRejectionDialog={showRejectionDialog}
                          title="Reject Draft Opening Request."
                        />
                    )
        }

    </>
  )
}

const InviteCommenters =({
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openInviteDialog,
  setOpenInviteDialog,
})=>{

  const showInviteDialog=()=>{
      setOpenInviteDialog(true)
  }

return (
  <>
    <Button 
        size='small' 
        variant="contained" 
        color="success" 
        sx={{ textTransform:"none", marginRight:"5px" }}
        onClick={showInviteDialog}
        > 
        <Typography variant="body2">
          Invite
        </Typography> 
      </Button>

      {
        openInviteDialog && (
          <>
            <InviteMoreDialog 
              key={documentDetail.id}
              documentDetail={documentDetail}
              serverSuccessMsg={serverSuccessMsg}
              serverErrorMsg={serverErrorMsg}
              setServerSuccessMsg={setServerSuccessMsg}
              setServerErrorMsg={setServerErrorMsg}
              openInviteDialog={openInviteDialog}
              setOpenInviteDialog={setOpenInviteDialog}
              title="Invite more people and institutions for commenting."
            />
          </>
        )
      }
  </>
)

}

const AssignRepliers =({
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openAssignRepliersDialog,
  setOpenAssignRepliersDialog,
})=>{

  const showAssignRepliersDialog=async () => {
    setOpenAssignRepliersDialog(true)
   }

return (
  <>
    <Button 
        size='small' 
        variant="contained" 
        color="primary" 
        sx={{ textTransform:"none", marginRight:"5px" }}
        onClick={showAssignRepliersDialog}
        >  
        <Typography variant="body2">
          Assign Repliers
        </Typography>
      </Button>

      {
        openAssignRepliersDialog && (
          <AssignMoreRepliersDialog 
            key={documentDetail.id}
            documentDetail={documentDetail}
            serverSuccessMsg={serverSuccessMsg}
            serverErrorMsg={serverErrorMsg}
            setServerSuccessMsg={setServerSuccessMsg}
            setServerErrorMsg={setServerErrorMsg}
            openAssignRepliersDialog={openAssignRepliersDialog}
            setOpenAssignRepliersDialog={setOpenAssignRepliersDialog} 
            title="Assign more comment repliers to reply on comments provided on this document."
            />
        )
      }
  </>
)

}