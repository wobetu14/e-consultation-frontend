import { Skeleton } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div>
        <Skeleton variant='rectangle' animation='wave' height={50} width="100%" sx={{ marginBottom:"15px" }} />
    </div>
  )
}

export default Loading