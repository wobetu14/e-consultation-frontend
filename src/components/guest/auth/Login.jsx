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
                  if(res.status!==200){
                    setServerError(res.data.message)
                  }
                  else{
                    if(res.status===200 && res.data.token){
                      
                      setLoggedIn(true)
                      setServerError(null)
                      // setUserInfo(res.data)
                      localStorage.setItem('token', res.data.token);
                      localStorage.setItem('userRole',res.data.user.roles[0].name);
                      localStorage.setItem('userInfo', JSON.stringify(res.data));

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
                      setServerError("Invalid email or password. Please try again.")
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