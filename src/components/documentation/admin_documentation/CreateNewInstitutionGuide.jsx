import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material'
import React from 'react'
import { tokens } from '../../../theme';

/**
 * 
 * Image Resources
 */
import InstitutionsMenuItemScreen from '../docImages/InstitutionsMenuItemScreen.png'
import InstitutionsManagementScreen from '../docImages/InstitutionsManagementScreen.png'
import SaveInstitutionScreen from '../docImages/SaveInstitutionScreen.png'

const CreateNewInstitutionGuide = () => {
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);

  return (
    <>

    <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
        Institutions in this system context are organizations who can administer draft laws 
        as well as organizations who are important to provide commentary on draft laws in their area of responsibility. 
        There are different classifications of organizations. 
        Among these are public, private institutions, Civil Society Organizations, NGO’s etc. 
    </Typography>

    <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
        To create an institution, we need to have either of <strong>Federal Admin</strong> or <strong>Regional Admin</strong> user roles.  
    </Typography>

    <Typography variant='h5' sx={{ fontWeight:"600", paddingLeft:"15px", paddingTop:"15px" }}>
    Steps to Create New Institution
    </Typography>

      <ol type="A" style={{ marginLeft:"30px" }}>
        <li>
            <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                Login as <strong>Federal Admin</strong> or <strong>Regional Admin</strong> (In this example, we will demonstrate using <strong>Federal Admin</strong> account. 
            </Typography>
        </li>
        <li>
            <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                Go to <strong>“Institutions”</strong> item on the main menu located on the left pane. 
            </Typography>
            <Box m="0 30px">
                <img src={InstitutionsMenuItemScreen} alt="Institutions Menu Item Screen" 
                    style={{ 
                        maxWidth:"30%", height:"auto", marginTop:"15px",
                        border: `1.5px solid ${colors.brandColor[200]}`
                    }} 
                />
            </Box>
        </li>
        <li>
            <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                The <strong>institutions management</strong> screen will appear as shown below.  
            </Typography>
            <Box m="0 30px">
                <img src={InstitutionsManagementScreen} alt="Institutions Management Screen" 
                    style={{ 
                        maxWidth:"80%", height:"auto", marginTop:"15px",
                        border: `1.5px solid ${colors.brandColor[200]}`
                    }} 
                />
            </Box>
        </li>
        <li>
            <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                Click on <strong>“+ Add New Sector”</strong> to create new institution. 
                An institution creation form will appear as demonstrated below.   
            </Typography>
            <Box m="0 30px">
                <img src={SaveInstitutionScreen} alt="Save Institution Screen" 
                    style={{ 
                        maxWidth:"80%", height:"auto", marginTop:"15px",
                        border: `1.5px solid ${colors.brandColor[200]}`
                    }} 
                />
            </Box>
        </li>
        <li>
            <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                Fill appropriate data on the given form fields and then click <strong>“Save”</strong>. 
                Note that the fields that are indicated with <strong>“*”</strong> symbol are required fields.   
            </Typography>
        </li>
        <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
            (<strong>Note:</strong> You can hide and show by clicking the <strong>“Hide Form”</strong> button to hide and show the user creation form)  
            </Typography>
     </ol>
    </>
  )
}

export default CreateNewInstitutionGuide