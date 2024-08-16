import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import axios from "../src/axios/AxiosGlobal"
import LogoutProgressDialog from "./LogoutProgressDialog";

const Logout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [logoutLoading, setLogoutLoading]=useState(false);
  const [networkError, setNetworkError]=useState(null);

  // User ContextData
  const { userRole, setUserRole, userToken, setUserToken, setUserInfo } =
    useContext(UserContext);

  const logout = async () => {
    setLogoutLoading(true);
    /* return await axios.post('logout', null,
    {headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json;",
      "Content-Type": "multipart/form-data"
    }})
    .then((res)=>{ */
    setLogoutLoading(false)
    localStorage.clear();
    setUserToken(null);
    setUserRole(null);
    setUserInfo(null);
    navigate("/");
    /* }  
  ).catch((error)=>{
    setLogoutLoading(true);
    setNetworkError(error.code);
  }) */
  };
  return (
    <>
      {userToken !== null &&
        userToken !== undefined &&
        userRole != null &&
        userRole !== undefined && (
          <Button onClick={logout}>
            <LogoutIcon /> {t("logout")}
          </Button>
        )}

        {
          logoutLoading && (
            <LogoutProgressDialog 
              title="Logging out"
              text="Logging out..."
              logout={logout}
              logoutLoading={logoutLoading}
              setLogoutLoading={setLogoutLoading}
              networkError={networkError}
              setNetworkError={setNetworkError}
            />
          )
        }
    </>
  );
};

export default Logout;