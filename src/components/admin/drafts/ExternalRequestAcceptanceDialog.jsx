import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from '../../../axios/AxiosGlobal'
import { useParams } from 'react-router-dom'
import { 
    Autocomplete,
    Box,
    Button,
     Dialog, 
     DialogActions, 
     DialogContent, 
     DialogContentText, 
     DialogTitle,
     Paper,
     Stack,
     TextField,
     Typography, 
     useTheme
    } from '@mui/material'

import { tokens } from '../../../theme';
import { useFormik } from 'formik';
import { UserContext } from '../../../contexts/UserContext';

const ExternalRequestAcceptanceDialog = ({
    title, 
    documentDetail,
    serverSuccessMsg,
    serverErrorMsg,
    setServerSuccessMsg,
    setServerErrorMsg,
    openRejectionDialog,
    setOpenRejectionDialog,
    showRejectionDialog,
    openAcceptanceDialog,
    setOpenAcceptanceDialog,
}) => {
    // User context
    const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);
    const params=useParams()

    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    const [myUsers, setMyUsers]=useState([]);
    const [repliersEmail, setRepliersEmail]=useState([]);
    const [repliersID, setRepliersID]=useState([]);

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

        useEffect(()=>{
            getMyUsersID();
            fetchMyUsers()
        })

        const getMyUsersID=()=>{
            if(repliersEmail.length>0){
               repliersEmail.map((replier)=>(
                   setRepliersID([...repliersID, replier.id])
               ))
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
                comment_repliers:[],
                acceptanceMessage:""
                
            },
    
          onSubmit:(values)=>{
            const requestData={
                draft_id:params.id,
                comment_repliers: repliersID.length>0 ? repliersID.map((replierID)=>(replierID)):[],
                message:values.acceptanceMessage
            };
        
            acceptCommentOpening(requestData);
          }
        }); 
    
        const acceptCommentOpening=async (requestData) => {
            console.log(requestData)
            // setLoading(true)
            
          return await axios.post(`assign-commenters`, requestData)
            .then(res => {
              setServerSuccessMsg(res.data.message);
              setServerErrorMsg(null)
            //   setLoading(false)
            })
            .catch(errors =>{
               setServerErrorMsg(errors.response.data.message);
               setServerSuccessMsg(null) 
            //    setLoading(false)
            })  
    
           }
  
  return (
    <>
     <Dialog 
      open={openAcceptanceDialog}
      fullWidth
     >
         <DialogTitle>
             <Typography variant="h5" fontWeight="600">
                {title}
             </Typography>
         </DialogTitle>
         <DialogContent>
             <DialogContentText>
                 
             <form style={{ marginBottom:"30px" }} onSubmit={formikAcceptanceForm.handleSubmit}>
               <Stack spacing={1}>
               <Typography variant='h5' fontWeight="600">
                    Reason to reject this request?
                </Typography>
                
                <Typography variant="subtitle1" fontWeight="600">
                Assign Repliers
          
            </Typography>
            
            <Autocomplete
                multiple
                id="tags-standard"
                freeSolo
                autoSelect
                color="info"
                sx={{ paddingBottom:"10px" }}
                options={myUsers}
                getOptionLabel={(option) => option.first_name+" "+option.middle_name}
                onChange={(e,value)=>setRepliersEmail(value)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    // variant="standard"
                    label="List of staff users"
                    value={"(option)=>option"}
                />
                )}
            />

                <TextField 
                    label="Please write your reason to reject this request..." 
                    variant='outlined'
                    size='small'
                    multiline
                    fullWidth
                    rows={4}
                    sx={{ paddingBottom:"10px" }}
                    color="info"
                    name='requestRejectionMessage'
                    value={formikAcceptanceForm.values.acceptanceMessage}
                    onBlur={formikAcceptanceForm.handleBlur}
                    onChange={formikAcceptanceForm.handleChange}
                    // helperText={formikRejectionForm.touched.reasonForRejection && formikRejectionForm.errors.reasonForRejection ? <span style={helperTextStyle}>{formikRejectionForm.errors.reasonForRejection}</span>:null}
                    />

                    <Box>
                        <Button 
                            size='small' 
                            variant="contained" 
                            color="secondary" 
                            type='submit'
                            sx={{ textTransform:"none", marginRight:"5px" }}
                            >  
                            <Typography variant='body1'>
                                Finish and close
                            </Typography>
                        </Button>
                    </Box> 
               </Stack>
             </form> 

             </DialogContentText>
         </DialogContent>
         <DialogActions>
             <Button
              onClick={()=>setOpenAcceptanceDialog(false)}
              variant="contained"
              size="small"
              color="secondary"
              sx={{ textTransform:"none", backgroundColor:colors.dangerColor[200], color:colors.grey[300]  }}
              >
                  <Typography variant="body1">
                    Close
                  </Typography>
              </Button>
         </DialogActions>
     </Dialog>
    </>
  )
}

export default ExternalRequestAcceptanceDialog