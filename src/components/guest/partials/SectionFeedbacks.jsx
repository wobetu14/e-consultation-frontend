import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { tokens } from '../../../theme';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import {motion} from 'framer-motion'
import AddSectionComment from '../partials/AddSectionComment'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import axios from '../../../axios/AxiosGlobal'
import { UserContext } from '../../../contexts/UserContext';
import PublicCommentReplies from './PublicCommentReplies';

const SectionFeedbacks = ({comments, section, documentDetail}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

  const [showFeedbacks, setShowFeedbacks]=useState(false);

  // Add new comment to a section

  const [serverErrorMsg, setServerErrorMsg]=useState(null);
  const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

   // User context
   const {userInfo, setUserInfo, userRole, setUserRole, userToken, setUserToken}=useContext(UserContext);
   

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
      <Box  sx={{marginBottom:"0", textAlign:"right" }}>
        <Button variant="text"
         size="medium" 
         sx={{marginRight:"5px", 
         textTransform:"none", 
         alignSelf:"right", 
         color:colors.primary[200]}}
         onClick={()=>setShowFeedbacks(!showFeedbacks)} 
         >
            <ChatBubbleOutlineIcon fontSize="small"/> &nbsp; {t('comments')} ({userInfo &&  comments.filter((comment)=>{
              return (
                parseInt(comment.commented_by)===parseInt(userInfo.user.id)
              )
            }).length})
        </Button>
       {/*  <Button variant="text" 
        size="medium" 
        sx={{marginRight:"5px", 
        textTransform:"none",  
        alignSelf:"right", 
        color:colors.primary[200]}}>
            <ShareIcon /> &nbsp; Share
        </Button> */}
      </Box>
      {
        showFeedbacks && (
        <Box sx={{ padding:"10px", borderRadius:"15px" }}>
          <motion.span
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.3 }}
          >
          
          <hr style={{ height:"2px", backgroundColor:colors.grey[600], opacity:"30%" }} />
            <Typography variant="h5" sx={{ paddingBottom:"5px", fontWeight:"600" }}>
              {t('comments')} ({userInfo && comments.filter((comment)=>{
                return (
                  parseInt(comment.commented_by)===parseInt(userInfo.user.id)
                )
            }).length})</Typography>

            <List sx={{ width: '100%' }}>
                {
                  comments.length>0 ? (
                    userInfo && comments.filter((comment)=>{
                      return (
                        parseInt(comment.commented_by)===parseInt(userInfo.user.id)
                      )
                    }).map((comment)=>(
                      
                      <>
                        <ListItem alignItems="flex-center" key={comment.id} sx={{ height:"75px" }}>
                          <ListItemAvatar>
                            <Avatar alt="User" size="large" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText sx={{ backgroundColor:colors.grey[200], borderRadius:"15px", padding:"10px" }}
                            primary={
                              <>
                                <Typography variant="h5" fontWeight="600">
                                    {comment.commenter ? `${comment.commenter.first_name+" "+comment.commenter.middle_name}`:"Anonymous"}
                                  </Typography>
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
                        <ListItem>
                          {
                            documentDetail && documentDetail.draft_status.name==="Open" ? (
                              <PublicCommentReplies comment={comment} reflections={comment.reflection_on_comments} />
                            ):""
                          }
                    </ListItem>
                      </>
                    ))
                  ) :( "No comments")
                }
            </List>
            {
              documentDetail && documentDetail.draft_status.name==="Open" ? (
                  (
                    userToken!==null && userToken!==undefined && userRole!=null && userRole!==undefined ) ? (
                    <AddSectionComment section={section} />
                  ):""
              ):""
            }
          </motion.span>
        </Box>
        )
      }
    </Box>
  )
}

export default SectionFeedbacks