import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Paper, Stack, FormControl, InputLabel, Select, useTheme } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useState } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';
import Sectors from '../sectors/Sectors'



const CreateSector = () => {
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
      sectorName:"",
      sectorDescription:"",
      createdBy:1
    },

validationSchema:YUP.object({
  sectorName:YUP.string().required("This field is required. Please enter the sector name."),
  sectorDescription:YUP.string().required("This field is required. Please enter description."),
  }),

  onSubmit:(values)=>{
    const sectorData={
      name:values.sectorName,
      description:values.sectorDescription,
      created_by:values.createdBy
    };

    createSector(sectorData);
  }
}); 
    
const createSector=async (sectorData) => {
    //  console.log(companyData)
    return await axios.post('sectors', sectorData)
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
      <Header title="Create New Sector" subtitle="Manage Sectors" />
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
      <Stack
        sx={{width:"60%" }}
      >
        <form onSubmit={formik.handleSubmit}>
            <TextField 
              label="Name of economic sector" 
              variant='outlined' 
              fullWidth
              sx={{ paddingBottom:"30px" }}
              color="info"

              name='sectorName'
              value={formik.values.sectorName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.sectorName && formik.errors.sectorName ? <span style={helperTextStyle}>{formik.errors.sectorName}</span>:null}
            />

<TextField 
              label="Short description" 
              variant='outlined' 
              fullWidth
              multiline
              rows={4}
              sx={{ paddingBottom:"30px" }}
              color="info"
              name='sectorDescription'
              value={formik.values.sectorDescription}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={formik.touched.sectorDescription && formik.errors.sectorDescription ? <span style={helperTextStyle}>{formik.errors.sectorDescription}</span>:null}
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
        <Sectors />
      </Stack>
 </motion.span>
</Box> 
  )
}

export default CreateSector