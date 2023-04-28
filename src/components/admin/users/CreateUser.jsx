import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Stack, FormControl, InputLabel, Select, useTheme, FormHelperText, MenuItem } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useEffect, useState } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';



const CreateUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

    const [institutions, setInstitutions]=useState(null);
    const [userRoles, setUserRoles]=useState(null);

  const [serverErrorMsg, setServerErrorMsg]=useState(null);
  const [serverSuccessMsg, setServerSuccessMsg]=useState(null);

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

 useEffect(()=>{
  fetchInstitutions();
 },[institutions])

 useEffect(()=>{
  fetchUserRoles();
 },[userRoles])

 
 const fetchInstitutions =async() =>{
  return await  axios.get('institutions')
    .then(res=>res.data.data)
    .then(res=>{
      setInstitutions(res.data)
    }).catch(error=>{
      console.log(error.response.message);
    })
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

 
 const formik=useFormik({
    initialValues:{
        firstName:"",
        middleName:"",
        lastName:"",
        mobileNumber:"",
        email:"",
        password:"ABCD1234",
        confirmPassword:"ABCD1234",
        roleID:"",
        institutionID:"",
        createdBy:1,
        updatedBy:1
    },

validationSchema:YUP.object({
    firstName:YUP.string().required("This field is required. Please enter the first name."),
    middleName:YUP.string().required("This field is required. Please enter father name."),
    lastName:YUP.string().required("This field is required. Please enter grandfather name."),
    mobileNumber:YUP.string().required("This field is required. Please enter mobile number."),
    email:YUP.string().required("This field is required. Please enter email address."),
    roleID:YUP.string().required("This field is required. Please select user role."),
    institutionID:YUP.string().required("This field is required. Please select Institution.")
  }),

  onSubmit:(values)=>{
    const userData={
        first_name:values.firstName,
        middle_name:values.middleName,
        last_name:values.lastName,
        mobile_number:values.mobileNumber,
        password:(values.firstName+"."+values.lastName).toLocaleLowerCase(),
        confirm_password:(values.firstName+"."+values.lastName).toLocaleLowerCase(),
        email:values.email,
        roles:values.roleID,
        created_by:values.createdBy,
        updated_by:values.updatedBy, 
        institution_id:values.institutionID
    };

    registerRegion(userData);
  }
}); 
    
const registerRegion=async (userData) => {
    //  console.log(companyData)
    return await axios.post('users', userData)
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
    <Box m='0 20px' width={'95%'}>
      <Header title="Create New User" subtitle="Manage users" />
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
      <Stack
        sx={{ width:"50%" }}
      >
        <form onSubmit={formik.handleSubmit}>
            <TextField 
              label="First Name" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"

              name='firstName'
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.firstName && formik.errors.firstName ? <span style={helperTextStyle}>{formik.errors.firstName}</span>:null}
            />
            <TextField 
              label="Middle Name" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"

              name='middleName'
              value={formik.values.middleName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.middleName && formik.errors.middleName ? <span style={helperTextStyle}>{formik.errors.middleName}</span>:null}
            />
            <TextField 
              label="Last Name" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"

              name='lastName'
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.lastName && formik.errors.lastName ? <span style={helperTextStyle}>{formik.errors.lastName}</span>:null}
            />
            <TextField 
              label="Mobile Number" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"

              name='mobileNumber'
              value={formik.values.mobileNumber}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.mobileNumber && formik.errors.mobileNumber ? <span style={helperTextStyle}>{formik.errors.mobileNumber}</span>:null}
            />
            <TextField 
              label="Email Address" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"

              name='email'
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.email && formik.errors.email ? <span style={helperTextStyle}>{formik.errors.email}</span>:null}
            />

<Typography variant='body1' sx={{ paddingBottom:'10px' }}>User Role</Typography>
          <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
            <InputLabel>Select User Role</InputLabel>
            <Select
              labelId="user_role"
              id="user_role"  
              color="info"          
              name='roleID'
              value={formik.values.roleID}
              onChange={formik.handleChange}
              helperText={formik.touched.roleID && formik.errors.roleID ? <span style={helperTextStyle}>{formik.errors.roleID}</span>:null}
            >
                {
                  userRoles ? userRoles.map((userRole)=>(
                    <MenuItem value={userRole.role.id} key={userRole.id}>{userRole.role.name}</MenuItem>
                  )): null
                }
            </Select>
          <FormHelperText>{formik.touched.roleID && formik.errors.roleID ? <span style={helperTextStyle}>{formik.errors.roleID}</span>:null}</FormHelperText>
        </FormControl>

  <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Select Institution</Typography>
          <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
            <InputLabel>Select Institution</InputLabel>
            <Select
              labelId="institution_id"
              id="institution_id"  
              color="info"          
              name='institutionID'
              value={formik.values.institutionID}
              onChange={formik.handleChange}
              helperText={formik.touched.institutionID && formik.errors.institutionID ? <span style={helperTextStyle}>{formik.errors.institutionID}</span>:null}
            >
                {
                  institutions ? institutions.map((institution)=>(
                    <MenuItem value={institution.id} key={institution.id}>{institution.name}</MenuItem>
                  )): null
                }
            </Select>
          <FormHelperText>{formik.touched.institutionID && formik.errors.institutionID ? <span style={helperTextStyle}>{formik.errors.institutionID}</span>:null}</FormHelperText>
        </FormControl>

            <Typography variant="body2">
                NOTE: Password is set by default for the first time and user will be forced to change upon first time login. 
                Default password for every user is the small later of <strong>firstname.middlename</strong> format
            </Typography>

      <Grid align='center' sx={{ paddingBottom:"15px", paddingTop:'15px' }}>
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

            </motion.span>
        </Grid>

        <Grid 
              sx={{ paddingBottom:"20px" }}
              align='right'
            >
          
            <Button type='submit' variant='contained'
              sx={{ align:'right',backgroundColor:colors.primary[400], textTransform:'none' }}
              color='primary' size='large' elevation={10}
            >
              Save </Button>
            </Grid>
        </form>
      </Stack>
 </motion.span>
</Box> 
  )
}

export default CreateUser