import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function Users() {
    const [user, setUser]=useState('wobetu')
    if(!user){
        return <Navigate to='/' replace='true' />
    }
  return (
    <div>
        <h1>This is users list page</h1>
        <button onClick={()=>{setUser(null)}}>Logout</button>
    </div>
  )
}

export default Users