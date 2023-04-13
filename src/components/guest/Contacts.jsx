import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import axios from '../../axios/AxiosGlobal'
import { UserContext } from '../../contexts/UserContext'


const Contacts = () => {
  const [consultations, setConsultations]=useState(null);

  const {userInfo}=useContext(UserContext);


  const fetchContacts =async() =>{
  return await  axios.get('registries')
    .then(res=>res.data)
  }
  
  useEffect(()=>{
    const contactsResponse =fetchContacts()
    contactsResponse.then(contactsMap=>{
      setConsultations(contactsMap)
     }).catch(error=>{
   console.log(error);
  })

},[])
  
  console.log('cons',consultations)

  return (
    <Box  margin="100px 0">
      <motion.span
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.3 }}
      >
        
        <ul>
        {
       
          consultations ?
          consultations.data.data.map((consultation)=>(
            <li key={consultation.id}>
              <h4>{consultation.id} {consultation.short_title}</h4>
            </li>

          )) : <div>Loading...</div>
        }
        </ul>

        <p>{consultations ? (`Total consultations: ${consultations.data.data.length }`):"Loading..."}</p>
        <p>{consultations ? (`Current Page: ${consultations.data.current_page }`):"Loading..."}</p>
        <p>{consultations ? (`Success message: ${consultations.message }`):"Loading..."}</p>

        {
         userInfo ? (
           <>
            <h1>{userInfo.message}</h1>
            <p>{userInfo.token}</p>
            <p>Role: {userInfo.role}</p>
            <p>Login Status: {userInfo.status}</p>
           </>
         ) :"Context Data is not set"
       }

      </motion.span>    
    </Box>
  )
}

export default Contacts