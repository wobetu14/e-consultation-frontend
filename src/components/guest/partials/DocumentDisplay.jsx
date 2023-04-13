import { useTheme } from '@emotion/react'
import { Box, Pagination, Skeleton, Tab, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Loading from '../../../Loading'
import RegulationDocs from '../../../partials/document-list/Directives'
import { tokens } from '../../../theme'
import DocumentsFilters from '../DocumentsFilters'
import DocumentList from './DocumentList'

const DocumentDisplay = ({drafts, setDrafts, unfilteredDrafts, setUnfilteredDrafts}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation()

  const [value, setValue]=useState('1')
  const handleChange=(event, newValue)=>{
    setValue(newValue)
  }
  return (
    <Box sx={{ margin:"0px 50px", display:"flex", justifyContent:"space-between", flexDirection:"row" }}>
          <Box sx={{ width:"70%", marginRight:"20px"}}>
            <Box width="100%" sx={{ marginBottom:"10px"}} >
                <Typography variant='h4' sx={{ fontWeight:"500", color:colors.headerText[100] }}>Draft Documents</Typography>
            </Box>
            
            {
              drafts ? 
              drafts.map((draft)=>(
                <DocumentList status={1} deadline={"May 02, 2023"} draft={draft} setDrafts={setDrafts} unfilteredDrafts={unfilteredDrafts} setUnfilteredDrafts={setUnfilteredDrafts} /> 
              )) : (
                <Loading />
              )
            }

            {/* <DocumentList status={0} deadline={"Mar. 10, 2023"} drafts={drafts}/>  
            <DocumentList status={0} deadline={"Feb. 24, 2023"} drafts={drafts}/>  
            <DocumentList status={1} deadline={"Apr. 25, 2023"} drafts={drafts}/> */}

            <Box sx={{ textAlign:"center" }}>
                <Pagination count={10} variant="outlined" shape="rounded" 
                sx={{
                        display:'flex',
                        justifyContent: 'center',
                        width: "100%",
                        alignItems: 'center',
                        padding:'0px',
                    }}/>
            </Box>
          </Box>
          <Box sx={{ width:"30%" }}>
            <Box width="100%" sx={{ marginBottom:"10px" }}>
                <Typography variant='h4' sx={{ fontWeight:"500", color:colors.headerText[100] }}>Filter Documents</Typography>
            </Box>
            <DocumentsFilters drafts={drafts} setDrafts={setDrafts} unfilteredDrafts={unfilteredDrafts} setUnfilteredDrafts={setUnfilteredDrafts} />
          </Box>      
    </Box>
  )
}

export default DocumentDisplay