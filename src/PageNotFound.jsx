import { Alert, AlertTitle, Box, Grid, Typography } from '@mui/material'
import {motion} from 'framer-motion'
import React from 'react'

export const PageNotFound = () => {
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
                    <Typography variant='h3'> Page not found</Typography>
                </AlertTitle>
                    <Typography variant='h4'>Sorry, the page you are looking for is not found</Typography>
            </Alert>
         </Box>
        </Grid>
      </motion.span>
      </Box>
  )
}
