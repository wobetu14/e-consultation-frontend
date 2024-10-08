import React, { useEffect, useState } from 'react'
import axios from '../../../axios/AxiosGlobal'
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
     Autocomplete,
     Button,
     Dialog, 
     DialogContent, 
     DialogContentText, 
     DialogTitle,
     TextField,
     Typography, 
     useTheme, Box, DialogActions, Grid, Alert, LinearProgress
    } from '@mui/material'
import { tokens } from '../../../theme';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

const InviteMoreDialog = ({
    draftID,
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

    const [institutions, setInstitutions]=useState([]);
    const [selectedInstitutions, setSelectedInstitutions]=useState([]);

    // Set list of email address for invitation
    const [peopleEmail, setPeopleEmail]=useState([]);
    const [instIDs, setInsIDs]=useState([]);
    const [repliersEmail, setRepliersEmail]=useState([]);
    const [myUsers, setMyUsers]=useState([]);
    const [repliersID, setRepliersID]=useState([]);
    const [loading, setLoading]=useState(false);

    const [networkError, setNetworkError]=useState(null);

    const {t}=useTranslation();

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

    useEffect(()=>{
        fetchInstitutions();
    }, [])

    useEffect(()=>{
        getInstitutionsID();
    },[selectedInstitutions])

    useEffect(()=>{
        getMyUsersID();
    }, [repliersID])

    useEffect(()=>{
        fetchMyUsers();
    }, [repliersEmail])

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
          const res = await  axios.get('public/institutions',
          {headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data"
          }})
          setInstitutions(res.data.data.data);
        } catch(error){
            
         }
      }

      const fetchMyUsers = async() =>{
        try{
          const res = await  axios.get(`commenters-per-institution`,
          {headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data"
          }})
          
          setMyUsers(res.data.data);
        } catch(error){
            
         }
      }

     const formikAcceptanceForm=useFormik({
        initialValues:{
            draft_id:draftID,

            institutions: [],
            institutionMessage:"Dear Sir / Madam, We kindly invite your organization to review this draft documnet. You can assign experts among staff and let them review it. ",

            emails: [],
            personalMessage:"Dear Sir / Madam, We kindly invite you to review this draft documnet. We are so happy if you can go through it and provide your comments as soon as possible.",
        },

      onSubmit:(values)=>{
        const requestData={
            draft_id:draftID,

            institutions:instIDs.length>0 ? instIDs.map((instIDs)=>instIDs):[],
            institution_message:values.institutionMessage,

            emails:peopleEmail.length>0 ? peopleEmail.map((email)=>(email)):[],
            personnel_message:values.personalMessage,
        };
    
        inviteMorePeopleAndInstitutions(requestData);
      }
    }); 

    const inviteMorePeopleAndInstitutions=async (requestData) => {
        
        setServerErrorMsg(null);
        setServerSuccessMsg(null);
        setNetworkError(null);
        setLoading(true)
        
      return await axios.post(`additional-commenter-request`, requestData,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
        .then(res => {
          setServerSuccessMsg(res.data.message);
          setServerErrorMsg(null)
          setNetworkError(null);
          setLoading(false)
          setOpenInviteDialog(false)
        })
        .catch(errors =>{
           setServerErrorMsg(errors.response.data.message);
           setNetworkError(errors.code);
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

                <Typography variant='h1'>
                {networkError==="ERR_NETWORK" ? <Alert severity='error' style={errorStyle}>
                    {t('network_error_message')}
                </Alert>:null}
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
                    {t('invite_institutions')}
                </Typography>
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
                    variant="outlined"
                    label={t('select_institutions')}
                    placeholder={t('institutions')}
                    value={(option)=>option.name}
                    color="info"
                />
                )}
            />

                    <TextField 
                        label={`${t('write_remark')} (${t('not_mandatory')})`}
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
                {t('invite_people')}
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
                    variant="outlined"
                    label={t('enter_email_address')}
                    value={(option)=>option}
                    color="info"
                />
                )}
            />

                    <TextField 
                        label={`${t('write_remark')} (${t('not_mandatory')})`}
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
                    sx={{ textTransform:"none", marginRight:"5px", 
                    backgroundColor:colors.successColor[200], color:colors.grey[300] }}
                    onClick={inviteMorePeopleAndInstitutions}
                    >  
                     <Typography variant='body2'>
                        {t('invite_and_close')}
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
                        {t('cancel')}
                 </Typography>
            </Button>
    </DialogActions>
</DialogContent>  
     </Dialog>
  )
}

export default InviteMoreDialog;

