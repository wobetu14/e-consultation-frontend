import React, { useContext } from 'react'
import { 
    Button,
     Dialog, 
     DialogActions, 
     DialogContent, 
     DialogContentText, 
     DialogTitle,
     Paper,
     Typography, 
     useTheme
    } from '@mui/material'
import { UsersDataContext } from '../contexts/UsersDataContext';
import { tokens } from '../theme';

const DeleteUserDialog = ({title, text}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    
    // UsersDataContext
    const {
        user, 
        setUser,
        serverErrorMsg,
        setServerErrorMsg,
        serverSuccessMsg,
        setServerSuccessMsg,
        openDialog,
        setOpenDialog,
        deleteUser
    }=useContext(UsersDataContext);
  return (
    <>
     <Dialog 
      open={openDialog}
      onClose={()=>setOpenDialog(false)}
     >
         <DialogTitle>
             <Typography variant="h5" fontWeight="600">
                {title}
             </Typography>
         </DialogTitle>
         <DialogContent>
             <DialogContentText>
                 <Typography variant="body1">
                    {text}
                 </Typography>
             </DialogContentText>
         </DialogContent>
         <DialogActions>
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
                onClick={()=>deleteUser(user.id)}
                variant="contained"
                size="small"
                sx={{ backgroundColor: colors.dangerColor[200], color:colors.grey[300], textTransform:"none"}}
             >
                Delete
            </Button>
         </DialogActions>
     </Dialog>
    </>
  )
}

export default DeleteUserDialog