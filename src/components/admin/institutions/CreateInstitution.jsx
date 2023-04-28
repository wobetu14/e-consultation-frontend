import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Paper, Stack, FormControl, InputLabel, Select, useTheme, MenuItem, FormHelperText, RadioGroup, Radio } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useEffect, useState } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';



const CreateInstitution = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    const [institutionsTypes, setInstitutionTypes]=useState(null);
    const [regions, setRegions]=useState(null);
    const [sectors, setSectors]=useState(null);

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
  fetchInstitutionTypes();
},[institutionsTypes]);

useEffect(()=>{
  fetchRegions();
},[regions])

useEffect(()=>{
  fetchEconomicSectors();
},[regions])

const fetchInstitutionTypes =async() =>{
return await  axios.get('instutition-types')
  .then(res=>res.data.data)
  .then(res=>{
    setInstitutionTypes(res.data)
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
      institutionName:"",
      institutionTypeId:"",
      regionId:"",
      authority:"",
      email:"",
      telephone:"",
      location:"",
      sectorID:"",
      canCreateDraft:"",
      createdBy:1,
      updatedBy:1
    },

validationSchema:YUP.object({
    institutionName:YUP.string().required("This field is required. Please enter the institution name."),
    institutionTypeId:YUP.number().required("This field is required. Please enter the institution type."),
    regionId:YUP.number().required("This field is required. Please enter the region name of the institution."),
    authority:YUP.string().required("This field is required. Please enter the institutions authority."),
    email:YUP.string().required("This field is required. Please enter the email address of the institution."),
    telephone:YUP.number().required("This field is required. Please enter the telephone number of the institution."),
    location:YUP.string().required("This field is required. Please enter the location of the institution."),
    sectorID:YUP.string().required("This field is required. Please select economic sector."),
    canCreateDraft:YUP.number().required("This field is required. Please choose an option."),
  }),

  onSubmit:(values)=>{
    const institutionData={
      name:values.institutionName,
      institution_type_id:values.institutionTypeId,
      region_id:values.regionId,
      authority:values.authority,
      email:values.email,
      telephone:values.telephone,
      location:values.location,
      sector_id:values.sectorID,
      created_by:values.createdBy,
      can_create_draft:values.canCreateDraft,
      updated_by:values.updatedBy
    };
    createInstitution(institutionData);
  }
}); 
    
const createInstitution=async (institutionData) => {
    //  console.log(companyData)
    return await axios.post('institutions', institutionData)
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
      <Header title="Create New Institution" subtitle="Manage Institutions" />
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
              label="Institution Name" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='institutionName'
              value={formik.values.institutionName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.institutionName && formik.errors.institutionName ? <span style={helperTextStyle}>{formik.errors.institutionName}</span>:null}
            />

      <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Institution Type</Typography>
          <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
            <InputLabel>Select Institution Type</InputLabel>
            <Select
              labelId="institution_type_id"
              id="institution_type_id"  
              label="Select Institution Type"
              placeholder='Select Institution Type'
              color="info"          
              name='institutionTypeId'
              value={formik.values.institutionTypeId}
              onChange={formik.handleChange}
              helperText={formik.touched.institutionTypeId && formik.errors.institutionTypeId ? <span style={helperTextStyle}>{formik.errors.institutionTypeId}</span>:null}
            >
                {
                  institutionsTypes ? institutionsTypes.map((institutionsType)=>(
                    <MenuItem value={institutionsType.id} key={institutionsType.id}>{institutionsType.name}</MenuItem>
                  )): null
                }
            </Select>
          <FormHelperText>{formik.touched.institutionTypeId && formik.errors.institutionTypeId ? <span style={helperTextStyle}>{formik.errors.institutionTypeId}</span>:null}</FormHelperText>
        </FormControl>
            
            {/* <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
                Institution Type ID
            </Typography>
            <TextField 
              variant='outlined' 
              type="number"
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='institutionTypeId'
              value={formik.values.institutionTypeId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.institutionTypeId && formik.errors.institutionTypeId ? <span style={helperTextStyle}>{formik.errors.institutionTypeId}</span>:null}
            /> */}

<Typography variant='body1' sx={{ paddingBottom:'10px' }}>Region</Typography>
          <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
            <InputLabel>Select Region</InputLabel>
            <Select
              labelId="region_id"
              id="region_id"  
              label="Select Region"
              placeholder='Select Region'
              color="info"          
              name='regionId'
              value={formik.values.regionId}
              onChange={formik.handleChange}
              helperText={formik.touched.regionId && formik.errors.regionId ? <span style={helperTextStyle}>{formik.errors.regionId}</span>:null}
            >
                {
                  regions ? regions.map((regions)=>(
                    <MenuItem value={regions.id} key={regions.id}>{regions.name}</MenuItem>
                  )): null
                }
            </Select>
          <FormHelperText>{formik.touched.regionId && formik.errors.regionId ? <span style={helperTextStyle}>{formik.errors.regionId}</span>:null}</FormHelperText>
        </FormControl>

           {/*  <Typography variant='body1' sx={{ paddingBottom:'10px' }}> 
                Region ID
            </Typography>
            <TextField 
              variant='outlined' 
              type="number"
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='regionId'
              value={formik.values.regionId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.regionId && formik.errors.regionId ? <span style={helperTextStyle}>{formik.errors.regionId}</span>:null}
            /> */}

<Typography variant='body1' sx={{ paddingBottom:'10px' }}>Economic Sector</Typography>
          <FormControl sx={{minWidth: '100%', paddingBottom:'30px' }}>
            <InputLabel>Select Economic Sector</InputLabel>
            <Select
              labelId="sector_id"
              id="sector_id"  
              label="Select Economic Sector"
              placeholder='Select Economic Sector'
              color="info"          
              name='sectorID'
              value={formik.values.sectorID}
              onChange={formik.handleChange}
              helperText={formik.touched.sectorID && formik.errors.sectorID ? <span style={helperTextStyle}>{formik.errors.sectorID}</span>:null}
            >
                {
                  sectors ? sectors.map((sector)=>(
                    <MenuItem value={sector.id} key={sector.id}>{sector.name}</MenuItem>
                  )): null
                }
            </Select>
          <FormHelperText>{formik.touched.sectorID && formik.errors.sectorID ? <span style={helperTextStyle}>{formik.errors.sectorID}</span>:null}</FormHelperText>
        </FormControl>
        
            <TextField 
              label="Authority" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='authority'
              value={formik.values.authority}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.authority && formik.errors.authority ? <span style={helperTextStyle}>{formik.errors.authority}</span>:null}
            />
            <TextField 
              label="Email Address" 
              variant='outlined' 
              type="email"
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='email'
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.email && formik.errors.email ? <span style={helperTextStyle}>{formik.errors.email}</span>:null}
            />
            <TextField 
              label="Telephone Number" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='telephone'
              value={formik.values.telephone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.telephone && formik.errors.telephone ? <span style={helperTextStyle}>{formik.errors.telephone}</span>:null}
            />
            <TextField 
              label="Location" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='location'
              value={formik.values.location}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.location && formik.errors.location ? <span style={helperTextStyle}>{formik.errors.location}</span>:null}
            />

        <Typography variant='body1' sx={{ paddingBottom:'10px' }}>Can this institution create draft document?</Typography>
             <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="canCreateDraft"
                    value={formik.values.canCreateDraft}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value='1' control={<Radio />} label="Yes"  />
                    <FormControlLabel value='2' control={<Radio />} label="No"  />
              </RadioGroup>

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

export default CreateInstitution