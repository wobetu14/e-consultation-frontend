import React, { createContext, useState } from 'react'

export const UserContext=createContext(null);

export const UserProvider = (props) => {
    const [userInfo, setUserInfo]=useState(null)
  return (
    <UserContext.Provider value={{ userInfo:userInfo, setUserInfo:setUserInfo }}>
        {props.children}
    </UserContext.Provider>
  )
}