import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material'
import React from 'react'
import { tokens } from '../../../theme';

/**
 * 
 * Image Resources
 */
import SectosMenuItemScreen from '../docImages/SectosMenuItemScreen.png'
import SectorsManagementScreen from '../docImages/SectorsManagementScreen.png'
import CreateNewSectorScreen from '../docImages/CreateNewSectorScreen.png'

const CreateNewSectorGuide = () => {
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);

  return (
    <>

      <Typography sx={{ paddingLeft:"15px", paddingTop:"15px"}}>
        Sectors are economic categorization of the draft laws about which they are dealing with. 
        This information is mainly used to categorize the documents so that searching and filtering 
        those documents with this criterion become easy. 
      </Typography>

      <Typography variant='h5' sx={{ fontWeight:"600", paddingLeft:"15px", paddingTop:"15px" }}>
        Steps to Create New Sector
      </Typography>

      <ol type="A" style={{ marginLeft:"30px" }}>
            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                    Got to <strong>“Sectors”</strong> menu item on the main menu located on the left pane.
                </Typography>
                <Box m="0 30px">
                    <img src={SectosMenuItemScreen} alt="Sectors Menu Item Screen" 
                        style={{ 
                            maxWidth:"30%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>
            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                    The sectors management screen will appear as shown below. Click on <strong>“+ Add New Sector”</strong> to create new sector.
                </Typography>
                <Box m="0 30px">
                    <img src={SectorsManagementScreen} alt="Sectors Management Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>

            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                    The following screen will appear that lets you to create new sector. 
                    Fill the form and then click <strong>“Save”</strong> button. Note that the fields that are indicated with <strong>“*”</strong> symbol are required fields. 
                    <strong>Done!</strong>
                </Typography>
                <Box m="0 30px">
                    <img src={CreateNewSectorScreen} alt="Create New Sector Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>

                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                    (<strong>Note:</strong> You can hide and show by clicking the <strong>“Hide Form”</strong> button to hide and show the user creation form)
                </Typography>
            </li>
        </ol>
    </>
  )
}

export default CreateNewSectorGuide