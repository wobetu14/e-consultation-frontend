import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Paper, Stack, FormControl, InputLabel, Select, useTheme } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useState } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';



const CreateRegion = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

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

 
 const formik=useFormik({
    initialValues:{
      regionName:"",
      createdBy:1
    },

validationSchema:YUP.object({
  regionName:YUP.string().required("This field is required. Please enter the region name."),
  }),

  onSubmit:(values)=>{
    const regionData={
      name:values.regionName,
      created_by:values.createdBy
    };

    registerRegion(regionData);
  }
}); 
    
const registerRegion=async (regionData) => {
    //  console.log(companyData)
    return await axios.post('regions', regionData)
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
      <Header title="Create New Region" subtitle="Manage Regions" />
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
      <Stack
        sx={{ width:"60%" }}
      >
        <form onSubmit={formik.handleSubmit}>
            <TextField 
              label="Region Name" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"

              name='regionName'
              value={formik.values.regionName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.regionName && formik.errors.regionName ? <span style={helperTextStyle}>{formik.errors.regionName}</span>:null}
            />

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

export default CreateRegion