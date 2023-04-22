import { Button } from '@mui/material';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const navigate=useNavigate();
    // User ContextData
  const {userRole, setUserRole, userToken, setUserToken}=useContext(UserContext);
  
  const logout=()=>{
    localStorage.clear();
    setUserToken(null);
    setUserRole(null);
    navigate("/");
  }
  return (
      <>
      {
          (userToken!==null && userToken!==undefined && userRole!=null && userRole!==undefined ) && (
            <Button onClick={logout}>
                <LogoutIcon /> Logout
            </Button>
          )
      }
      </>
  )
}

export default Logout