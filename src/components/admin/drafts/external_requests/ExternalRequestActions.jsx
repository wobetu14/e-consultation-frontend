import { Box, Collapse, Card, CardActions, CardContent, CircularProgress, Grid, Paper, Stack, Typography, useTheme, ListItemButton, ListItemText, Button, TextField, List, ListItem, ListItemAvatar, Avatar, Chip, Alert } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import axios from '../../../../axios/AxiosGlobal'
import {motion} from 'framer-motion'
import SendIcon from '@mui/icons-material/Send';
import * as YUP from 'yup';

import OutgoingCommentRequestsDialog from '../../partials/OutgoingCommentRequestsDialog';
import DraftOpeningRejectionDialog from '../DraftOpeningRejectionDialog';
import InviteMoreDialog from '../InviteMoreDialog';
import AssignMoreRepliersDialog from '../AssignMoreRepliersDialog';
import { tokens } from '../../../../theme';
import { UserContext } from '../../../../contexts/UserContext';

const ExternalRequestActions = ({
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

  return (
    <Box>
 
      {/* <Stack direction="row" spacing={1} justifyContent="end" sx={{ marginRight:"20px" }}>     
            {
           userRole==="Approver" ? (
            (documentDetail && documentDetail.draft_status.name==="Requested") ? (
              <>
              
            </>
            ):(documentDetail && documentDetail.draft_status.name==="Open") ? (
              <>
              <AcceptCommentInvitation
               documentDetail={documentDetail} 
               serverSuccessMsg={serverSuccessMsg}
               serverErrorMsg={serverErrorMsg}
               setServerSuccessMsg={setServerSuccessMsg} 
               setServerErrorMsg={setServerErrorMsg}
               openDialog={openDialog}
               setOpenDialog={setOpenDialog}
                />
              <RejectCommentInvitation 
                documentDetail={documentDetail} 
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg} 
                setServerErrorMsg={setServerErrorMsg}
                openRejectionDialog={openRejectionDialog}
                setOpenRejectionDialog={setOpenRejectionDialog} 
                />
             
              <AssignCommenters 
              documentDetail={documentDetail} 

              serverSuccessMsg={serverSuccessMsg}
              serverErrorMsg={serverErrorMsg}
              setServerSuccessMsg={setServerSuccessMsg} 
              setServerErrorMsg={setServerErrorMsg}

              openAssignRepliersDialog={openAssignRepliersDialog}
              setOpenAssignRepliersDialog={setOpenAssignRepliersDialog} />
              </>
            ) :""
           ):"" 
         }
      </Stack> */}

    </Box>
  )
}

export default ExternalRequestActions;


const AcceptCommentInvitation =({
  documentDetail, 
  serverSuccessMsg, 
  serverErrorMsg, 
  setServerSuccessMsg, 
  setServerErrorMsg, 
  openDialog, 
  setOpenDialog
})=>{
  const showDialog=()=>{
    setOpenDialog(true);
}

  const acceptInvitation=async () => {
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

const RejectCommentInvitation = ({
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




const AssignCommenters =({
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