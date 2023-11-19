import React, { useContext } from 'react'
import { 
    Button,
     Dialog, 
     DialogActions, 
     DialogContent, 
     DialogContentText, 
     DialogTitle,
     Typography, 
     useTheme
    } from '@mui/material'
import { UsersDataContext } from '../contexts/UsersDataContext';
import { tokens } from '../theme';
import { useTranslation } from 'react-i18next';

const DeleteUserDialog = ({title, text}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    const {t}=useTranslation();
    
    // UsersDataContext
    const {
        user, 
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
                  {t('cancel')}
              </Button>
             <Button 
                onClick={()=>deleteUser(user.id)}
                variant="contained"
                size="small"
                sx={{ backgroundColor: colors.dangerColor[200], color:colors.grey[300], textTransform:"none"}}
             >
                {t('delete')}
            </Button>
         </DialogActions>
     </Dialog>
    </>
  )
}

export default DeleteUserDialog