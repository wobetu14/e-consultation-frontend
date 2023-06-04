import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Stack, FormControl, InputLabel, Select, useTheme, FormHelperText, MenuItem, CircularProgress, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import "yup-phone";
import { useContext, useEffect, useState } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';
import { UsersDataContext } from '../../../contexts/UsersDataContext';
import { UserContext } from '../../../contexts/UserContext';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const ChangePassword = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

    const [institutions, setInstitutions]=useState(null);
    const [regions, setRegions]=useState(null);
    const [userRoles, setUserRoles]=useState(null);

    const [serverErrorMsg, setServerErrorMsg]=useState(null);
    const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

    const [loading, setLoading]=useState(false);

    
  
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


  const fetchUserRoles =async() =>{
    return await  axios.get('roles')
      .then(res=>res.data.data)
      .then(res=>{
        console.log(res);
        setUserRoles(res)
      }).catch(error=>{
        console.log(error.response.message);
      })
    }

 
 const formikChangePassword=useFormik({
    initialValues:{
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
    },

validationSchema:YUP.object({
    oldPassword:YUP.string().required("This field is required. Please enter your old password."),
    newPassword:YUP.string().required("This field is required. Please enter your new password."),
    confirmPassword:YUP.string().required("This field is required. Please re-enter password to confirm.")
    .oneOf([YUP.ref('newPassword'), null], "Confirmation password didn't match.")
  }),

  onSubmit:(values)=>{
    const userData={
        old_password:values.oldPassword,
        password:values.newPassword,
        confirm_password:values.confirmPassword
    };

   changePassword(userData);
  }
}); 
    
const changePassword=async (userData) => {
    console.log(userData)
    setLoading(true);
    return await axios.post('change-password', userData)
    .then(res => {
      console.log(res.data)
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null);
      formikChangePassword.resetForm();
      setLoading(false);
    })
    .catch(errors =>{
      setServerErrorMsg(errors.response.data.message);
      setServerSuccessMsg(null);
      setLoading(false);
    }) 
   }
   
  return (
    <Box m='0' width="95%">
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

      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
    <form onSubmit={formikChangePassword.handleSubmit}>
      {/* <Grid container spacing={2}>
          <Grid item xs={4}> */}
              <TextField 
                  label="Enter old password *" 
                  type='password'
                  variant='outlined' 
                  size="small"
                  fullWidth
                  sx={{ paddingBottom:"30px" }}
                  color="info"
                  name='oldPassword'
                  value={formikChangePassword.values.oldPassword}
                  onBlur={formikChangePassword.handleBlur}
                  onChange={formikChangePassword.handleChange}
                  helperText={formikChangePassword.touched.oldPassword && formikChangePassword.errors.oldPassword ? <span style={helperTextStyle}>{formikChangePassword.errors.oldPassword}</span>:null}
                />
              <TextField 
                label="Enter new password *" 
                type="password"
                variant='outlined' 
                size="small"
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"

                name='newPassword'
                value={formikChangePassword.values.newPassword}
                onBlur={formikChangePassword.handleBlur}
                onChange={formikChangePassword.handleChange}
                helperText={formikChangePassword.touched.newPassword && formikChangePassword.errors.newPassword ? <span style={helperTextStyle}>{formikChangePassword.errors.newPassword}</span>:null}
              /> 

            <TextField 
                label="Confirm Password *" 
                type="password"
                variant='outlined' 
                size="small"
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"

                name='confirmPassword'
                value={formikChangePassword.values.confirmPassword}
                onBlur={formikChangePassword.handleBlur}
                onChange={formikChangePassword.handleChange}
                helperText={formikChangePassword.touched.confirmPassword && formikChangePassword.errors.confirmPassword ? <span style={helperTextStyle}>{formikChangePassword.errors.confirmPassword}</span>:null}
              />

                <Grid 
                  sx={{ paddingBottom:"20px" }}
                  align='right'
                >
              
                <Button type='submit' variant='contained' size="small"
                    sx={{ align:'right', textTransform:'none' }}
                    color='info'
                    >
                    Change Password
                </Button>
                </Grid>
          {/* </Grid>
        </Grid> */}
    </form>
 </motion.span>
</Box> 
  )
}

export default ChangePassword