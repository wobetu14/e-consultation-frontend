import {Alert, Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Paper, TextField, Typography, useTheme } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom'
import * as YUP from 'yup';
import {useContext, useEffect, useState} from 'react';
import axios from '../../../axios/AxiosGlobal';
import { motion } from 'framer-motion';

import Login from '../../guest/auth/Login';
import { tokens } from '../../../theme';
import { UserContext } from '../../../contexts/UserContext';
import DraftInvitationCheckpoint from '../../guest/auth/DraftInvitationCheckpoint'

const RedirectCommentInvitation = () => {
   const theme=useTheme();
   const colors=tokens(theme.palette.mode);

   const params=useParams();
   const [activation, setActivation]=useState(false);
   const [hasAccount, setHasAccount]=useState(false);

   const navigate=useNavigate()
   const {userInfo, setUserInfo, setUserRole, setUserToken}=useContext(UserContext);

   const [loggedIn, setLoggedIn]=useState(false);
   const [serverError, setServerError]=useState(null)

   const errorStyle={
    color:'red',
    fontWeight:'bold'
  }

  const successStyle={
    color:'green',
    fontWeight:'bold'
  }

   useEffect(()=>{
        redirectUSer();
   }, [])

   const redirectUSer = async ()=>{

       if(userInfo){
           setHasAccount(true)
           navigate(`/draft/${params.id}`)
       } 
   }

  return (
    <Box sx={{ marginTop:"100px" }}>
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
     
        <Grid align='center'>
          {
            
          }
           <Typography variant='h5' fontWeight='600'>
                {
                    hasAccount===false && (
                             <DraftInvitationCheckpoint draftID={params.id} />
                        )
                }
           </Typography>
        </Grid>
      </motion.span>
    </Box>
  )
}

export default RedirectCommentInvitation