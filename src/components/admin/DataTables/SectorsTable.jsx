import { Alert, Box, Button, CircularProgress, Grid, LinearProgress, Link, Paper, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios/AxiosGlobal'
import DataTable from 'react-data-table-component'
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { Stack } from '@mui/system'
import { tokens } from '../../../theme'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../../../contexts/UserContext'
import Header from '../AdminHeader'
import CreateUser from '../users/CreateUser'
import EditUser from '../users/EditUser'
import { UsersDataContext } from '../../../contexts/UsersDataContext';
import { motion } from 'framer-motion';
import CreateSector from '../sectors/CreateSector';
import EditSector from '../sectors/EditSector';
import { SectorsDataContext } from '../../../contexts/SectorsDataContext';
import DeleteSectorDialog from '../sectors/DeleteSectorDialog';

const SectorsTable = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

    
    // User context
    const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);
    const {
        sectors,
        setSectors,
        filteredSectors,
        setFilteredSectors,
        searchSector,
        setSearchSector,
        sector,
        setSector,
        showSectorAddForm,
        setShowSectorAddForm,
        showSectorEditForm,
        setShowSectorEditForm,
        serverErrorMsg,
        setServerErrorMsg,
        serverSuccessMsg,
        setServerSuccessMsg,
        openDialog,
        setOpenDialog,
        loading,
        setLoading
    }=useContext(SectorsDataContext); 

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

    // Show / Hide Add User Form
    const showAddSectorForm=()=>{
        setShowSectorAddForm(!showSectorAddForm)
        setShowSectorEditForm(false);
    }

    const showEditSectorForm=(sectorRow)=>{
            setSector(sectorRow)
            setShowSectorEditForm(true);
            setShowSectorAddForm(false);
    }

    const hideForm=()=>{
        setShowSectorEditForm(false);
        setShowSectorAddForm(false)
    }

    const deleteSectorDialog = (sectorRow) =>{
        setSector(sectorRow);
        setOpenDialog(true);
    }

    const columns=[
        {
            name:<Typography variant="h5" fontWeight="600">Name</Typography>,
            selector:(row)=><Typography variant="body1">{`${row.name}`}</Typography>,
            sortable:true,
        },
        
        {
            name:<Typography variant="h5" fontWeight="600">Description</Typography>,
            selector:(row)=><Typography variant="body1">{row.description.substr(0, 50)}</Typography>,
            sortable:true,
        },
        {
            name:<Typography variant="h5" fontWeight="600">Created By</Typography>,
            selector:(row)=><Typography variant="body1">{row.created_by}</Typography>,
            sortable:true,
        },
        {
            name:<Typography variant="h5" fontWeight="600">Region</Typography>,
            selector:(row)=><Typography variant="body1">{row.region_id}</Typography>,
            sortable:true,
        },
        
        {
            name:<Typography variant="h5" fontWeight="600">Actions</Typography>,
            selector:(row)=>{
                return (
                    <Stack spacing={0} direction="row">
                        <Button variant="Link" size="small" color="secondary" sx={{ textTransform:"none" }} key={row.id} onClick={()=>showEditSectorForm(row)}><ModeEditIcon fontSize="small" color="secondary" /></Button>
                        <Button variant="Link" size="small" sx={{textTransform:"none"}} onClick={()=>deleteSectorDialog(row)}><DeleteIcon fontSize="small" sx={{ color:colors.dangerColor[200] }} /></Button>
                        {/* <Button variant="contained" size="small" color="warning" sx={{textTransform:"none"}} onClick={()=>alert("You deleted user ID: "+row.id)}>Deactivate Account</Button> */}
                    </Stack>
                )
            },
        },
    ]

  return (
    <Box width={'95%'}>
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
                    loading ? (
                        <LinearProgress size="small" color="info" />
                    ):null
                }
            </motion.span>
        </Grid>

        {
        openDialog && (
            <DeleteSectorDialog 
                title="Deleting Sector Info..." 
                text={`You are about to delete sector named \"${sector ? (sector.name): ""}\". Are you sure?`}
            />
        )
        }
    {
        showSectorAddForm && (
          <CreateSector />
        )
    } 
    {
      showSectorEditForm && (
        <EditSector />
      )
    }
     {
         sectors.length>0 || filteredSectors.length>0 ? (
            <Paper elevation={1} sx={{ marginTop:"10px", marginBottom:"350px"}}>
            <DataTable 
             columns={columns} 
             data={filteredSectors}

             progressPending={filteredSectors.length<=0}
             progressComponent={
                <Box mb="20px">
                    <CircularProgress color="info" />
                </Box>
             }

             pagination
             // selectableRows
             selectableRowsHighlight
             // highlightOnHover
             subHeader
             subHeaderComponent={
                 <Box width="100%" sx={{ display:"flex", justifyContent:"space-between", direction:"row" }}>
                   <Box width="30%" >
                     <TextField 
                     label="Search..." 
                     variant="outlined"
                     size='small'
                     color='info'
                     fullWidth
                     value={searchSector}
                     onChange={(e)=>setSearchSector(e.target.value)}
                     />
                   </Box>
                   <Box>
                     {
                         showSectorAddForm ? (
                             <Button 
                             variant="contained" 
                             size="small" 
                             color="secondary" 
                             sx={{ textTransform:"none" }}
                             onClick={hideForm}
                         >
                             <VisibilityOffIcon /> Hide Form    
                         </Button>
                         ):( showSectorEditForm ? (
                             <Button 
                                 variant="contained" 
                                 size="small" 
                                 color="secondary" 
                                 sx={{ textTransform:"none" }}
                                 onClick={hideForm}
                             >
                                 <VisibilityOffIcon /> Hide Form    
                             </Button>
                         ): (
                             <Button 
                                 variant="contained" 
                                 size="small" 
                                 color="secondary" 
                                 sx={{ textTransform:"none" }}
                                 onClick={showAddSectorForm}
                                 >
                            <AddIcon /> Add New Sector
                         </Button>
                         )
                     )
                     }
                   </Box>
                 </Box>
             }
             />
      </Paper>
         ):(
             <LinearProgress size="small" color="info" />
         )
     }
</Box> 
  )
}

export default SectorsTable