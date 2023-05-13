
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios/AxiosGlobal'
import { 
    Autocomplete,
    Button,
     Dialog, 
     DialogActions, 
     DialogContent, 
     DialogContentText, 
     DialogTitle,
     Stack,
     TextField,
     Typography, 
     useTheme, Box
    } from '@mui/material'
import { tokens } from '../../../theme';
import { useFormik } from 'formik';

const OutgoingCommentRequestsDialog = ({
    draft, 
    title, 
    setServerSuccessMsg, 
    setServerErrorMsg, 
    openDialog, 
    setOpenDialog,
}) => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [formData, setFormData]=useState([]); 

    const [institutions, setInstitutions]=useState([]);
    const [selectedInstitutions, setSelectedInstitutions]=useState([]);
    const [instIDs, setInsIDs]=useState([]);

    React.useEffect(()=>{
        fetchInstitutions();
     }, [])

     const fetchInstitutions =async() =>{
        try{
          const res = await  axios.get('public/institutions')
          setInstitutions(res.data.data.data);
        } catch(error){
            console.log(error);
         }
      }

     const formik=useFormik({
        initialValues:{
            draft_id:draft.id,
            institutions:[]
        },

      onSubmit:(values)=>{
        const requestData={
            draft_id:values.draft_id,
            institutions:selectedInstitutions.map((selectedInstitution)=>(selectedInstitution.id)),
        };
    
        sendCommentsRequest(requestData);
      }
    }); 
 

 
     const sendCommentsRequest=async (requestData) => {
         console.log(requestData)
            return await axios.post('request-institution-for-comment', requestData)
            .then(res => {
                // console.log(res.data.message)
                setServerSuccessMsg(res.data.message);
                setServerErrorMsg(null);
                setOpenDialog(false);
            })
            .catch(errors =>{
                setServerErrorMsg(errors.response.data.message);
                setServerSuccessMsg(null) 
            }) 
       }
    
  return (
    <Dialog 
      open={openDialog}
      onClose={()=>setOpenDialog(false)}
     >
    <form onSubmit={formik.handleSubmit}>
         <DialogTitle>
             <Typography variant="h5" fontWeight="600">
                {title}
             </Typography>
         </DialogTitle>
         <DialogContent>
             <DialogContentText>
             <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
            multiple
            id="tags-standard"
            options={institutions}
            getOptionLabel={(option) => option.name}
            onChange={(e,value)=>setSelectedInstitutions(value)}
            renderInput={(params) => (
            <TextField
                {...params}
                variant="standard"
                label="Select Sectors"
                placeholder="Sectors"
            />
            )}
        />

        <Box>
        <Button
              onClick={()=>setOpenDialog(false)}
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ textTransform:"none" }}
              >
                  Cancel
              </Button>
              <Button 
                size='small' 
                variant="contained" 
                color="secondary" 
                type='submit'
                sx={{ textTransform:"none", marginRight:"5px" }}
                onClick={sendCommentsRequest}
                >  
                Send Request
            </Button>
        </Box> 
    </Stack>
    </DialogContentText>
         </DialogContent>
         <DialogActions>
             
                
         </DialogActions>

         </form>
     </Dialog>
  )
}

export default OutgoingCommentRequestsDialog;

