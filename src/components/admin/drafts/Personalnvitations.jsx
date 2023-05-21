import { Alert, Box, Button, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material'
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
import DeleteUserDialog from '../../../partials/DeleteUserDialog'

const PersonalInvitations = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
 
    // User context
    const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);
    

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

    const rows=[
        {
            institution:"Name of receiving institution",
            status:"Status",
            inviting_user:"Inviting user name"
        },
        {
            institution:"Name of receiving institution",
            status:"Status",
            inviting_user:"Inviting user name"
        }
    ]

    

    const columns=[
        {
            name:<Typography variant="h5" fontWeight="600">To (Receiving Institution)</Typography>,
            selector:<Typography variant="body1">Hello</Typography>,
            sortable:true,
        },
        
        {
            name:<Typography variant="h5" fontWeight="600">Acceptance Status</Typography>,
            selector:<Typography variant="body1">"Hello"</Typography>,
            sortable:true,
        },
        {
            name:<Typography variant="h5" fontWeight="600">Inviting User</Typography>,
            selector:<Typography variant="body1">Hello</Typography>,
            sortable:true,
        },
        {
            name:<Typography variant="h5" fontWeight="600">Remark</Typography>,
            selector:<Typography variant="body1">Any acceptance or rejection statement</Typography>,
            sortable:true,
        },
    ]

  return (
    <Box m='0 5px' width={'95%'}>
    <Header title="Personal Invitations" subtitle="" />

        <Grid align='center' sx={{ paddingBottom:"5px", paddingTop:'5px' }}>
            <motion.span
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 0.3 }}
                > 
               
            </motion.span>
        </Grid>
      
   
   
     {/* <Paper elevation={1} sx={{ marginTop:"10px", marginBottom:"350px"}}>
       <DataTable 
        columns={columns} 
        // data={rows}
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
                
                />
              </Box>
              
            </Box>
        }
        />
 </Paper> */}

 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email Address</TableCell>
            <TableCell>Acceptance Status</TableCell>
            <TableCell>Inviting User</TableCell>
            <TableCell>Remark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                wobetushiferaw@gmail.com
              </TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Fasil Ketema</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                amsalutaddesse@gmail.com 
              </TableCell>
              <TableCell>Accpeted</TableCell>
              <TableCell>Fasil Ketema</TableCell>
              <TableCell>I just accepted the request and I will review the document</TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                alemayehugirma@yahoo.com
              </TableCell>
              <TableCell>Rejected</TableCell>
              <TableCell>Fasil Ketema</TableCell>
              <TableCell>I am sorry for the inconvience but I am on other duites currently and I can not do it right now</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
</Box> 
  )
}

export default PersonalInvitations