import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import React from 'react'

const StatBox = ({title, subtitle, icon, progress, increase }) => {
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);
  return (
    <Box width="100%" m="0 30%">
        <Box display="flex" justifyContent="space-between">
            <Box>
               {icon}
               <Typography
                variant="h2"
                fontWeight="bold"
               >
                   {title}
               </Typography> 
            </Box>
            <Box>
            <Typography
                variant="h4"
                sx={{ color:colors.brandColor[300] }}
               >
                   {subtitle}
               </Typography> 
               <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color:colors.brandColor[500] }}
               >
                   {increase}
               </Typography> 
            </Box>
        </Box>
    </Box>

  )
}

export default StatBox