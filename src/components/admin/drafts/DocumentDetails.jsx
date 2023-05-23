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
import DraftActions from './DraftActions';

import PersonalInvitations from './Personalnvitations';
import InstitutionInvitations from './InstitutionInvitations';
import CommentRepliers from './CommentRepliers';
import ExternalRequestAcceptanceDialog from './ExternalRequestAcceptanceDialog';

const DocumentDetails = () => {
  const params=useParams();
  const [documentDetail, setDocumentDetail]=useState(null);
  const [documentSections, setDocumentSections]=useState(null);
  const [documentComments, setDocumentComments]=useState(null);
  const [openAcceptanceDialog, setOpenAcceptanceDialog]=useState(false);

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
  const [previewOpen, setPreviewOpen] = React.useState(false);

  // General comments collapse functionality
  const [commentsOpen, setCommentsOpen] = React.useState(true);

  const handlePreviewCollapse = () => {
    setPreviewOpen(!previewOpen);
  };

  const handleCommentsCollapse = () => {
    setCommentsOpen(!commentsOpen);
  };

    useEffect(()=>{
        fetchDocumentDetails();
    }, [documentDetail])

    useEffect(()=>{
      fetchDocumentSections();
    }, [documentSections])

    useEffect(()=>{
      fetchDocumentComments();
    }, [documentComments])

  const fetchDocumentDetails= async()=>{
        return await axios.get(`drafts/${params.id}`)
                .then(response=>{
                    setDocumentDetail(response.data.data);
                })
  };

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

  const handleAcceptanceDialog = ()=>{
    setOpenAcceptanceDialog(true)
  }

  return (
    <Box>

        <Grid align='center' sx={{ paddingBottom:"5px", paddingTop:'5px' }}>
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

    <Button variant="contained" color="success" size="small" onClick={handleAcceptanceDialog}>Accept</Button>

      {
        openAcceptanceDialog && (
          <ExternalRequestAcceptanceDialog 
            documentDetail={documentDetail} 
            setDocumentDetail={setDocumentDetail} 
            serverErrorMsg={serverErrorMsg}
            serverSuccessMsg={serverSuccessMsg}
            setServerErrorMsg={setServerErrorMsg}
            setServerSuccessMsg={setServerSuccessMsg}
            openAcceptanceDialog={openAcceptanceDialog}
            setOpenAcceptanceDialog={setOpenAcceptanceDialog}
          />
        )
      }

      <DraftMetaInfo 
        documentDetail={documentDetail} 
        setDocumentDetail={setDocumentDetail} 
        serverErrorMsg={serverErrorMsg}
        serverSuccessMsg={serverSuccessMsg}
        setServerErrorMsg={setServerErrorMsg}
        setServerSuccessMsg={setServerSuccessMsg}
      />

      

      <ListItemButton 
      onClick={handlePreviewCollapse} 
      sx={{ 
     marginLeft:"40px", 
      marginRight:"40px", 
      marginBottom:"100px", 
      height:"40px",
      backgroundColor:colors.brandColor[200],
      width:"20%",
      alignSelf:"right",
      borderRadius:"20px 20px"
     }}

      >
            <ListItemText primary={
                <Typography variant="body1" 
                    sx={{ fontWeight:"600", textAlign:"center", color:colors.grey[300] }}
                >
                    Document Preview 
                </Typography>
            } />
            {previewOpen ? <ExpandLess sx={{ color:colors.grey[300] }} /> : <ExpandMore sx={{ color:colors.grey[300] }} />}
     </ListItemButton>

        <Collapse 
        in={previewOpen} 
        timeout="auto" 
        unmountOnExit 
        sx={{ marginLeft:"30px", marginRight:"30px" }}
        >
            <DocumentPreview 
              documentDetail={documentDetail} 
              setDocumentDetail={setDocumentDetail} 
              documentSections={documentSections}
              setDocumentSections={setDocumentSections}
              documentComments={documentComments}
              setDocumentComments={setDocumentComments}
            />
     </Collapse>

     {
       userInfo.user.institution_id===params.id ? (
        <>
          <InstitutionInvitations 
          documentDetail={documentDetail}
          />

          <CommentRepliers documentDetail={documentDetail} />

          <PersonalInvitations 
            documentDetail={documentDetail}
          />
        </>
       ):""
     }
        
     

     
    </Box>
  )
}

export default DocumentDetails;

