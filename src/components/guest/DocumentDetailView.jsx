import { Box, Collapse, Card, CardActions, CardContent, CircularProgress, Grid, Paper, Stack, Typography, useTheme, ListItemButton, ListItemText, Button, TextField, List, ListItem, ListItemAvatar, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'
import axios from '../../axios/AxiosGlobal'
import { tokens } from '../../theme';
import {motion} from 'framer-motion'
import SectionFeedbacks from './partials/SectionFeedbacks';
import AddSectionComment from './partials/AddSectionComment';
import NestedList from './partials/SectionNavigationMenu';
import SectionNavigationMenu from './partials/SectionNavigationMenu';
import SendIcon from '@mui/icons-material/Send';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DocumentLevelComments from './partials/DocumentLevelComments';
import AddDocumentLevelComments from './partials/AddDocumentLevelComments';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { FileDownload } from '@mui/icons-material';

const DocumentDetailView = () => {
  const params=useParams();
  const [documentDetail, setDocumentDetail]=useState(null);
  const [documentSections, setDocumentSections]=useState(null);
  const [documentComments, setDocumentComments]=useState(null);

  const [contentBgColor, setContentBgColor]=useState(null);

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

  return (
    <Box>
      <Box sx={{ backgroundColor:colors.grey[400], marginBottom:"30px", padding:"40px" }}>
        {
          documentDetail ? (
        <Grid container spacing={10} >
          <Grid item xs={8}>
            <Typography variant="h2" sx={{ paddingBottom:"20px", fontWeight:600, textAlign:"center", color:colors.primary[200] }}>{documentDetail.id} : {documentDetail.short_title}</Typography>
            <Typography variant='h5' sx={{ paddingBottom:"20px", textAlign:"justify" }}>
                {documentDetail.summary}
            </Typography>
            
            <Typography variant="h5" sx={{ paddingBottom:"20px", textAlign:"justify", fontWeight:600 }}>Document Details</Typography>

            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <strong>Institution</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.institution ? documentDetail.institution.name:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Institution's authority</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.institution  ? documentDetail.institution.authority:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Law category</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.law_category ? documentDetail.law_category.name:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Region</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.institution ? documentDetail.institution.region_id:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Draft status</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.draft_status ? documentDetail.draft_status.name:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Sectors</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.sector ? documentDetail.sector.name:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Download</strong> 
              </Grid> 
              <Grid item xs={6} md={6}>
              {documentDetail.file ? (
                // <a href={documentDetail.file} target="_blank" rel='noreferrer' variant="button">
                //   Download
                // </a>
                <Button href={documentDetail.file} variant="contained" color="secondary" target="_blank" sx={{ textTransform:"none", color:"#fff" }}><FileDownload /> Download</Button>
              ):
              (null)} 
              </Grid>

            </Grid>      
          </Grid>
          
          <Grid item xs={4}>
            <Typography variant="h4">
              <strong>Document Statistics</strong>

              <Stack spacing={1}> 
                <Typography variant="body1">Document level comments: 
                    <strong>{documentComments ? documentComments.length:"Not available"}</strong>
                </Typography>

                <Typography variant="body1">Document level comments: 
                    <Button href={`http://196.188.107.43/api/v1/report/draft/${params.id}`}
                      variant="contained" 
                      target="_blank"
                      color="secondary"
                      >
                        Get comment reports here
                    </Button>
                </Typography>
              </Stack>
            </Typography>
          </Grid>
        </Grid>
          ):(
             <CircularProgress color='secondary' />
          )
        }
      </Box>

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
                Document Content 
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
            <Grid item xs={6}>
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

                        <CardActions>
                            <SectionFeedbacks comments={section.comments} />
                        </CardActions>
                        <CardActions>
                          <AddSectionComment section={section} />
                        </CardActions>
                      </Card>
                  ))
                ):(<Box>Content unavailable</Box>)
              }
            </Grid>
            <Grid item xs={3}>

            <ListItemButton onClick={handleCommentsCollapse}>
                <ListItemText primary={
                  <Typography variant='h5' fontWeight="600">General comments ({documentComments && (documentComments.length)})</Typography>
                } />
                {commentsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={commentsOpen} timeout="auto" unmountOnExit>
                <Paper elevation={1} sx={{borderRadius:"3px", borderLeftStyle:"solid", borderLeftWidth:"3px", borderLeftColor:colors.primary[300]}}>
                  {documentComments ? (
                    documentComments.map((comment)=>(
                     
                      <DocumentLevelComments comment={comment} />
                    ))
                  ):(<Box>No comments</Box>)}

                      <AddDocumentLevelComments documentID={documentDetail ? documentDetail.id : params.id} />
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

export default DocumentDetailView