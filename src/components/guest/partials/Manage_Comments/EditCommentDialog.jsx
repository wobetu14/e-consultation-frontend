import React, { useContext, useState } from 'react'
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
import { tokens } from '../../../../theme';
    

const EditCommentDialog = ({title, commentID, openEditDialog, setOpenEditDialog}) => {
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);
    const [commentText, setCommentText]=useState(commentID)
  return (
    <>
     <Dialog 
      open={openEditDialog}
      onClose={()=>setOpenEditDialog(false)}
     >
         <DialogTitle>
             <Typography variant="h5" fontWeight="600">
                {title}
             </Typography>
         </DialogTitle>
         <DialogContent>
             <DialogContentText>
                 <Typography variant="body1">
                    {commentText}
                 </Typography>
             </DialogContentText>
         </DialogContent>
         <DialogActions>
             <Button
              onClick={()=>setOpenEditDialog(false)}
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ textTransform:"none" }}
              >
                  Cancel
              </Button>
             <Button 
                // onClick={()=>deleteUser(user.id)}
                variant="contained"
                size="small"
                color="secondary"
                sx={{ color:colors.grey[300], textTransform:"none"}}
             >
                Save
            </Button>
         </DialogActions>
     </Dialog>
    </>
  )
}

export default EditCommentDialog