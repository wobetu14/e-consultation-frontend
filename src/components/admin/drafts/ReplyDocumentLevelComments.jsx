import { Box, Button, Paper, TextField, Typography, useTheme } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { tokens } from '../../../theme';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {motion} from 'framer-motion'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import axios from '../../../axios/AxiosGlobal'
import RepliesToGeneralComments from '../../admin/drafts/RepliesToGeneralComments';

const ReplyDocumentLevelComments = ({comment}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation();

  return (
    <>
        
          <motion.span
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.3 }}
          >
            <List sx={{ width: '100%', paddingTop:"20px" }}>
                <ListItem alignItems="flex-center" key={comment.id} sx={{ height:"40px" }}>
                    <ListItemAvatar>
                    <Avatar alt="User" size="large" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText sx={{ backgroundColor:colors.grey[200], borderRadius:"10px", padding:"10px" }}
                    primary={
                        <>
                        <Typography variant="h5" fontWeight="600">
                          {comment.commenter ? `${comment.commenter.first_name + " "+comment.commenter.middle_name}`: "Anonymous"}
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
                            {comment.general_comment}
                        </Typography>
                        </>
                    }
                    />
                </ListItem>  
                <RepliesToGeneralComments comment={comment} reflections={comment.reflection_on_general_comments} />
            </List>
          </motion.span>
    </>
  )
}

export default ReplyDocumentLevelComments