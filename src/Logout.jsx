import { Button } from '@mui/material';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import axios from './axios/AxiosGlobal'

const Logout = () => {
    const navigate=useNavigate();
    const {t}=useTranslation();

    // User ContextData
  const {userRole, setUserRole, userToken, setUserToken, setUserInfo }=useContext(UserContext);
  
  const logout=async()=>{
    /* return await axios.post('logout', 
    {headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json;",
      "Content-Type": "multipart/form-data"
    }})
    .then((res)=>{ */
      localStorage.clear();
      setUserToken(null);
      setUserRole(null);
      setUserInfo(null);
      navigate("/");
    /* }  
  ).catch((error)=>{
    alert(error.response.message)
  }) */
    
  }
  return (
      <>
      {
          (userToken!==null && userToken!==undefined && userRole!=null && userRole!==undefined ) && (
            <Button onClick={logout}>
                <LogoutIcon /> {t('logout')}
            </Button>
          )
          
      }
      </>
  )
}

export default Logout