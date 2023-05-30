
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom'
import { 
     Autocomplete,
     Button,
     Dialog, 
     DialogContent, 
     DialogContentText, 
     DialogTitle,
     Stack,
     TextField,
     Typography, 
     useTheme, Box, DialogActions, Grid, Alert, LinearProgress
    } from '@mui/material'
import { tokens } from '../../../theme';
import { useFormik } from 'formik';
import { UserContext } from '../../../contexts/UserContext';

const InviteMoreDialog = ({
    documentDetail,
    serverSuccessMsg,
    serverErrorMsg,
    setServerSuccessMsg,
    setServerErrorMsg,
    openInviteDialog,
    setOpenInviteDialog,
    title
}) => {
    const params=useParams()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [formData, setFormData]=useState([]); 

    const [institutions, setInstitutions]=useState([]);
    const [selectedInstitutions, setSelectedInstitutions]=useState([]);

    // Set list of email address for invitation
    const [peopleEmail, setPeopleEmail]=useState([]);
    const [instIDs, setInsIDs]=useState([]);
    const [repliersEmail, setRepliersEmail]=useState([]);
    const [myUsers, setMyUsers]=useState([]);
    const [repliersID, setRepliersID]=useState([]);
    const [loading, setLoading]=useState(false);

     // User context
     const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

    const helperTextStyle={
        color:'red',
        fontWeight:'400',
        fontSize:'15px'
       }

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

    React.useEffect(()=>{
        fetchInstitutions();
        getInstitutionsID();
        getMyUsersID();
        fetchMyUsers();
     }, [selectedInstitutions, repliersEmail])

      const getMyUsersID=()=>{
         if(repliersEmail.length>0){
            repliersEmail.map((replier)=>(
                setRepliersID([...repliersID, replier.id])
            ))
         }
     } 

     const getInstitutionsID=()=>{
        if(selectedInstitutions.length>0){
           selectedInstitutions.map((selectedInstitution)=>(
               setInsIDs([...instIDs, selectedInstitution.id])
           ))
        }
    } 

     const fetchInstitutions = async() =>{
        try{
          const res = await  axios.get('public/institutions')
          setInstitutions(res.data.data.data);
        } catch(error){
            console.log(error);
         }
      }

      const fetchMyUsers = async() =>{
        try{
          const res = await  axios.get(`users?institution_id=${userInfo.user.institution_id}`)
          console.log("My users");
          console.log(res.data.data)
          setMyUsers(res.data.data);
        } catch(error){
            console.log(error);
         }
      }

     const formikAcceptanceForm=useFormik({
        initialValues:{
            draft_id:params.id,

            institutions: [],
            institutionMessage:"",

            emails: [],
            personalMessage:"",
        },

      onSubmit:(values)=>{
        const requestData={
            draft_id:params.id,

            institutions:instIDs.length>0 ? instIDs.map((instIDs)=>instIDs):[],
            institution_message:values.institutionMessage,

            emails:peopleEmail.length>0 ? peopleEmail.map((email)=>(email)):[],
            personnel_message:values.personalMessage,
        };
    
        inviteMorePeopleAndInstitutions(requestData);
      }
    }); 

    const inviteMorePeopleAndInstitutions=async (requestData) => {
        console.log(requestData)
        setLoading(true)
        
      return await axios.post(`additional-commenter-request`, requestData)
        .then(res => {
          setServerSuccessMsg(res.data.message);
          setServerErrorMsg(null)
          setLoading(false)
          setOpenInviteDialog(false)
        })
        .catch(errors =>{
           setServerErrorMsg(errors.response.data.message);
           setServerSuccessMsg(null) 
           setLoading(false)
        })  

       }


    
  return (
    <Dialog 
      open={openInviteDialog}
     >
         <DialogTitle>
             <Typography variant="h5" fontWeight="600">
                {title}
             </Typography>
         </DialogTitle>
         <DialogContent>
             <DialogContentText>

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
                        <LinearProgress size="small" color='info' />
                    ):""
                }
            </motion.span>
        </Grid>



        <form style={{ marginBottom:"30px" }} onSubmit={formikAcceptanceForm.handleSubmit}>
                <Typography variant="subtitle1" fontWeight="600">
                    Invite Institutions
                </Typography>
                {/* <Stack spacing={2} > */}
            <Autocomplete
                multiple
                id="tags-standard"
                freeSolo
                autoSelect
                color="info"
                sx={{ paddingBottom:"10px" }}
                options={institutions}
                getOptionLabel={(option) => option.name}
                onChange={(e,value)=>setSelectedInstitutions(value)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Select Institutions"
                    placeholder="Institutions"
                    value={(option)=>option.name}
                />
                )}
            />

                    <TextField 
                        label="Write a remark (not mandatory)" 
                        variant='outlined'
                        size='small' 
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ paddingBottom:"5px" }}
                        color="info"
                        name='institutionMessage'
                        value={formikAcceptanceForm.values.institutionMessage}
                        onBlur={formikAcceptanceForm.handleBlur}
                        onChange={formikAcceptanceForm.handleChange}
                        // helperText={formik.touched.shortTitle && formik.errors.shortTitle ? <span style={helperTextStyle}>{formik.errors.shortTitle}</span>:null}
                        />

    {/* </form>

        <form onSubmit={formikInvitePeopleForm.handleSubmit}> */}
            <Typography variant="subtitle1" fontWeight="600">
                Invite People
                {
                    peopleEmail.length>0 ? (
                        peopleEmail.map((email)=><h3>{email}</h3>)
                    ):""
                }
            </Typography>
                {/* <Stack spacing={2} sx={{ width: 500 }}> */}
            <Autocomplete
                multiple
                id="tags-standard"
                freeSolo
                autoSelect
                color="info"
                sx={{ paddingBottom:"10px" }}
                options={peopleEmail}
                getOptionLabel={(option) => option}
                onChange={(e,value)=>setPeopleEmail(value)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Enter email addresses"
                    value={(option)=>option}
                />
                )}
            />

                    <TextField 
                        label="Write a remark (not mandatory)" 
                        variant='outlined'
                        size='small' 
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ paddingBottom:"5px" }}
                        color="info"
                        name='personalMessage'
                        value={formikAcceptanceForm.values.personalMessage}
                        onBlur={formikAcceptanceForm.handleBlur}
                        onChange={formikAcceptanceForm.handleChange}
                        // helperText={formik.touched.shortTitle && formik.errors.shortTitle ? <span style={helperTextStyle}>{formik.errors.shortTitle}</span>:null}
                        />

            <Box>
                <Button 
                    size='small' 
                    variant="contained" 
                    color="secondary" 
                    type='submit'
                    sx={{ textTransform:"none", marginRight:"5px" }}
                    onClick={inviteMorePeopleAndInstitutions}
                    >  
                     <Typography variant='body2'>
                        Finish and close
                     </Typography>
                </Button>
            </Box> 
        {/* </Stack> */}
    </form>

    </DialogContentText>
    <DialogActions>
        <Button
            onClick={()=>setOpenInviteDialog(false)}
            variant="outlined"
            size="small"
            color="secondary"
            sx={{ textTransform:"none"}}
            >
                 <Typography variant='body2'>
                        Cancel
                 </Typography>
            </Button>
    </DialogActions>
</DialogContent>  
     </Dialog>
  )
}

export default InviteMoreDialog;

