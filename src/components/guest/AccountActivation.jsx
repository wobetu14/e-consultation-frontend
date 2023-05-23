import {Alert, Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Paper, TextField, Typography, useTheme } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom'
import * as YUP from 'yup';
import {useContext, useEffect, useState} from 'react';
import axios from '../../axios/AxiosGlobal'
import { motion } from 'framer-motion';

import { tokens } from '../../theme';
import { UserContext } from '../../contexts/UserContext';

const AccountActivation = () => {
   const theme=useTheme();
   const colors=tokens(theme.palette.mode);

   const params=useParams();
   const [activation, setActivation]=useState(false);

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
        activateUser();
   }, [])

   const activateUser = async ()=>{
       
      return await axios.get(`activation/${params.token}`)
                .then(res=>{
                    console.log(res.data.data)

                  if(res.status!==200){
                    setServerError(res.data.message)
                  }
                  else{
                    if(res.status===200 && res.data.data.token){
                      setActivation(true)
                      setLoggedIn(true)
                      setServerError(null)
                      // setUserInfo(res.data)
                      localStorage.setItem('token', res.data.data.token);
                      localStorage.setItem('userRole',res.data.data.user.roles[0].name);
                      localStorage.setItem('userInfo', JSON.stringify(res.data.data));

                      setUserRole(localStorage.getItem('userRole'));
                      setUserToken(localStorage.getItem('token'));
                      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
                      

                      if(localStorage.getItem('userRole')==="Commenter"){
                        navigate('/')
                      }
                      else{
                        navigate('/admin')
                      }
                    } 
                    
                    else {
                      setServerError("Ooops! Something went wrong. We couldn't activate this account.")
                    }
                  }
                }).catch(errors=>{
                  setServerError(errors.message)
                })
   }

  return (
    <Box sx={{ marginTop:"100px" }}>
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
     
        <Grid align='center'>
            <p>
            {serverError ? <Alert severity='error' style={errorStyle}>{serverError}</Alert>:null}
            </p> 

           <Typography variant='h5' fontWeight='600'>
                {
                    activation===false ? (
                        "Activation in progress. Please wait"
                    ):""
                }
           </Typography>
        </Grid>
      </motion.span>
    </Box>
  )
}

export default AccountActivation