import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { tokens } from '../../../theme';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {motion} from 'framer-motion'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import axios from '../../../axios/AxiosGlobal'

const AddSectionComment = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

  // Add new comment to a section

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

 const helperTextStyle={
  color:'red',
  fontWeight:'400',
  fontSize:'15px'
 }

 
 const formik=useFormik({
    initialValues:{
      commentBody:"",
      commentRequestID:8,
      sectionID:2,
      generalComment:"General comment",
      commentedBy:1,
      commentingTeam:1,
      createdBy:1,
    },

validationSchema:YUP.object({
  commentBody:YUP.string().required("This field is required. You can't post empty content."),
  }),

  onSubmit:(values)=>{
    const commentData={
      section_comment:values.commentBody,
      comment_request_id:values.commentRequestID,
      section_id:values.sectionID,
      general_comment:values.generalComment,
      commented_by:values.commentedBy,
      commenting_team:values.commentingTeam,
      created_by:values.createdBy

    };

    addComment(commentData);
  }
}); 
    
const addComment=async (commentData) => {
    //  console.log(companyData)
    return await axios.post('comments', commentData)
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
    <Box width="100%">
      <List width="100%">
              {
                 <form onSubmit={formik.handleSubmit}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt="User" size="large" src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText sx={{ width:"100%", marginRight:"0px" }}
                        primary={
                          <>
                            <TextField 
                              label="Write a comment..." 
                              variant='outlined' 
                              fullWidth
                              multiline
                              color="info"
                              size="small"
                              name='commentBody'
                              value={formik.values.commentBody}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              helperText={formik.touched.commentBody && formik.errors.commentBody ? <span style={helperTextStyle}>{formik.errors.commentBody}</span>:null}
                            />

                            <TextField disabled  name="commentRequestID" value={props.comment_request_id} onChange={formik.handleChange} />
                            <TextField disabled type="hidden" name="sectionID" value={props.section_id} onChange={formik.handleChange} />
                          </>
                        }
                      />

                      <ListItemText
                        primary={
                          <>
                            <Button type="submit" variant='text' color="info" size="large" elevation={0}>
                              <SendIcon />
                            </Button>
                          </>
                        }
                      />
                    </ListItem>
                </form>
              }
            
            </List>
    </Box>
  )
}

export default AddSectionComment