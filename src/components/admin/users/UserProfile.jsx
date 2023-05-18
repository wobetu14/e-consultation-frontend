import { Typography, Button, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert } from '@mui/material';
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState, useMemo, useLayoutEffect, useContext } from 'react'
import axios from '../../../axios/AxiosGlobal'
import Header from '../AdminHeader';
import { SignalCellularNullOutlined } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { useTable } from 'react-table';
import '../../Table.css'
import { useSortBy, useGlobalFilter, usePagination } from 'react-table';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterTable from '../FilterTable';
import { UserContext } from '../../../contexts/UserContext';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { motion } from 'framer-motion';


const UserProfile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    const [usersData, setUsersData]=useState(null);
    const [showProfileForm, setShowProfileForm]=useState(false);
    const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

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
          userID:userInfo ? (userInfo.user.id):"",
          firstName:userInfo ? (userInfo.user.first_name):"",
          middleName:userInfo ? (userInfo.user.middle_name):"",
          lastName:userInfo ? (userInfo.user.last_name):"",
          mobileNumber:userInfo ? (userInfo.user.mobile_number):"",
          email:userInfo ? (userInfo.user.email):"",
          roleID:userInfo.user.roles[0].id,
          // institutionID:userInfo ? (userInfo.user.institution_id):"",
          updatedBy:userInfo ? (userInfo.user.id):""
      },
  
  validationSchema:YUP.object({
      firstName:YUP.string().required("This field is required. Please enter the first name."),
      middleName:YUP.string().required("This field is required. Please enter father name."),
      lastName:YUP.string().required("This field is required. Please enter grandfather name."),
      mobileNumber:YUP.string().required("This field is required. Please enter mobile number."),
      email:YUP.string().required("This field is required. Please enter email address."),
      roleID:YUP.string().required("This field is required. Please select user role."),
      // institutionID:YUP.string().required("This field is required. Please select Institution.")
    }),
  
    onSubmit:(values)=>{
      const userData={
          id:values.userID,
          first_name:values.firstName,
          middle_name:values.middleName,
          last_name:values.lastName,
          mobile_number:values.mobileNumber,
          email:values.email,
          roles:values.roleID,
          // created_by:values.createdBy,
          updated_by:values.updatedBy, 
          // institution_id:values.institutionID
      };
  
      registerUser(userData);
    }
  }); 

  const registerUser=async (userData) => {
    //  console.log(companyData)
    return await axios.patch(`users/${userInfo.user.id}`, userData)
    .then(res => {
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null)
    })
    .catch(errors =>{
       setServerErrorMsg(errors.response.data.message);
      setServerSuccessMsg(null) 
    }) 
   }

    const fetchUser = async() =>{
      return await axios.get(`users/${userInfo.user.id}`)
        .then(res=>res.data)
        .then(res=>{
            console.log(res.data)
          setUsersData(res.data)
        }).catch(error=>{
          console.log(error.message);
        })
      }
      
    useEffect(()=>{ 
        fetchUser()
    },[usersData]);

  return (
    <Box m='0 20px' width={'95%'}>
      <Header title="User Profile" subtitle="Manage Profile" />
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
      <Grid container>
        <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="200px"
                  height="200px"
                  src={`../../assets/images/img_avatar.png`}
                  style={{ cursor: "pointer", borderRadius:"10px 50px"}}
                />
              </Box>
        </Grid>
        <Grid item xs={8}>
            <Paper elevation={1} sx={{ padding:"20px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant='h5' sx={{ fontWeight:"600" }}>Full Name</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5">{usersData ? (usersData.first_name +" "+ usersData.middle_name +" " +usersData.last_name):""}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h5' sx={{ fontWeight:"600" }}>Email Address</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5">{usersData ? usersData.email:""}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h5' sx={{ fontWeight:"600" }}>Mobile Number</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5">{usersData ? usersData.mobile_number :""}</Typography>
                    
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h5' sx={{ fontWeight:"600" }}>Region</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5">{usersData ? usersData.region_id:""}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h5' sx={{ fontWeight:"600" }}>Institution</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h5">{usersData ? usersData.institution:""}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h5' sx={{ fontWeight:"600" }}>Roles</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {
                      usersData ? usersData.roles.map((role)=>(
                        <Typography variant="h5">{usersData.roles[0].name}</Typography>
                      )):""
                    }
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h5' sx={{ fontWeight:"600" }}>&nbsp;</Typography>
                  </Grid>
                  <Grid item xs={8}>
                   <Button 
                   variant="contained" 
                   color="secondary" 
                   size="small"
                   elevation={2}
                   onClick={()=>setShowProfileForm(!showProfileForm)}
                   >
                     {
                       showProfileForm ? (
                        <>
                          <VisibilityOffIcon /> &nbsp; Hide form 
                        </>
                       ):(
                         <>
                            <EditIcon /> &nbsp; Edit
                         </>
                       )
                     }
                     </Button>
                  </Grid>
                </Grid>
            </Paper>
        </Grid>
      </Grid>

      {
        showProfileForm && 

    <Box m='0 20px' width={'95%'}>
      <Typography variant="h4" sx={{ fontWeight:"500", marginBottom:"20px", marginTop:"20px" }}>Account Settings</Typography>
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField 
                  label="First Name" 
                  variant='outlined' 
                  fullWidth
                  size='small'
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
                  size='small'
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
                  size='small'
                  name='lastName'
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={formik.touched.lastName && formik.errors.lastName ? <span style={helperTextStyle}>{formik.errors.lastName}</span>:null}
                />
            </Grid>
            <Grid item xs={6}>
            <TextField 
                  label="Mobile Number" 
                  variant='outlined' 
                  fullWidth
                  size='small'
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
              size='small'
              name='email'
              disabled
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.email && formik.errors.email ? <span style={helperTextStyle}>{formik.errors.email}</span>:null}
            />

          <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
            <InputLabel>Select user role</InputLabel>
            <Select
              label="Select user role"
              labelId="user_role"
              id="user_role"  
              color="info"      
              size='small'    
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

          {/* <FormControl sx={{minWidth: '100%'}}>
            <InputLabel>Select Institution</InputLabel>
            <Select
              label="Select Institution"
              labelId="institution_id"
              id="institution_id"  
              color="info"   
              size='small'       
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
        </FormControl> */}

        <Grid 
              sx={{ marginBottom:"100px", marginTop:"30px" }}
              align='right'
            >
          
            <Button type='submit' variant='contained'
              size="small"
              color='secondary'
            >
              Save changes</Button>
            </Grid>
          </Grid>
            </Grid>
        </form>
 </motion.span>
</Box> 
      }

      </Box> 
  )
}

export default UserProfile