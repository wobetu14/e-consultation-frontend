import { Box, Collapse, Card, CardActions, CardContent, CircularProgress, Grid, Paper, Stack, Typography, useTheme, ListItemButton, ListItemText, Button, TextField, List, ListItem, ListItemAvatar, Avatar, Chip, Alert, LinearProgress } from '@mui/material';
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

const DocumentPreview = ({
        documentDetail,
        setDocumentDetail,
        documentSections,
        setDocumentSections,
        documentComments,
        setDocumentComments
}) => {
  const params=useParams();

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

  return (
    <Box>
        <motion.span
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 0.3 }}
        >
         
          <Grid container spacing={2} sx={{ paddingTop:"10px", display:"flex", justifyContent:"space-between" }}>
            <Grid item xs={3}>
              {/* <Typography variant="h4">Articles</Typography> */}

              <ListItemButton onClick={handleArticlesCollapse}>
                <ListItemText primary={
                  <Typography variant='h5' fontWeight="600">Explore by article</Typography>
                } />
                {articlesOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={articlesOpen} timeout="auto" unmountOnExit>
                {documentSections ? (
                  documentSections.map((section)=>(

                    <SectionNavigationMenu section={section} setContentBgColor={setContentBgColor} />
                  ))
                ):(
                <>
                &nbsp;
                </>)}
              </Collapse>
              {/* </ul> */}
            </Grid>
            <Grid item xs={7}>
              {
                documentSections ? (
                  documentSections.map((section)=>(
                      <Card 
                        elevation={1}
                        sx={{ marginBottom:"20px", padding:"20px" }}
                      key={section.id} id={section.id}>
                        <CardContent>
                          <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center", marginBottom:"30px" }}>{section.section_title}</Typography>
                          <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px" }}>{section.section_body}</Typography>

                           {
                           section.children.length>0 ? section.children.map((sectionChild1)=>(
                            <>
                              <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center" }}>{sectionChild1.section_title}</Typography>
                              <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1.section_body}</Typography>
                              {
                                sectionChild1.children.length>0 ? sectionChild1.children.map((sectionChild1Sub1)=>(
                                  <>
                                    <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center"}}>{sectionChild1Sub1.section_title}</Typography>
                                    <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1Sub1.section_body}</Typography>

                                    {
                                      sectionChild1Sub1.children.length>0 ? sectionChild1Sub1.children.map((sectionChild1Sub1Sub1)=>(
                                        <>
                                          <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center" }}>{sectionChild1Sub1Sub1.section_title}</Typography>
                                          <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1Sub1Sub1.section_body}</Typography>

                                          {
                                            sectionChild1Sub1Sub1.children.length>0 ? sectionChild1Sub1Sub1.children.map((sectionChild1Sub1Sub1Sub1)=>(
                                              <>
                                                <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center" }}>{sectionChild1Sub1Sub1Sub1.section_title}</Typography>
                                                <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1Sub1Sub1Sub1.section_body}</Typography>

                                                {
                                                  sectionChild1Sub1Sub1Sub1.children.length>0 ? sectionChild1Sub1Sub1Sub1.children.map((sectionChild1Sub1Sub1Sub1Sub1)=>(
                                                    <>
                                                      <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center" }}>{sectionChild1Sub1Sub1Sub1.section_title}</Typography>
                                                      <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1Sub1Sub1Sub1.section_body}</Typography>
                                                    </>
                                                  )):""
                                                }
                                              </>
                                            )):""
                                          }
                                        </>
                                      )):""
                                    }
                                  </>
                                )):""
                              }
                            </>
                            )
                           ):""
                          }
                        </CardContent>
                      </Card>
                  ))
                ):(
                <Box>
                  <LinearProgress color="secondary" />
                </Box>)
              }
            </Grid>
            <Grid item xs={2}>
              &nbsp;
            </Grid>
          </Grid>
      </motion.span>    
    </Box>
  )
}

export default DocumentPreview;

const SendApprovalRequest = ({documentDetail, setServerSuccessMsg, setServerErrorMsg}) => {
  
const sendRequestForApproval=async () => {
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
      size="small" 
      sx={{ textTransform:"none" }}
       onClick={sendRequestForApproval}
      >
        Send request
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