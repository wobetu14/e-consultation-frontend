import { Box, Grid, Typography } from '@mui/material'
import {motion} from 'framer-motion'
import React from 'react'

const HelpCenter = () => {
  return (
    <Box margin="0 110px">
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.5 }}
      >
        <Grid container sx={{ paddingTop:"20px", display:"flex", justifyContent:"space-between" }}>
            <Box>
                <Typography variant="h2">
                    Help and Support Center
                </Typography>
            </Box>
          </Grid>
      </motion.span>
      </Box>
  )
}

export default HelpCenter