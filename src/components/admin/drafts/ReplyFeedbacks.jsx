import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { tokens } from '../../../theme';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import {motion} from 'framer-motion'
// import AddSectionComment from '../partials/AddSectionComment'



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
import { UserContext } from '../../../contexts/UserContext';
// import RepliesToComments from './RepliesToComments.jsx';
import RepliesToComments from '../../guest/partials/RepliesToComments.jsx';
import AddSectionComment from '../../guest/partials/AddSectionComment';
import AddNewReflection from './AddNewReflection';

const ReplyFeedbacks = ({comments, section}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

  const [showComments, setShowComments]=useState(false);
  const [showReplies, setShowReplies]=useState(false);

  // Add new comment to a section

  const [serverErrorMsg, setServerErrorMsg]=useState(null);
  const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

   // User context
   const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

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
         onClick={()=>setShowComments(!showComments)} 
         >
            <ChatBubbleOutlineIcon fontSize="small"/> &nbsp; Comments ({comments.length})
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
                     <>
                      <ListItem alignItems="flex-center" key={comment.id} sx={{ height:"40px" }}>
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
                             
                            <RepliesToComments comment={comment} reflections={comment.reflection_on_comments} />
                           
                        </ListItem>
                        </>
                    ))
                  ) :( "No comments")
                }
            </List>
            {/* <AddSectionComment /> */}
            {/* <AddNewReflection comments={comments} /> */}
            <AddSectionComment section={section} />
          </motion.span>
        </Box>
        )
      }
    </Box>
  )
}

export default ReplyFeedbacks