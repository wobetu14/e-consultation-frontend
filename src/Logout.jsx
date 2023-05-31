import { Button, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from '../src/axios/AxiosGlobal';
import { useTranslation } from 'react-i18next';

const Logout = () => {
    const navigate=useNavigate();
    const {t}=useTranslation();
    // User ContextData
  const {userRole, setUserRole, userToken, setUserToken, userInfo, setUserInfo}=useContext(UserContext);
  
  const logout=async()=>{
   /*  return await axios.post('logout')
    .then((res)=>{ */
      localStorage.clear();
      setUserToken(null);
      setUserRole(null);
      navigate("/");
   /*  }  
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