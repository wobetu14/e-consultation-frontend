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

const DraftActions = ({documentDetail,setDocumentDetail}) => {
  const params=useParams();
  const [documentSections, setDocumentSections]=useState(null);
  const [documentComments, setDocumentComments]=useState(null);

  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

  const [contentBgColor, setContentBgColor]=useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

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

  // Menu collapse functionality
  const [articlesOpen, setArticlesOpen] = React.useState(true);

  // General comments collapse functionality
  const [commentsOpen, setCommentsOpen] = React.useState(true);

  const handleArticlesCollapse = () => {
    setArticlesOpen(!articlesOpen);
  };

  const handleCommentsCollapse = () => {
    setCommentsOpen(!commentsOpen);
  };


    useEffect(()=>{
      fetchDocumentSections();
    }, [documentSections])

    useEffect(()=>{
      fetchDocumentComments();
    }, [documentComments])


  const fetchDocumentSections = async()=>{
    return await axios.get(`draft/${params.id}/draft-sections`)
              .then(response =>{
                setDocumentSections(response.data.data)
              }).catch(error=>{
                <p color='red'>{error.response.message}</p>
              })
  }

  const fetchDocumentComments= async()=>{
    return await axios.get(`draft/${params.id}/general-comments`)
              .then(response =>{
                setDocumentComments(response.data.data)
              }).catch(error=>{
                <p color='red'>{error.response.message}</p>
              })
  }

  return (
    <Box>
 
      <Stack direction="row" spacing={1} justifyContent="end" sx={{ marginRight:"20px" }}>     
            {
           userRole==="Approver" ? (
            (documentDetail && documentDetail.draft_status.name==="Requested") ? (
              <>
              <AcceptApprovalRequest documentDetail={documentDetail} setServerSuccessMsg={setServerSuccessMsg} setServerErrorMsg={setServerErrorMsg} />
              <RejectApprovalRequest documentDetail={documentDetail} setServerSuccessMsg={setServerSuccessMsg} setServerErrorMsg={setServerErrorMsg} />
            </>
            ):(
             ""
            )
            
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