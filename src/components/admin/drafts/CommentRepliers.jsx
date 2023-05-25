import { Alert, Box, Button, Grid, LinearProgress, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios/AxiosGlobal'
import DataTable from 'react-data-table-component'
import { useParams } from 'react-router-dom';
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

const CommentRepliers = () => {
    const params=useParams()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    const [assignedPeople, setAssignedPeople]=useState(null)
 
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


    useEffect(()=>{
      fetchInvitedInstitutions();
   }, [])

   const fetchInvitedInstitutions =async() =>{
      return await  axios.get(`comment-repliers?draft_id=${params.id}`)
        .then(res=>{
          setAssignedPeople(res.data.data);
        }).catch(error=>{
          console.log(error.message);
        })
      }


  return (
    <Box m='0 20px' width={'95%'}>
    <Typography variant="h5" fontWeight="600">
        Assigned staff to reply for comments on this document
    </Typography>
    <TableContainer component={Paper} sx={{ marginTop:"15px", marginBottom:"30px" }}>
      <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
          {
                userRole==="Approver"? ( 
                  <TableCell>
                    <Typography variant="h5" fontWeight={600}>To (Name)</Typography>
                  </TableCell>
                ):""
              }
            {/* <TableCell>
              <Typography variant="h5" fontWeight={600}>Requesting User</Typography>
            </TableCell> */}
            {/* <TableCell>
              <Typography variant="h5" fontWeight={600}>Acceptance Status</Typography>
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {assignedPeople ? assignedPeople.map((people) => (
            <TableRow
              key={people.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell>
                <Typography variant="body1">{people.replier ? people.replier:""}</Typography>
              </TableCell>
 
            </TableRow>
          )):
          (
            <TableRow>
              <TableCell colsPan={5}>
                <LinearProgress color='info'  />
              </TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
</Box> 
  )
}

export default CommentRepliers