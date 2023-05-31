import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Paper, Stack, FormControl, InputLabel, Select, useTheme, MenuItem, FormHelperText, RadioGroup, Radio } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useContext, useEffect, useState } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';
import { UserContext } from '../../../contexts/UserContext';
import { InstitutionsDataContext } from '../../../contexts/InstitutionsDataContext';



const CreateInstitution = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

    const [institutionsTypes, setInstitutionTypes]=useState(null);
    const [institutionsCategories, setInstitutionCategories]=useState(null);
    const [institutionsLevels, setInstitutionLevels]=useState(null);

    const [regions, setRegions]=useState(null);
    const [sectors, setSectors]=useState(null);

   // User context
   const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);
   const {
       institutions,
       setInstitutions,
       filteredInstitutions,
       setFilteredInstitutions,
       searchInstitution,
       setSearchInstitution,
       institution,
       setInstitution,
       showInstitutionAddForm,
       setShowInstitutionAddForm,
       showInstitutionEditForm,
       setShowInstitutionEditForm,
       serverErrorMsg,
       setServerErrorMsg,
       serverSuccessMsg,
       setServerSuccessMsg,
       loading,
       setLoading
   }=useContext(InstitutionsDataContext);

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
  fetchInstitutionTypes();
},[]);

useEffect(()=>{
  fetchRegions();
},[])

useEffect(()=>{
  fetchEconomicSectors();
},[])

const fetchInstitutionTypes =async() =>{
return await  axios.get('institution-types')
  .then(res=>res.data.data)
  .then(res=>{
    setInstitutionTypes(res.data)
  }).catch(error=>{
    console.log(error.response.message);
  })
}

useEffect(()=>{
  fetchInstitutionCategories();
},[])

const fetchInstitutionCategories =async() =>{
return await  axios.get('institution-categories')
  .then(res=>res.data.data)
  .then(res=>{
    setInstitutionCategories(res.data)
  }).catch(error=>{
    console.log(error.response.message);
  })
}

useEffect(()=>{
  fetchInstitutionLevels();
},[])

const fetchInstitutionLevels =async() =>{
return await  axios.get('institution-levels')
  .then(res=>res.data.data)
  .then(res=>{
    setInstitutionLevels(res.data)
  }).catch(error=>{
    console.log(error.response.message);
  })
}

const fetchRegions =async() =>{
  return await  axios.get('regions')
    .then(res=>res.data.data)
    .then(res=>{
      setRegions(res.data)
    }).catch(error=>{
      console.log(error.response.message);
    })
  }

  const fetchEconomicSectors =async() =>{
    return await  axios.get('sectors')
      .then(res=>res.data.data)
      .then(res=>{
        setSectors(res.data)
      }).catch(error=>{
        console.log(error.response.message);
      })
    }

 
 const formik=useFormik({
    initialValues:{
      institutionName:institution.name,
      institutionCategoryId:institution.institution_category_id,
      institutionLevelId:institution.institution_level_id,

      email:institution.email,
      telephone:institution.telephone,
      address:institution.address,
      canCreateDraft:institution.can_create_draft,
      
      createdBy:userInfo.user.id,
      updatedBy:userInfo.user.id,
    },

  onSubmit:(values)=>{
    const institutionData={
      name:values.institutionName,
      institution_category_id:values.institutionCategoryId,
      institution_level_id:values.institutionLevelId,

      email:values.email,
      telephone:values.telephone,
      address:values.address,
      created_by:values.createdBy,
      can_create_draft:values.canCreateDraft,
      updated_by:values.updatedBy,
      _method:'put'
    };
    createInstitution(institutionData);
  }
}); 
    
const createInstitution=async (institutionData) => {
    //  console.log(companyData)
    setLoading(true)
    return await axios.post(`institutions/${institution.id}`, institutionData)
    .then(res => {
      console.log(res.data)
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null);
      formik.resetForm();
      setLoading(false)
    })
    .catch(errors =>{
       setServerErrorMsg(errors.response.data.message);
       setServerSuccessMsg(null) 
       setLoading(false);
    }) 
   }
   
  return (
    <Box width={'95%'}>
      <Header title="Update Institution Info" subtitle="" />
      <h3>{formik.values.institutionName}</h3>
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
              <TextField 
                  label="Institution Name" 
                  variant='outlined' 
                  size="small"
                  fullWidth
                  sx={{ paddingBottom:"30px" }}
                  color="info"
                  name='institutionName'
                  value={formik.values.institutionName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  // helperText={formik.touched.institutionName && formik.errors.institutionName ? <span style={helperTextStyle}>{formik.errors.institutionName}</span>:null}
                />

            <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
                <InputLabel>Select Institution Category</InputLabel>
                <Select
                  labelId="institution_category_id"
                  id="institution_category"  
                  size='small'
                  label="Select Institution Category"
                  placeholder='Select Institution Category'
                  color="info"          
                  name='institutionCategoryId'
                  value={formik.values.institutionCategoryId}
                  onChange={formik.handleChange}
                  // helperText={formik.touched.institutionCategoryId && formik.errors.institutionCategoryId ? <span style={helperTextStyle}>{formik.errors.institutionCategoryId}</span>:null}
                >
                    {
                      institutionsCategories ? institutionsCategories.map((institutionsCategory)=>(
                        <MenuItem value={institutionsCategory.id} key={institutionsCategory.id}>{institutionsCategory.name}</MenuItem>
                      )): null
                    }
                </Select>
              {/* <FormHelperText>{formik.touched.institutionCategoryId && formik.errors.institutionCategoryId ? <span style={helperTextStyle}>{formik.errors.institutionCategoryId}</span>:null}</FormHelperText> */}
            </FormControl>

            <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
                <InputLabel>Select Institution Level</InputLabel>
                <Select
                  labelId="institution_level_id"
                  id="institution_level"  
                  size='small'
                  label="Select Institution Level"
                  placeholder='Select Institution Level'
                  color="info"          
                  name='institutionLevelId'
                  value={formik.values.institutionLevelId}
                  onChange={formik.handleChange}
                  // helperText={formik.touched.institutionLevelId && formik.errors.institutionLevelId ? <span style={helperTextStyle}>{formik.errors.institutionLevelId}</span>:null}
                >
                    {
                      institutionsLevels ? institutionsLevels.map((institutionsLevel)=>(
                        <MenuItem value={institutionsLevel.id} key={institutionsLevel.id}>{institutionsLevel.name}</MenuItem>
                      )): null
                    }
                </Select>
              {/* <FormHelperText>{formik.touched.institutionLevelId && formik.errors.institutionLevelId ? <span style={helperTextStyle}>{formik.errors.institutionLevelId}</span>:null}</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
              <TextField 
                label="Email Address" 
                variant='outlined' 
                size="small"
                type="email"
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"
                name='email'
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={formik.touched.email && formik.errors.email ? <span style={helperTextStyle}>{formik.errors.email}</span>:null}
              />
              <TextField 
                label="Telephone Number" 
                variant='outlined' 
                size='small'
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"
                name='telephone'
                value={formik.values.telephone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={formik.touched.telephone && formik.errors.telephone ? <span style={helperTextStyle}>{formik.errors.telephone}</span>:null}
              />
          </Grid>
          <Grid item xs={4}>
            <TextField 
                label="Address" 
                variant='outlined' 
                size='small'
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"
                name="address"
                value={formik.values.address}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={formik.touched.address && formik.errors.address ? <span style={helperTextStyle}>{formik.errors.address}</span>:null}
              />

          <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Can this institution create draft document?</Typography>
              <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="canCreateDraft"
                      size="small"
                      value={formik.values.canCreateDraft}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel value={1} checked={institution.can_create_draft===1} control={<Radio />} label="Yes"  />
                      <FormControlLabel value={0} checked={institution.can_create_draft===0} control={<Radio />} label="No"  />
                </RadioGroup>

          <Grid 
                sx={{ paddingBottom:"20px" }}
                align='right'
              >
            
              <Button type='submit' 
                variant='contained'
                size="small"
                sx={{ align:'right', textTransform:'none' }}
                color='secondary'
              >
                Save Changes</Button>
              </Grid>
          </Grid>
        </Grid>
    </form>
 </motion.span>
</Box> 
  )
}

export default CreateInstitution