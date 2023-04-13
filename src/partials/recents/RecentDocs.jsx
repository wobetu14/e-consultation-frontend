import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Typography } from '@mui/material'
import React, { useState } from 'react'

import RegulationDocs from '../../partials/document-list/Regulations'
import ProclamationDocs from '../../partials/document-list/Prclamations'
import DirectiveDocs from '../../partials/document-list/Directives'
import { useTheme } from '@emotion/react'
import { tokens } from '../../theme'
import { useTranslation } from 'react-i18next'


const RecentDocs = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation()

  const [value, setValue]=useState('1')
  const handleChange=(event, newValue)=>{
    setValue(newValue)
  }
  return (
    <Box sx={{ margin:"0 10px"}}>
      <Box width="100%" sx={{ padding:"10px", margin:"0px 10px", color:colors.primary[100]  }}>
        <Typography variant='h4' sx={{ fontWeight:"600", margin:"0px 10px", color:colors.headerText[100] }}>Most recent documents</Typography>
      </Box>
      <TabContext value={value} sx={{ padding:"40px" }}>
        <Box sx={{ borderBottom:0, borderColor:'divider',  width:"400px" }} flexDirection="up">
          <TabList aria-label="Tabs example" 
          onChange={handleChange} 
          textColor={'secondary'} 
          indicatorColor="secondary"
          centered
          >
            <Tab label="Regulations" value='1' />
            <Tab label="Proclamations" value='2' />
            <Tab label="Directives" value='3' />
          </TabList>
        </Box>

        <TabPanel value='1'>
        <Typography variant='h5' sx={{ marginBottom:"15px", fontWeight:400 }}>
          Brief List of Regulation documents.
        </Typography> 
         <RegulationDocs />
        </TabPanel>
        <TabPanel value='2'>
        <Typography variant='h5' sx={{ marginBottom:"15px", fontWeight:400 }}>
          Brief List of Proclamation Documents.
        </Typography>
         <ProclamationDocs />
        </TabPanel>
        <TabPanel value='3'>
        <Typography variant='h5' sx={{ marginBottom:"15px", fontWeight:400 }}>
          Brief List of Directives.
        </Typography>
          <DirectiveDocs />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default RecentDocs