import { Alert, Box, Button, Grid, LinearProgress, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios/AxiosGlobal'
import { useParams } from 'react-router-dom'
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

const InstitutionInvitations = ({documentDetail}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    const [invitedInstitutions, setInvitedInstitutions]=useState(null);
    const params=useParams()
 
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
        return await  axios.get(`comment-request?draft_id=${params.id}`)
          .then(res=>{
            setInvitedInstitutions(res.data.data);
          }).catch(error=>{
            console.log(error.message);
          })
        }

  return (
    <Box m='0 20px' width={'95%'}>
    <Typography variant="h5" fontWeight="600">
        Invitations to Institutions
    </Typography>
    <TableContainer component={Paper} sx={{ marginTop:"10px", marginBottom:"20px" }}>
      <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
          {
                userRole==="Approver"? ( 
                  <TableCell>
                    <Typography variant="h5" fontWeight={600}>To (Institution)</Typography>
                  </TableCell>
                ):""
              }
            <TableCell>
            <Typography variant="h5" fontWeight={600}>Requesting User</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" fontWeight={600}>Acceptance Status</Typography>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invitedInstitutions ? invitedInstitutions.map((InvitedInstitution) => (
            <TableRow
              key={InvitedInstitution.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell>
                <Typography variant="body1">{InvitedInstitution.commenter_institution_name ? InvitedInstitution.commenter_institution_name:""}</Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body1">{InvitedInstitution.requested_by_name ? InvitedInstitution.requested_by_name:""}</Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body1">{InvitedInstitution.status===0 ? "Pending":(InvitedInstitution.status===1)? "Accepted":"Rejected"}</Typography>
              </TableCell>

            {/*   <TableCell>
                <Typography variant="body1">{(InvitedInstitution.status && InvitedInstitution.status===0) ? "Pending":((InvitedInstitution.status && InvitedInstitution.status===1) ? "Accepted":"Rejected")}</Typography>
              </TableCell> */}
              
            </TableRow>
          )):
          (
            <TableRow>
              <TableCell colsPan={5}>
                <LinearProgress color='secondary'  />
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

export default InstitutionInvitations