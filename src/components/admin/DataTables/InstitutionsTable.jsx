import { Alert, Box, Button, Grid, LinearProgress, Link, Paper, TextField, Typography, useTheme } from '@mui/material'
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
import { motion } from 'framer-motion';
import { InstitutionsDataContext } from '../../../contexts/InstitutionsDataContext';
import CreateInstitution from '../institutions/CreateInstitution';
import EditInstitution from '../institutions/EditInstitution';
import DeleteInstitutionDialog from '../institutions/DeleteInstitutionDialog';

const InstitutionsTable = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 

    
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
        openDialog,
        setOpenDialog,
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

    // Show / Hide Add User Form
    const showAddInstitutionForm=()=>{
        setShowInstitutionAddForm(!showInstitutionAddForm)
        setShowInstitutionEditForm(false);
    }

    const showEditInstitutionForm=(institutionRow)=>{
            setInstitution(institutionRow)
            setShowInstitutionEditForm(true);
            setShowInstitutionAddForm(false);
            console.log(institutionRow)
    }

    const hideForm=()=>{
        setShowInstitutionEditForm(false);
        setShowInstitutionAddForm(false)
    }

    const deleteInstitutionDialog = (institutionRow) =>{
        setInstitution(institutionRow);
        setOpenDialog(true);
    }

    const columns=[
        {
            name:<Typography variant="h5" fontWeight="600">Institution Name</Typography>,
            selector:(row)=><Typography variant="body1">{`${row.name}`}</Typography>,
            sortable:true,
        },

        {
            name:<Typography variant="h5" fontWeight="600">Institution Type</Typography>,
            selector:(row)=><Typography variant="body1">{`${row.institution_type.name}`}</Typography>,
            sortable:true,
        },
        
        {
            name:<Typography variant="h5" fontWeight="600">Email</Typography>,
            selector:(row)=><Typography variant="body1">{row.email}</Typography>,
            sortable:true,
        },
        {
            name:<Typography variant="h5" fontWeight="600">Telephone</Typography>,
            selector:(row)=><Typography variant="body1">{row.telephone}</Typography>,
            sortable:true,
        },
        {
            name:<Typography variant="h5" fontWeight="600">Address</Typography>,
            selector:(row)=><Typography variant="body1">{row.address}</Typography>,
            sortable:true,
        },
        
        {
            name:<Typography variant="h5" fontWeight="600">Region</Typography>,
            selector:(row)=><Typography variant="body1">{row.region.name}</Typography>,
            sortable:true,
        },
        {
            name:<Typography variant="h5" fontWeight="600">Created By</Typography>,
            selector:(row)=><Typography variant="body1">{row.creator.name}</Typography>,
            sortable:true,
        },
   /*      {
            name:<Typography variant="h5" fontWeight="600">Updated By</Typography>,
            selector:(row)=><Typography variant="body1">{row.updated_by}</Typography>,
            sortable:true,
        }, */
        
        {
            name:<Typography variant="h5" fontWeight="600">Actions</Typography>,
            selector:(row)=>{
                return (
                    <Stack spacing={0} direction="row">
                        <Button variant="Link" size="small" color="secondary" sx={{ textTransform:"none" }} key={row.id} onClick={()=>showEditInstitutionForm(row)}><ModeEditIcon fontSize="small" color="secondary" /></Button>
                        <Button variant="Link" size="small" sx={{textTransform:"none"}} onClick={()=>deleteInstitutionDialog(row)}><DeleteIcon fontSize="small" sx={{ color:colors.dangerColor[200] }} /></Button>
                        {/* <Button variant="contained" size="small" color="warning" sx={{textTransform:"none"}} onClick={()=>alert("You deleted user ID: "+row.id)}>Deactivate Account</Button> */}
                    </Stack>
                )
            },
        },
    ]

  return (
    <Box width={'95%'}>
    <Header title="Institutions" subtitle="Manage Institutions" />
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
            <DeleteInstitutionDialog 
                title="Deleting Institution..." 
                text={`You are about to delete institution \"${institution ? (institution.name): ""}\". Are you sure?`}
            />
        )
        }
    {
        showInstitutionAddForm && (
          <CreateInstitution />
        )
    } 
    {
      showInstitutionEditForm && (
        <EditInstitution />
      )
    }
     
     {
         institutions.length>0 || filteredInstitutions.length>0 ? (
            <Paper elevation={1} sx={{ marginTop:"10px", marginBottom:"350px"}}>
            <DataTable 
             columns={columns} 
             data={filteredInstitutions}
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
                     value={searchInstitution}
                     onChange={(e)=>setSearchInstitution(e.target.value)}
                     />
                   </Box>
                   <Box>
                     {
                         showInstitutionAddForm ? (
                             <Button 
                             variant="contained" 
                             size="small" 
                             color="secondary" 
                             sx={{ textTransform:"none" }}
                             onClick={hideForm}
                         >
                             <VisibilityOffIcon /> Hide Form    
                         </Button>
                         ):( showInstitutionEditForm ? (
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
                                 onClick={showAddInstitutionForm}
                                 >
                            <AddIcon /> Add New Institution
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

export default InstitutionsTable