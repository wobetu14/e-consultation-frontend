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

const DocumentPreview = () => {
  const params=useParams();
  const [documentDetail, setDocumentDetail]=useState(null);
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

  return (
    <Box>
      <Box>
          <Typography variant="h3" sx={{ paddingBottom:"20px", fontWeight:600, textAlign:"center", color:colors.primary[200] }}>
          {documentDetail ? documentDetail.short_title: null}
          </Typography>

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

      </Box>
      <Stack direction="row" spacing={1} justifyContent="end" sx={{ marginRight:"20px" }}>
        {/* Actions on the document */}
            {
                 (documentDetail && documentDetail.draft_status.name==="Pending") ? (
                    <Chip label={`Status: ${documentDetail.draft_status.name}`} size="small" sx={{ backgroundColor:colors.dangerColor[200], color:colors.grey[300] }} />
                  ):""
                }

                {
                  (documentDetail && documentDetail.draft_status.name==="Requested") ? (
                    <Chip label={documentDetail.draft_status.name} size="small" sx={{ backgroundColor:"orange", color:colors.grey[300]}} />
                  ):""
                }

{
                  (documentDetail && documentDetail.draft_status.name==="Open") ? (
                    <Chip label={documentDetail.draft_status.name} size="small" sx={{ backgroundColor:colors.successColor[100], color:colors.grey[300]}} />
                  ):""
                }
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
              userRole==="Uploaders" ? (
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
    <Box>
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
      <Box sx={{ 
        marginRight:"30px",
        marginLeft:"30px",
        paddingBottom:"30px",
         }}>

         <Grid container spacing={2} sx={{ paddingTop:"30px", display:"flex", justifyContent:"space-between" }}>
            <Grid item xs={12} md={12}>
              <Typography variant="h3" sx={{ fontWeight:"500", textAlign:"center", color:colors.primary[100] }}>
                Document Preview 
              </Typography>
            </Grid>
         </Grid>
          <Grid container spacing={2} sx={{ paddingTop:"30px", display:"flex", justifyContent:"space-between" }}>
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
                ):(<Box>Content unavailable</Box>)}
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
                ):(<Box>Content unavailable</Box>)
              }
            </Grid>
            <Grid item xs={2}>
              &nbsp;
            </Grid>
          </Grid>
      </Box>
      </motion.span>
    </Box>    
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