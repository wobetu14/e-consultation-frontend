
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const FilterTable = ({filter, setFilter}) => {
  return (
    <Box mb="10px" width='40%'>
        <TextField
        size='small'
        placeholder='Search...' 
        fullWidth
        color='primary'
        value={filter || ''} 
        onChange={(e)=>setFilter(e.target.value)} />
    </Box>
  )
}

export default FilterTable