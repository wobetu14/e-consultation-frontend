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

const SectionFeedbacks = ({section}) => {
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
      sectionID:section.id,
      sectionComment:"",
      commentedBy:userInfo ? (userInfo.user.id):"",
      commentingTeam:1,
      createdBy:userInfo ? (userInfo.user.id):"",
    },

  onSubmit:(values)=>{
    const sectionCommentData={
      section_id:values.sectionID,
      section_comment:values.sectionComment,
      commented_by:values.commentedBy,
      commenting_team:values.commentingTeam,
      created_by:values.createdBy
    };

    addComment(sectionCommentData);
  }
}); 
    
const addComment=async (sectionCommentData) => {
    return await axios.post('comments', sectionCommentData)
    .then(res => {
      console.log(res.data.message)
      setServerSuccessMsg(res.data.success);
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
                            label={t('write_comment')+"..."}
                            fullWidth
                            multiline
                            color="info"
                            size="small"
                            name='sectionComment'
                            value={formik.values.sectionComment}
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
                          disabled={formik.values.sectionComment===""}
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
                                    {serverSuccessMsg ? <Alert severity='success' style={successStyle}>{t('Thank_you_for_feedback')} </Alert>:null}
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

export default SectionFeedbacks