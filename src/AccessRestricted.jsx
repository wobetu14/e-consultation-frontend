import { Alert, AlertTitle, Box, Button, Grid, Typography, useTheme } from '@mui/material'
import {motion} from 'framer-motion'
import React, { useContext } from 'react'
import { ColorModeContext, tokens } from './theme'

export const AccessRestricted = () => {
    const theme=useTheme()
    const colors=tokens(theme.palette.mode)
    const colorMode=useContext(ColorModeContext);
  return (
    <Box margin="30px">
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.5 }}
      >
        <Grid container sx={{ paddingTop:"20px", display:"flex", justifyContent:"space-between" }}>
         <Box container width="100%" >
            <Alert severity="error" fullWidth>
                <AlertTitle>
                    <Typography variant='h3'> Access Denied!</Typography>
                </AlertTitle>
                    <Typography variant='h4'>Sorry, access to this page is restricted!</Typography>
                    <Button href="/" variant="outlined" size="small" sx={{ marginTop:"20px", color:colors.primary[100], borderColor:colors.primary[100] }}>Go to home</Button>
            </Alert>
         </Box>
        </Grid>
      </motion.span>
      </Box>
  )
}
