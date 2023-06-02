import { Typography, Button, FormControlLabel, Checkbox, TextField, Grid, Alert, Paper, Stack, FormControl, InputLabel, Select, useTheme } from '@mui/material';
import { Box } from '@mui/system'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { useContext, useState } from 'react';
import { tokens } from '../../../theme';
import Header from '../AdminHeader';
import axios from '../../../axios/AxiosGlobal';
import { motion } from 'framer-motion';
import Sectors from '../sectors/Sectors'
import { UserContext } from '../../../contexts/UserContext';
import { SectorsDataContext } from '../../../contexts/SectorsDataContext';



const EditSector = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 


    // User context
    const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);
    const {
        sector,
        setSector,
        setServerErrorMsg,
        setServerSuccessMsg
    }=useContext(SectorsDataContext); 

 const helperTextStyle={
  color:'red',
  fontWeight:'400',
  fontSize:'15px'
 }

 
 const formik=useFormik({
    initialValues:{
      sectorName:sector ? sector.name:"",
      sectorDescription:sector ? sector.description:"",
      createdBy:userInfo ? userInfo.user.id:"",
      updatedBy:userInfo ? userInfo.user.id:""
    },

  onSubmit:(values)=>{
    const sectorData={
      name:values.sectorName,
      description:values.sectorDescription,
      created_by:values.createdBy,
      updated_by:values.updatedBy
    };

    updateSector(sectorData);
    fetchSectors();
  }
}); 
    
const updateSector=async (sectorData) => {
    return await axios.put(`sectors/${sector.id}`, sectorData)
        .then(res => {
          setServerSuccessMsg(res.data.message);
          setServerErrorMsg(null)
        })
        .catch(errors =>{
           setServerErrorMsg(errors.response.data.message);
           setServerSuccessMsg(null) 
        }) 
   }

   const fetchSectors =async() =>{
    try{
      const res = await  axios.get('sectors')
        console.log(res.data.data.data);
        setSector(res.data.data.data);
    } catch(error){
        console.log(error);
     }
  }
   
  return (
    <Box width={'95%'}>
      <Header title="Update Sector Information" subtitle="" />
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >

        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextField 
                label="Name of economic sector" 
                variant='outlined' 
                size="small"
                fullWidth
                sx={{ paddingBottom:"30px" }}
                color="info"
                name='sectorName'
                value={formik.values.sectorName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={formik.touched.sectorName && formik.errors.sectorName ? <span style={helperTextStyle}>{formik.errors.sectorName}</span>:null}
              />
          </Grid>

          <Grid item xs={5}>
            <TextField 
                label="Short description" 
                variant='outlined' 
                size="small"
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
          </Grid>

          <Grid item xs={2}>
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

export default EditSector