import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';

/**
 * 
 * Image Resources
 */
import OpeningRequestsListScreen from './docImages/OpeningRequestsListScreen.png'
import DraftRequestingStatusScreen from './docImages/DraftRequestingStatusScreen.png'

const SendingOpeningRequestGuide = () => {
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);

  return (
    <>
        <Typography variant='h5' sx={{ fontWeight:"600", paddingLeft:"15px", paddingTop:"15px" }}>
            Steps to send document opening request
        </Typography>

        <ol type="A" style={{ marginLeft:"30px" }}>
            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                    Go to <strong>“Opening Request”</strong> menu item on the main menu of the uploaders account. 
                    A screen with list of uploaded documents with their status and an action button labeled <strong>“Send Request”</strong> will appear as shown below. 
                    Note that the <strong>“Send Request”</strong> button will be available for documents whose status is “New” means <strong>“Pending”</strong> state.  
                </Typography>
                <Box m="0 30px">
                    <img src={OpeningRequestsListScreen} alt="Draft Opening Requests List Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>
            <li>
                <Typography sx={{ paddingLeft:"15px", paddingTop:"15px" }}>
                    Click the <strong>“Send Request”</strong> action button found in front of the document title to send opening request for the approver. 
                    The draft status label will be changed to <strong>“Requested”</strong> state and the <strong>“Send Request”</strong> button will be hidden. 
                </Typography>
                <Box m="0 30px">
                    <img src={DraftRequestingStatusScreen} alt="Draft OpenRequesting Status Screen" 
                        style={{ 
                            maxWidth:"80%", height:"auto", marginTop:"15px",
                            border: `1.5px solid ${colors.brandColor[200]}`
                        }} 
                    />
                </Box>
            </li>
        </ol>
    </>
  )
}

export default SendingOpeningRequestGuide