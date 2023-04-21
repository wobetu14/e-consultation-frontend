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

const SectionFeedbacks = ({comments}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

  const [showComments, setShowComments]=useState(false);

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
      commentRequestID:"",
      sectionID:"",
      generalComment:"",
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
    return await axios.post('regions', commentData)
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
      <Box  sx={{marginBottom:"0", textAlign:"right" }}>
        <Button variant="text"
         size="medium" 
         sx={{marginRight:"5px", 
         textTransform:"none", 
         alignSelf:"right", 
         color:colors.primary[200]}}
         onClick={()=>setShowComments(!showComments)} 
         >
            <ChatBubbleOutlineIcon/> &nbsp; Comments ({comments.length})
        </Button>
        <Button variant="text" 
        size="medium" 
        sx={{marginRight:"5px", 
        textTransform:"none",  
        alignSelf:"right", 
        color:colors.primary[200]}}>
            <ShareIcon /> &nbsp; Share
        </Button>
      </Box>
      {
        showComments && (
        <Box sx={{ padding:"10px", borderRadius:"15px" }}>
          <motion.span
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.3 }}
          >
          
          <hr style={{ height:"2px", backgroundColor:colors.grey[600], opacity:"30%" }} />
            <Typography variant="h5" sx={{ paddingBottom:"5px", fontWeight:"600" }}>Comments ({comments.length})</Typography>

            <List sx={{ width: '100%' }}>
                {
                  comments ? (
                    comments.map((comment)=>(
                      
                      <ListItem alignItems="flex-center" key={comment.id}>
                          <ListItemAvatar>
                            <Avatar alt="User" size="large" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText sx={{ backgroundColor:colors.grey[200], borderRadius:"15px", padding:"10px" }}
                            primary={
                              <>
                                <Typography variant="h5" fontWeight="600">Anonymous</Typography>
                              </>
                            }
                            secondary={
                              <>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body1"
                                  color="text.primary"
                                >
                                  {comment.section_comment}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      // <Typography variant='body1' key={comment.id}>{comment.section_comment}</Typography>
                    ))
                  ) :( "No comments")
                }
            </List>
            <List width="100%">
                <ListItem>
                  <ListItemAvatar>
                      <Avatar alt="User" size="large" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText sx={{ width:"100%", marginRight:"0px" }}
                      primary={
                        <>
                          <TextField 
                            label="Write a comment..." 
                            // variant='filled' 
                            fullWidth
                            multiline
                            color="info"
                            size="small"
                            name='commentBody'
                            value={formik.values.commentBody}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />

                          {/* <TextField disabled name="commentRequestID" value="commentRequestID" onChange={formik.handleChange} />
                          <TextField disabled name="sectionID" value="commentRequestID" onChange={formik.handleChange} /> */}
                        </>
                      }
                    />

                    <ListItemText
                      primary={
                        <>
                          <Button variant='text' 
                          color="info" 
                          size="large" 
                          elevation={0}
                          disabled={formik.values.commentBody===""}
                          >
                            <SendIcon />
                          </Button>
                        </>
                      }
                    />
                </ListItem>
            </List>
          </motion.span>
        </Box>
        )
      }
    </Box>
  )
}

export default SectionFeedbacks