import {Alert, Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Paper, TextField, Typography, useTheme } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tokens, useMode } from '../../../theme';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import {useContext, useState} from 'react';
import axios from '../../../axios/AxiosGlobal';
import { motion } from 'framer-motion';

import { UserContext } from '../../../contexts/UserContext';

const Login = () => {
   const theme=useTheme();
   const colors=tokens(theme.palette.mode);

const navigate=useNavigate()
   const {userInfo, setUserInfo}=useContext(UserContext);

   const [loginInfo, setLoginInfo]=useState(null);
   const [serverError, setServerError]=useState(null)

   const errorStyle={
    color:'red',
    fontWeight:'bold'
  }

  const successStyle={
    color:'green',
    fontWeight:'bold'
  }


   const formik=useFormik({
      initialValues:{
        email:"",
        password:""
      },

      onSubmit:(values)=>{
        const userData={
          email:values.email,
          password:values.password
        };
        userLogin(userData);
      }
   });

   const userLogin = async (userData)=>{
      return await axios.post('login', userData)
                .then(res=>{
                  if(res.data.status!==200){
                    setServerError(res.data.message)
                    setLoginInfo(null)
                    console.log(serverError);
                  }
                  else{
                    if(res.data.status===200){
                      setLoginInfo(res.data)
                      setServerError(null)
                      setUserInfo(res.data)
                      console.log("Hello world.");
                      localStorage.setItem('token', res.data.token)
                      console.log(res.data);
                      navigate('/contacts')
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
       {
         userInfo ? (
           <>
            <h1>{userInfo.message}</h1>
            <p>{userInfo.token}</p>
            <p>Role: {userInfo.role}</p>
            <p>Login Status: {userInfo.status}</p>
           </>
         ) :null
       }
     
      <Paper
        elevation={1} 
        sx={{ padding:"20px", margin:"20px auto", width:"400px", backgroundColor:colors.grey[200] }}
      >
        <Grid align="center">
          <Avatar sx={{ backgroundColor:colors.brandColor[200], width:"40px", height:"40px", marginBottom:"5px" }}>
            <LockOutlinedIcon sx={{ width:"20px", height:"20px" }} />
          </Avatar>
          <Typography variant='h5' sx={{ fontWeight:400, paddingBottom:'20px' }} >
            Sign In
          </Typography>
        </Grid>

        <Grid align='center'>
            <p>
            {serverError ? <Alert severity='error' style={errorStyle}>{serverError}</Alert>:null}
            </p> 

            <p style={successStyle}>
              {
                loginInfo ? (
                 <>
                  <li>Message: {loginInfo.message}</li>
                  <li>Role: {loginInfo.role}</li>
                  <li>Status: {loginInfo.status}</li>
                  <li>Token: {loginInfo.token}</li>
                  <li>Username: {loginInfo.username}</li>
                 </>
                )
                :
                null
              }
            </p>
        </Grid>

        <form onSubmit={formik.handleSubmit}>
            <Grid>
            <TextField 
              label="Email address" 
              variant='outlined' 
              placeholder='Enter user name'
              required 
              fullWidth
              size='small'
              sx={{ paddingBottom:"10px" }}
              color="info"

              name='email'
              value={formik.email}
              onChange={formik.handleChange}
            />
            <TextField 
              label="Password" 
              type="password"
              variant='outlined' 
              placeholder='Enter password' 
              required 
              fullWidth 
              size='small'
              sx={{ paddingBottom:'5px' }}
              color="info"

              name='password'
              value={formik.password}
              onChange={formik.handleChange}
            />
            </Grid>

            <Grid 
              sx={{ paddingBottom:"5px" }}
            >
            <FormControlLabel
              control={
                <Checkbox
                  name="checkeboxname"
                  color='info'
                  />
              }
              label="Remember me"
            />
            
            <Button type='submit' variant='outlined' fullWidth
              sx={{ backgroundColor:colors.brandColor[200], color:colors.grey[900] }}
              color='info'
            >
              Sign In</Button>
            </Grid>
              <Typography>
                <Link href="#">
                  Forgot password?
                </Link>
              </Typography>
              <Typography>
                Don't you have an account? &nbsp;
                <Link href="#">
                  Sign up
                </Link>
              </Typography> 
        </form>
      </Paper>
      </motion.span>
    </Box>
  )
}

export default Login