import React, { createContext, useState } from 'react'

export const UserContext=createContext(null);

export const UserProvider = (props) => {
    const userDetails=JSON.parse(localStorage.getItem('userInfo'));
    const [userInfo, setUserInfo]=useState(userDetails!==null ? userDetails:null);
    const [userRole, setUserRole]=useState(localStorage.getItem('userRole'));
    const [userToken, setUserToken]=useState(localStorage.getItem('token'));

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