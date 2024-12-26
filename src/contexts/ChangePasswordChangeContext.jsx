import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const ChangePasswordRequestContext = createContext();

export const ChangePasswordRequestProvider = (props) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [enforcePasswordChange, setEnforcePasswordChange] = useState(false);

  // Check user password change status information and enforce to change it

  useEffect(() => {
    checkUserInfo();
  }, [userInfo]);

  const checkUserInfo = async () => {
    if (
      (userInfo !== null && userInfo.user.password_changed === null) ||
      (userInfo !== null && userInfo.user.password_changed === 0)
    ) {
      setEnforcePasswordChange(true);
    }
  };

  return (
    <ChangePasswordRequestContext.Provider
      value={{
        enforcePasswordChange: enforcePasswordChange,
        setEnforcePasswordChange: setEnforcePasswordChange,
      }}
    >
      {props.children}
    </ChangePasswordRequestContext.Provider>
  );
};
