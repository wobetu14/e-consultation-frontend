import { useTheme } from '@emotion/react'
import { Box, Grid, Typography } from '@mui/material'
import {motion} from 'framer-motion'
import React from 'react'
import Footer from '../../partials/Footer'
import { tokens } from '../../theme'
import AccordionContainer from './AccordionContainer'

const HelpCenter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box margin="0 110px">
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.5 }}
      >
        <Grid container sx={{ paddingTop:"50px", display:"flex", justifyContent:"space-between" }}>
            <Box margin="0px 200px">
            <Typography variant="h3" sx={{ fontWeight: "600", marginBottom:"20px", color:colors.brandColor[100]  }}>
                FDRE E-Consultation Portal User Guide
              </Typography>
                <AccordionContainer />
            </Box>
          </Grid>
      </motion.span>
      </Box>

      <Box>
        <Footer />
      </Box>
    </>
    
  )
}

export default HelpCenter