import { Alert, Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { tokens } from '../../../theme';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
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
import { UserContext } from '../../../contexts/UserContext';

const AddNewDocumentReply = ({comment, reflections}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

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
   color:colors.primary[100],
   backgroundColor:colors.successColor[400],
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
      commentID:comment.id,
      commentMessage:"",
      file:null,
    },

  onSubmit:(values)=>{
    const replyData={
      general_comment_id:values.commentID,
      message:values.commentMessage,
      file:values.file
    };

    replyDocComment(replyData);
  }
}); 
    
const replyDocComment=async (replyData) => {
    return await axios.post('reply-general-comment', replyData)
    .then(res => {
      console.log(res)
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null);
      formik.resetForm();
    })
    .catch(errors =>{
      setServerErrorMsg(errors.response.data.message);
      setServerSuccessMsg(null) 
    }) 
   }
  

  return (
    <Box width="100%">
      <form onSubmit={formik.handleSubmit}>
            <List width="100%">
                <ListItem>
                  <ListItemAvatar>
                      <Avatar alt="User" size="large" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText sx={{ width:"100%", marginRight:"0px" }}
                      primary={
                        <>
                          <TextField 
                            label={t('write_reply')+"..."}
                            fullWidth
                            multiline
                            color="info"
                            size="small"
                            name='commentMessage'
                            value={formik.values.commentMessage}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                        </>
                      }
                    />

                    <ListItemText
                      primary={
                        <>
                          <Button variant='text'
                          type="submit" 
                          color="info" 
                          size="large" 
                          elevation={0}
                          disabled={formik.values.commentMessage===""}
                          >
                            <SendIcon />
                          </Button>
                        </>
                      }
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                            primary={
                                <>
                                    <Typography variant="body2">
                                    {serverSuccessMsg ? <Alert severity='success' style={successStyle}>Thank you for your feedback. </Alert>:null}
                                    </Typography>
                                    
                                    <Typography variant="body2">
                                    {serverErrorMsg ? <Alert severity='error' style={errorStyle}>{serverErrorMsg}</Alert>:null}
                                    </Typography> 
                                </>
                            }
                        />
                </ListItem>
            </List>
        </form>
    </Box>
  )
}

export default AddNewDocumentReply