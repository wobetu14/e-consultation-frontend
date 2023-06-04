import {Alert, Avatar, Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, Paper, TextField, Typography, useTheme } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tokens, useMode } from '../../../theme';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import {useContext, useState} from 'react';
import axios from '../../../axios/AxiosGlobal';
import { motion } from 'framer-motion';

import { UserContext } from '../../../contexts/UserContext';
import { useTranslation } from 'react-i18next';

const ResetPasswordProvideEmail = () => {
   const theme=useTheme();
   const colors=tokens(theme.palette.mode);
   const {t}=useTranslation();

   const navigate=useNavigate()
   const {userInfo, setUserInfo, setUserRole, setUserToken}=useContext(UserContext);

   const [loggedIn, setLoggedIn]=useState(false);
   const [serverError, setServerError]=useState(null)

   const [serverErrorMsg, setServerErrorMsg]=useState(null);
   const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

   const [loading, setLoading]=useState(false);

   const errorStyle={
    color:'red',
    fontWeight:'bold'
  }

  const successStyle={
    color:'green',
    fontWeight:'bold'
  }

  const helperTextStyle={
    color:'red',
    fontWeight:'400',
    fontSize:'15px'
   }


  const formikResetPasswordWithEmail=useFormik({
    initialValues:{
        emailAddress:"",
    },

validationSchema:YUP.object({
    emailAddress:YUP.string()
        .required("This field is required. Please enter your email address.")
        .email("Invalide email format.")
  }),

  onSubmit:(values)=>{
    const userData={
        email:values.emailAddress,
    };

   sendPasswordResetCode(userData);
  }
}); 
    
const sendPasswordResetCode=async (userData) => {
    console.log(userData)
    setLoading(true);
    return await axios.post('forgot-password', userData)
    .then(res => {
      console.log(res.data)
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null);
      navigate('/reset_password')
      setLoading(false);
    })
    .catch(errors =>{
      setServerErrorMsg(errors.response.data.message);
      setServerSuccessMsg(null) 
      setLoading(false);
    }) 
   }

  return (
    <Box sx={{ marginTop:"100px" }}>
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
     
      <Paper
        elevation={1} 
        sx={{ padding:"20px", margin:"20px auto", width:"600px", backgroundColor:colors.grey[200] }}
      >
        <Grid align="center">
          <Typography variant='h5' sx={{ fontWeight:600, paddingBottom:'20px', color:colors.headerText[100] }}>
            {t('reset_password')}
          </Typography>
          <Typography variant='body1'>
            {t('reset_password_message')}
          </Typography>

          <Grid align='center' sx={{ paddingBottom:"5px", paddingTop:'5px' }}>
                <motion.span
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.3 }}
                    > 
                    <Typography variant='h1'>
                        {serverSuccessMsg ? <Alert severity='success' style={successStyle}>{serverSuccessMsg}</Alert>:null}
                    </Typography>
                    
                    <Typography variant='h1'>
                    {serverErrorMsg ? <Alert severity='error' style={errorStyle}>{serverErrorMsg}</Alert>:null}
                    </Typography> 
                    {
                        loading ? (<CircularProgress color='info'/>):null
                    }
                </motion.span>
            </Grid>

        </Grid>

        <Grid align='center'>
            <p>
            {serverError ? <Alert severity='error' style={errorStyle}>{serverError}</Alert>:null}
            </p> 

            <p style={successStyle}>
              
            </p>
        </Grid>

        <form onSubmit={formikResetPasswordWithEmail.handleSubmit}>
            <Grid>
            <TextField 
              label={t('email_address')} 
              variant='outlined' 
              placeholder={t('enter_email_address')}
              fullWidth
              size='small'
              sx={{ paddingBottom:"10px" }}
              color="info"

              name='emailAddress'
              value={formikResetPasswordWithEmail.emailAddress}
              onChange={formikResetPasswordWithEmail.handleChange}
              helperText={formikResetPasswordWithEmail.touched.emailAddress && formikResetPasswordWithEmail.errors.emailAddress ? <span style={helperTextStyle}>{formikResetPasswordWithEmail.errors.emailAddress}</span>:null}
            />
            
            </Grid>

            <Grid 
              sx={{ paddingBottom:"5px" }}
            >
            
            
            <Button type='submit' variant='contained'
              color="info"
            fullWidth
              sx={{ backgroundColor:colors.brandColor[200], color:colors.grey[300] }}
            >
              {t('send_code')}
          </Button>
            </Grid>
        </form>
      </Paper>
      </motion.span>
    </Box>
  )
}

export default ResetPasswordProvideEmail