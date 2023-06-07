import React, { createContext, useEffect, useState } from 'react'

export const UserContext=createContext();

export const UserProvider = (props) => {
    const [userInfo, setUserInfo]=useState(JSON.parse(localStorage.getItem('userInfo')));
    const [userRole, setUserRole]=useState(localStorage.getItem('userRole'));
    const [userToken, setUserToken]=useState(localStorage.getItem('token'));

    useEffect(()=>{
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
      setUserRole(localStorage.getItem('userRole'));
      setUserToken(localStorage.getItem('token'));
    },[])

  /*   useEffect(()=>{
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
      setUserRole(localStorage.getItem('userRole'));
      setUserToken(localStorage.getItem('token'));
    },[]) */

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