import { Box, Collapse, Card, CardActions, CardContent, CircularProgress, Grid, Paper, Stack,LinearProgress, Typography, useTheme, ListItemButton, ListItemText, Button, TextField, List, ListItem, ListItemAvatar, Avatar, Chip, Alert } from '@mui/material';
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
import DraftActions from './DraftActions';

const DraftMetaInfo = ({
  documentDetail,
  setDocumentDetail,
  serverErrorMsg,
  serverSuccessMsg,
  setServerErrorMsg,
  setServerSuccessMsg,
}) => {
  const params=useParams();
  const [documentSections, setDocumentSections]=useState(null);
  const [documentComments, setDocumentComments]=useState(null);

  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

  const [contentBgColor, setContentBgColor]=useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();
  

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

      <Box sx={{ marginBottom:"30px", padding:"40px" }}>
        {
          documentDetail ? (
        <Grid container >
          <Grid item xs={8}>
            <Typography variant="h3" sx={{ paddingBottom:"20px", fontWeight:600, textAlign:"center", color:colors.primary[200] }}>{documentDetail.short_title}</Typography>
            <Typography variant='h5' sx={{ paddingBottom:"30px", textAlign:"justify" }}>
                {documentDetail.summary}
            </Typography>
            
            <Typography variant="h4" sx={{ paddingBottom:"20px", textAlign:"justify", fontWeight:600, color:colors.primary[200] }}>Document Details</Typography>

            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <strong>Institution</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.institution ? documentDetail.institution.name:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Law category</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.law_category ? documentDetail.law_category.name:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Draft status</strong> 
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
                  
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Opening date for comment</strong> 
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
                <strong>Closing date for comment</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              <Chip 
                label={documentDetail.comment_closing_date ? documentDetail.comment_closing_date:"Unavailable"}
                size="small" 
                sx={{ backgroundColor:colors.dangerColor[200], color:colors.grey[300] }} />
              
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Base Legal Reference</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.base_legal_reference ? documentDetail.base_legal_reference:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Definition</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
              {documentDetail.definition ? documentDetail.definition:null}
              </Grid>

              <Grid item xs={6} md={6}>
                <strong>Document Access</strong> 
              </Grid>
              <Grid item xs={6} md={6}>
                <Chip 
                  label={documentDetail ? documentDetail.is_private===0 ? "Public":"Private"
                :
                "Unavailable"}
                size="small" 
                // sx={{ backgroundColor:colors.dangerColor[200], color:colors.grey[300] }}
              />
              </Grid>

          {/*     <Grid item xs={6} md={6}>
                <strong>Download</strong> 
              </Grid> 
              <Grid item xs={6} md={6}>
              {documentDetail.file ? (
                <Button href={documentDetail.file} variant="contained" color="secondary" target="_blank" sx={{ textTransform:"none", color:"#fff" }}><FileDownload /> Download Draft</Button>
              ):
              (null)
              } 
              </Grid> */}

            </Grid>      
          </Grid>

          
              <Grid item xs={4}>
                <DraftActions 
                documentDetail={documentDetail} 
                setDocumentDetail={setDocumentDetail} 
                
                serverErrorMsg={serverErrorMsg}
                serverSuccessMsg={serverSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
                />
          </Grid>
            ):""
          
          
        </Grid>
          ):(
             <LinearProgress color='secondary' />
          )
        }
      </Box> 
    </Box>
  )
}

export default DraftMetaInfo;
