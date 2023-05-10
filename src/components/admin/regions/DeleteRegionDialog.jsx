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

import { DraftsDataContext } from '../../../contexts/DraftsDataContext';
import { tokens } from '../../../theme';
import { RegionsDataContext } from '../../../contexts/RegionsDataContext';

const DeleteRegionDialog = ({title, text}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    // UsersDataContext
    const {
        regions,
        setRegions,
        filteredRegions,
        setFilteredRegions,
        searchRegion,
        setSearchRegion,
        region,
        setRegion,
        showRegionAddForm,
        setShowRegionAddForm,
        showRegionEditForm,
        setShowRegionEditForm,
        serverErrorMsg,
        setServerErrorMsg,
        serverSuccessMsg,
        setServerSuccessMsg,
        openDialog,
        setOpenDialog,
        deleteRegion,
    }=useContext(RegionsDataContext);
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
                onClick={()=>deleteRegion(region.id)}
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

export default DeleteRegionDialog