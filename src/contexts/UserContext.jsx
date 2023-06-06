import React, { createContext, useEffect, useState } from 'react'

export const UserContext=createContext();

export const UserProvider = (props) => {
    const [userInfo, setUserInfo]=useState(null);
    const [userRole, setUserRole]=useState(null);
    const [userToken, setUserToken]=useState(null);

    useEffect(()=>{
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
      setUserRole(localStorage.getItem('userRole'));
      setUserToken(localStorage.getItem('token'));
    },[])

  return (
    <UserContext.Provider value={{ 
      userInfo:userInfo, 
      setUserInfo:setUserInfo, 
      userRole:userRole, 
      userToken:userToken,
      setUserToken:setUserToken,
      setUserRole:setUserRole}}>
        {props.children}
    </UserContext.Provider>
  )
}