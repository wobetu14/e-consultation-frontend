import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Stack, FormControl, InputLabel, Select, useTheme, FormHelperText, MenuItem } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useContext, useEffect, useState } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal';
import { motion } from 'framer-motion';
import { UserContext } from '../../../contexts/UserContext';
import { UsersDataContext } from '../../../contexts/UsersDataContext';

const EditUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

    const [institutions, setInstitutions]=useState(null);
    const [regions, setRegions]=useState(null);
    const [userRoles, setUserRoles]=useState(null);
 

  // User context
  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

   // UsersDataContext
   const {
    users, setUsers, user, setUser, fetchUsers, filteredUsers,
    searchUser,setSearchUser, showUserAddForm, 
    setShowUserAddForm, 
    showUserEditForm, 
    setShowUserEditForm,
    serverErrorMsg,
    setServerErrorMsg,
    serverSuccessMsg,
    setServerSuccessMsg,
}=useContext(UsersDataContext);


const helperTextStyle={
color:'red',
fontWeight:'400',
fontSize:'15px'
}

 useEffect(()=>{
  fetchInstitutions();
 },[])

 useEffect(()=>{
  fetchUserRoles();
 },[])

 useEffect(()=>{
  fetchRegions();
 },[])

 const fetchRegions =async() =>{
  return await  axios.get('regions')
    .then(res=>res.data.data)
    .then(res=>{
      setRegions(res.data)
    }).catch(error=>{
      console.log(error.response.message);
    })
  }
 
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
        // console.log(res);
        setUserRoles(res)
      }).catch(error=>{
        console.log(error.response.message);
      })
    }

 
 const formik=useFormik({
    initialValues:{
        firstName:user.first_name,
        middleName:user.middle_name,
        lastName:user.last_name,
        mobileNumber:user.mobile_number,
        email:user.email,
        roleID:user.roles[0].id,
        regionID:user.region_id,
        institutionID:user.institution_id,
        updatedBy:userInfo.user.updated_by,
       
    },

  onSubmit:(values)=>{
    const userData={
        first_name:values.firstName,
        middle_name:values.middleName,
        last_name:values.lastName,
        mobile_number:values.mobileNumber,
        email:values.email,
        roles:values.roleID,
        updated_by:values.updatedBy, 
        region_id:values.regionID,
        institution_id:values.institutionID,
        _method:'put'
    };

    updateUser(userData);
    fetchUsers();
  }
}); 
    
const updateUser=async (userData) => {
    
     try{
      const res = await  axios.post(`users/${user.id}`, userData);
      // .post(`users/${user.id}`, userData)
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setShowUserEditForm(false);
        fetchUsers();
    } catch(error){
      setServerErrorMsg(error.response.data.message);
      setServerSuccessMsg(null) 
     }

/*     return await axios.put(`users/${user.id}`, userData)
    .then(res => {
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null);
      setShowUserEditForm(false);
      fetchUsers();
    })
    .catch(errors =>{
       setServerErrorMsg(errors.response.data.message);
       setServerSuccessMsg(null) 
    }) */ 
   }
   
  return (
    <Box m='0' width={'95%'}>
      <Header title="Edit user information" subtitle="" />
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
          <Grid item xs={4}>
              <TextField 
                  label="First Name *" 
                  variant='outlined' 
                  size="small"
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
                label="Mobile Number *" 
                variant='outlined' 
                size="small"
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"

                name='mobileNumber'
                value={formik.values.mobileNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.mobileNumber && formik.errors.mobileNumber ? <span style={helperTextStyle}>{formik.errors.mobileNumber}</span>:null}
              /> 
              {
              userInfo ? (
                userInfo.user.roles[0].name==="Super Admin" && formik.values.roleID===4 ? 
                (
                  <FormControl sx={{minWidth: '100%', paddingBottom:'5px' }}>
                      <InputLabel>Select Region *</InputLabel>
                      <Select
                        labelId="region_id"
                        id="region_id"  
                        size="small"
                        color="info"          
                        name='regionID'
                        value={formik.values.regionID}
                        onChange={formik.handleChange}
                        helperText={formik.touched.regionID && formik.errors.regionID ? <span style={helperTextStyle}>{formik.errors.regionID}</span>:null}
                      >

                      <MenuItem value="">
                        <em>Not applicable</em>
                      </MenuItem>
                          {
                            regions ? regions.map((region)=>(
                              <MenuItem value={region.id} key={region.id}>{region.name}</MenuItem>
                            )): null
                          }
                      </Select>
                    <FormHelperText>{formik.touched.regionID && formik.errors.regionID ? <span style={helperTextStyle}>{formik.errors.regionID}</span>:null}</FormHelperText>
                  </FormControl>
                ):""
              ):""
            }

          {
            (userRole && (userRole==="Regional Institutions Admin" || userRole==="Federal Institutions Admin" || userRole==="Super Admin")) ? 
            (
              ""
            ):
            (
              <FormControl sx={{minWidth: '100%', paddingBottom:'5px' }}>
                <InputLabel>Select Institution</InputLabel>
                <Select
                  labelId="institution_id"
                  id="institution_id"  
                  size="small"
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
            )
          }
          </Grid>
          <Grid item xs={4}>
          <TextField 
                  label="Middle Name *" 
                  variant='outlined' 
                  size="small"
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
                label="Email Address *" 
                variant='outlined' 
                size="small"
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"

                name='email'
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.email && formik.errors.email ? <span style={helperTextStyle}>{formik.errors.email}</span>:null}
              />
              

    {/* <Typography variant='body1' sx={{ paddingBottom:'10px' }}>User Role</Typography> */}
              
          </Grid>
          <Grid item xs={4}>
          <TextField 
                  label="Last Name *" 
                  variant='outlined' 
                  size="small"
                  fullWidth
                  sx={{ paddingBottom:"30px" }}
                  color="info"
                  name='lastName'
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={formik.touched.lastName && formik.errors.lastName ? <span style={helperTextStyle}>{formik.errors.lastName}</span>:null}
                />

        <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
                <InputLabel>Select User Role *</InputLabel>
                <Select
                  labelId="user_role"
                  size="small"
                  id="user_role"  
                  color="info"          
                  name='roleID'
                  value={formik.values.roleID}
                  onChange={formik.handleChange}
                  helperText={formik.touched.roleID && formik.errors.roleID ? <span style={helperTextStyle}>{formik.errors.roleID}</span>:null}
                >
                    {
                      userRoles ? userRoles.map((userRole)=>(
                        <MenuItem value={userRole.role.id} key={userRole.id}>{userRole.role.name} </MenuItem>
                      )): null
                    }
                </Select>
              <FormHelperText>{formik.touched.roleID && formik.errors.roleID ? <span style={helperTextStyle}>{formik.errors.roleID}</span>:null}</FormHelperText>
            </FormControl>                        

            
            <Grid 
                  sx={{ paddingBottom:"20px" }}
                  align='right'
                >
              
                <Button type='submit' variant='contained' size="small"
                  sx={{ align:'right', textTransform:'none', backgroundColor:colors.successColor[200], color:colors.grey[300] }}
                  color='info'
                >
                  Save Changes </Button>
                </Grid>
            </Grid>
          </Grid>
        </form>
 </motion.span>
</Box> 
  )
}

export default EditUser