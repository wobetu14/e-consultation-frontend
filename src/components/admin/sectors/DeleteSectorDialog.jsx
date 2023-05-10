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
import { SectorsDataContext } from '../../../contexts/SectorsDataContext';

const DeleteSectorDialog = ({title, text}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    
    // SectorsDataContext
    const {
        sectors,
        setSectors,
        filteredSectors,
        setFilteredSectors,
        searchSector,
        setSearchSector,
        sector,
        setSector,
        showSectorAddForm,
        setShowSectorAddForm,
        showSectorEditForm,
        setShowSectorEditForm,
        serverErrorMsg,
        setServerErrorMsg,
        serverSuccessMsg,
        setServerSuccessMsg,
        openDialog,
        setOpenDialog,
        deleteSector
    }=useContext(SectorsDataContext); 
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
                onClick={()=>deleteSector(sector.id)}
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

export default DeleteSectorDialog