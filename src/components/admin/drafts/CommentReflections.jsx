import { Box, Collapse, Card, CardActions, CardContent, CircularProgress, Grid, Paper, Stack, Typography, useTheme, ListItemButton, ListItemText, Button, TextField, List, ListItem, ListItemAvatar, Avatar, Chip } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import axios, { rootURL } from '../../../axios/AxiosGlobal'

import {motion} from 'framer-motion'
import SectionFeedbacks from '../../guest/partials/SectionFeedbacks'
import AddSectionComment from '../../guest/partials/AddSectionComment';
import SectionNavigationMenu from '../../guest/partials/SectionNavigationMenu';
import SendIcon from '@mui/icons-material/Send';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DocumentLevelComments from '../../guest/partials/DocumentLevelComments';
import AddDocumentLevelComments from '../../guest/partials/AddDocumentLevelComments';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { FileDownload } from '@mui/icons-material';
import { tokens } from '../../../theme';
import { UserContext } from '../../../contexts/UserContext';
import ReplyFeedbacks from './ReplyFeedbacks';
import ReplyDocumentLevelComments from './ReplyDocumentLevelComments';


const CommentReflections = () => {
  const params=useParams();
  const [documentDetail, setDocumentDetail]=useState(null);
  const [documentSections, setDocumentSections]=useState(null);
  const [documentComments, setDocumentComments]=useState(null);

  const [contentBgColor, setContentBgColor]=useState(null);
  
  // Show commenting box and comments on mouse enter
  const [commentsVisible, setCommentsVisible]=useState(false);
  const [sectionID, setSectionID]=useState(0);

  // User context
  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

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

  const showComments= (boxID) =>{
    setSectionID(boxID);
    setCommentsVisible(true)
  }

  const hideComments = (boxID) => {
    setSectionID(boxID);
    setCommentsVisible(false)
  }

  return (
    <Box 
      sx={{ backgroundColor:colors.grey[200] }}
    >
      <Box sx={{ backgroundColor:"#255B7E", marginBottom:"30px", paddingRight:"80px", paddingLeft:"80px", paddingBottom:"40px", paddingTop:"40px" }}>
        {
          documentDetail ? (
        <Grid container spacing={10} >
          <Grid item xs={8}>
            <Typography variant="h3" 
            sx={{ paddingBottom:"20px", fontWeight:600, textAlign:"center", color:"white" }}>
              {documentDetail.short_title}
              </Typography>
            <Typography variant='body1' sx={{ paddingBottom:"30px", textAlign:"justify", color:"white" }}>
                {documentDetail.summary}
            </Typography>
            
            <Typography variant="h4" sx={{ paddingBottom:"20px", textAlign:"justify", fontWeight:500, color:"white" }}>Document Details</Typography>

            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5" sx={{ color:"white" }}>
                    <strong>Institution</strong> 
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} sx={{ color:"white" }}>
              {documentDetail.institution ? documentDetail.institution.name:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant="h5" sx={{ color:"white" }}>
                  <strong>Law category</strong> 
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} sx={{ color:"white" }}>
              {documentDetail.law_category ? documentDetail.law_category.name:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant="h5" sx={{ color:"white" }}>
                  <strong>Draft status</strong> 
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                    {
                        (documentDetail && documentDetail.draft_status.name==="Pending") ? (
                            <Chip label={`${documentDetail.draft_status.name}`} size="small" sx={{ backgroundColor:colors.dangerColor[200], color:colors.grey[300] }} />
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
                        (documentDetail && documentDetail.draft_status.name==="Closed") ? (
                            <Chip label={documentDetail.draft_status.name} size="small" sx={{ backgroundColor:colors.dangerColor[200], color:colors.grey[300]}} />
                        ):""
                    }
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant="h5" sx={{ color:"white" }}>
                  <strong>Opening date for comment</strong> 
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
              <Chip 
                label={documentDetail.comment_opening_date 
                    ? 
                    documentDetail.comment_opening_date
                    :
                    "Unavailable"}
                size="small" 
                sx={{ backgroundColor:colors.successColor[200], color:colors.grey[300] }} />
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant='h5' sx={{ color:"white" }}>
                    <strong>Closing date for comment</strong> 
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
              <Chip 
                label={documentDetail.comment_closing_date ? documentDetail.comment_closing_date:"Unavailable"}
                size="small" 
                sx={{ backgroundColor:colors.dangerColor[200], color:colors.grey[300] }} />
              
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant="h5" sx={{ color:"white" }}>
                  <strong>Base Legal Reference</strong>
                </Typography> 
              </Grid>
              <Grid item xs={6} md={6} sx={{ color:"white" }}>
              {documentDetail.base_legal_reference ? documentDetail.base_legal_reference:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant="h5" sx={{ color:"white" }}>
                    <strong>Definition</strong> 
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} sx={{ color:"white" }}>
              {documentDetail.definition ? documentDetail.definition:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant='h5' sx={{ color:"white" }}>
                  <strong>Document File</strong>
                </Typography>

              </Grid>
              <Grid item xs={6} md={6}>
                  <Button 
                    href={documentDetail.file} 
                    variant="contained" color="secondary" 
                    target="_blank" 
                    size="small"
                    sx={{ textTransform:"none", color:"#fff", backgroundColor:"#3dac94", borderRadius:"10px 10px" }}
                    >
                      <Typography variant="body1">
                          <FileDownload fontSize='small' /> {t('download')}
                      </Typography>
                  </Button>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={3}>
              {
                documentDetail && documentDetail.draft_status.name==="Closed" ? (
                  <>
                    <Paper elevation={1} sx={{ padding:"20px", backgroundColor:"#fff3eb", borderRadius:"0px 30px" }}>
                <Typography variant="h4" sx={{ color:colors.primary[200] }}>
                  <strong>Document Statistics</strong>
                </Typography>
                    <br />
                <Stack spacing={1}> 
                  <Typography variant="body1" sx={{ color:colors.primary[200] }}>Document level comments: 
                      <strong>{documentComments ? documentComments.length:"Not available"}</strong>
                  </Typography>
                  <Button 
                      href={`${rootURL}report/draft/${params.id}`}
                      variant="contained" 
                      color="secondary" 
                      target="_blank" 
                      size="small"
                      sx={{ textTransform:"none", color:"#fff", backgroundColor:"#3dac94", borderRadius:"10px 10px" }}
                      >
                        <Typography variant="body1">
                          {t('comment_reports')}
                        </Typography>
                    </Button>
                </Stack>
              </Paper>
                  </>
                ):""
              }
          </Grid>
        </Grid>
          ):(
             <CircularProgress color='secondary' />
          )
        }
      </Box>

    <Box 
      sx={{ backgroundColor:colors.grey[200] }}
    >
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
              <Typography variant="h4" sx={{ fontWeight:"600", textAlign:"center", color:colors.primary[100] }}>
                {t('document_content')} 
              </Typography>
            </Grid>
         </Grid>
          <Grid container spacing={2} sx={{ paddingTop:"30px", display:"flex", justifyContent:"space-between" }}>
            <Grid item xs={3}>
              {/* <Typography variant="h4">Articles</Typography> */}

              <ListItemButton onClick={handleArticlesCollapse}>
                <ListItemText primary={
                  <Typography variant='h5' fontWeight="600">{t('explore_by_article')}</Typography>
                } />
                {articlesOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={articlesOpen} timeout="auto" unmountOnExit>
                {documentSections ? (
                  documentSections.map((section)=>(
                    <>
                      <SectionNavigationMenu section={section} setContentBgColor={setContentBgColor} paddingValue={0} />
                      {
                        section.children.length>0 ? (
                          section.children.map((child1)=>(
                            <>
                              <SectionNavigationMenu section={child1} setContentBgColor={setContentBgColor} paddingValue={4}  />
                                {
                                  child1.children.length>0 ? (
                                      child1.children.map((child11)=>(
                                        <>
                                          <SectionNavigationMenu section={child11} setContentBgColor={setContentBgColor} paddingValue={8}  />

                                          {
                                            child11.children.length>0 ? (
                                              child11.children.map((child111)=>(
                                                <>
                                                  <SectionNavigationMenu section={child111} setContentBgColor={setContentBgColor} paddingValue={12} />
                                                    {
                                                      child111.children.length>0 ? (
                                                        child111.children.map((child1111)=>(
                                                          <>
                                                            <SectionNavigationMenu section={child1111} setContentBgColor={setContentBgColor} paddingValue={16}  />
                                                            {
                                                              child1111.children.length>0 ? (
                                                                child1111.children.map((child11111)=>(
                                                                  <>
                                                                    <SectionNavigationMenu section={child11111} setContentBgColor={setContentBgColor} paddingValue={18}  />
                                                                  </>
                                                                ))
                                                              ):""
                                                            }
                                                          </>
                                                        ))
                                                      ):""
                                                    }
                                                </>
                                              ))
                                            ):""
                                          }
                                        </>
                                      ))
                                    ):""
                                }
                            </>
                          ))
                        ):""
                      }
                    </>
                  ))
                ):(<Box>
                  <CircularProgress color="secondary" />
                </Box>)}
              </Collapse>
              {/* </ul> */}
            </Grid>
            <Grid item xs={6}>
              {
                documentSections ? (
                  documentSections.map((section)=>(
                      <Card 
                        elevation={1}
                        sx={{ marginBottom:"20px" }}
                      key={section.id}>
                        <CardContent>
                          <Box id={section.id} sx={{ padding:"20px" }} /* onMouseOver={()=>showComments(section.id)} onMouseOut={()=>hideComments(section.id)} */>
                            <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center", marginBottom:"30px" }}>{section.section_title}</Typography>
                            <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px" }}>{section.section_body}</Typography>
                              
                              {
                                (userRole==="Commenter") && (
                                  <ReplyFeedbacks documentDetail={documentDetail} comments={section.comments} section={section} />
                                )
                              }
                          </Box>
                           {
                           section.children.length>0 ? section.children.map((sectionChild1)=>(
                            <>
                              <Box id={sectionChild1.id} sx={{ padding:"20px" }} /* onMouseOver={()=>showComments(sectionChild1.id)} onMouseOut={()=>hideComments(sectionChild1.id)} */>
                                <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center" }}>{sectionChild1.section_title}</Typography>
                                <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1.section_body}</Typography>
                                
                                {
                                (/* commentsVisible && sectionID===sectionChild1.id &&  */ userRole==="Commenter") && (
                                  <ReplyFeedbacks documentDetail={documentDetail} comments={sectionChild1.comments} section={sectionChild1} />
                                )
                               }
                              </Box>
                              {
                                sectionChild1.children.length>0 ? sectionChild1.children.map((sectionChild1Sub1)=>(
                                  <>
                                  <Box id={sectionChild1Sub1.id} sx={{ padding:"20px" }}>
                                    <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center"}}>{sectionChild1Sub1.section_title}</Typography>
                                    <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1Sub1.section_body}</Typography>
                                        {
                                        (userRole==="Commenter") && (
                                          <ReplyFeedbacks documentDetail={documentDetail} comments={sectionChild1Sub1.comments} section={sectionChild1Sub1} />
                                          )
                                        }
                                  </Box>
                                    {
                                      sectionChild1Sub1.children.length>0 ? sectionChild1Sub1.children.map((sectionChild1Sub1Sub1)=>(
                                        <>
                                        <Box id={sectionChild1Sub1Sub1.id} sx={{ padding:"20px" }} >
                                          <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center" }}>{sectionChild1Sub1Sub1.section_title}</Typography>
                                          <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1Sub1Sub1.section_body}</Typography>
                                          {
                                        (userRole==="Commenter") && (
                                          <ReplyFeedbacks documentDetail={documentDetail} comments={sectionChild1Sub1Sub1.comments} section={sectionChild1Sub1Sub1} />
                                            )
                                          }
                                        </Box>
                                          {
                                            sectionChild1Sub1Sub1.children.length>0 ? sectionChild1Sub1Sub1.children.map((sectionChild1Sub1Sub1Sub1)=>(
                                              <>
                                              <Box id={sectionChild1Sub1Sub1Sub1.id} sx={{ padding:"20px" }} >
                                                <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center" }}>{sectionChild1Sub1Sub1Sub1.section_title}</Typography>
                                                <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1Sub1Sub1Sub1.section_body}</Typography>
                                                
                                                {
                                                  (userRole==="Commenter") && (
                                                    <ReplyFeedbacks documentDetail={documentDetail} comments={sectionChild1Sub1Sub1Sub1.comments} section={sectionChild1Sub1Sub1Sub1} />
                                                  )
                                                }
                                              </Box>
                                                {
                                                  sectionChild1Sub1Sub1Sub1.children.length>0 ? sectionChild1Sub1Sub1Sub1.children.map((sectionChild1Sub1Sub1Sub1Sub1)=>(
                                                    <>
                                                    <Box id={sectionChild1Sub1Sub1Sub1Sub1.id} sx={{ padding:"20px" }} >
                                                      <Typography variant="h4" sx={{ fontWeight:600, textAlign:"center" }}>{sectionChild1Sub1Sub1Sub1Sub1.section_title}</Typography>
                                                      <Typography variant='body1' sx={{ textAlign:"justify", lineSpacing:"45px", marginBottom:"30px" }}>{sectionChild1Sub1Sub1Sub1Sub1.section_body}</Typography>   
                                                      {
                                                        (userRole==="Commenter") && (
                                                          <ReplyFeedbacks documentDetail={documentDetail} comments={sectionChild1Sub1Sub1Sub1Sub1.comments} section={sectionChild1Sub1Sub1Sub1Sub1} /> 
                                                        )
                                                      }
                                                    </Box>
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
                ):(<Box>
                  <CircularProgress color='secondary' />
                </Box>)
              }
            </Grid>
            <Grid item xs={3}>

            <ListItemButton onClick={handleCommentsCollapse}>
                <ListItemText primary={
                  <Typography variant='h5' fontWeight="600">{t('general_comments')} ({documentComments && userInfo && (documentComments.filter((comment)=>{
                    return (
                      parseInt(comment.commenter ? comment.commenter.id:"")===parseInt(userInfo.user.id)
                    )
                  }).length)})</Typography>
                } />
                {commentsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={commentsOpen} timeout="auto" unmountOnExit>
                <Paper elevation={1} sx={{borderRadius:"3px", borderLeftStyle:"solid", borderLeftWidth:"3px", borderLeftColor:"#255B7E"}}>
                {documentComments ? (
                    userInfo && documentComments.filter((comment)=>{
                      return (
                        parseInt(comment.commenter ? comment.commenter.id:"")===parseInt(userInfo.user.id)
                      )
                    }).map((comment)=>(
                     
                      <ReplyDocumentLevelComments documentDetail={documentDetail} comment={comment} />
                    ))
                  ):(<Box>No comments</Box>)}
                  {
                    (userRole==="Commenter") && documentDetail && documentDetail.draft_status.name==="Open" ? (
                      <AddDocumentLevelComments documentID={documentDetail ? documentDetail.id : params.id} />
                    ):""
                  }
                 </Paper>
              </Collapse>
             
            </Grid>
          </Grid>
      </Box>
      </motion.span>
    </Box>    
    </Box>
  )
}

export default CommentReflections