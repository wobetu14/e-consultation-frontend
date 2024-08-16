import { MenuRounded } from "@mui/icons-material";
import { Button, Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material";
import { List } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";

import React, { useState } from 'react'
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Logout from "../../Logout";
import { useTranslation } from "react-i18next";

const DrawerComp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  // User ContextData
  const { userRole, setUserRole, userInfo, userToken, setUserToken } =
    useContext(UserContext);
  const { t } = useTranslation();
  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: {
            xs: "240px", // 240px width on extra-small screens
            sm: "300px", // 300px width on small screens
            md: "360px", // 360px width on medium screens
            lg: "420px", // 420px width on large screens
            xl: "480px", // 480px width on extra-large screens
          },
        }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <a
                      href={"/"}
                      style={{
                        textDecoration: "none",
                        color: colors.primary[300],
                      }}
                    >
                      {t('home')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </a>
                  </>
                }
              />
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <a
                      href={"/about"}
                      style={{
                        textDecoration: "none",
                        color: colors.primary[300],
                      }}
                    >
                      {t('about')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </a>
                  </>
                }
              />
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <a
                      href={"/help"}
                      style={{
                        textDecoration: "none",
                        color: colors.primary[300],
                      }}
                    >
                      {t('help_center')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </a>
                  </>
                }
              />
            </ListItemIcon>
          </ListItemButton>
        </List>

        <List>
          <ListItemButton>
            <ListItemIcon>
              {userToken !== null &&
              userToken !== undefined &&
              userRole != null &&
              userRole !== undefined ? (
                <ListItemText
                  primary={
                    <>
                      {userInfo
                        ? userInfo.user.first_name +
                          " " +
                          userInfo.user.middle_name
                        : null}{" "}
                      <br/>
                      <Logout />
                    </>
                  }
                  variant="h5"
                  sx={{ fontWeight: "600", color: colors.successColor[100] }}
                />
              ) : (
                <ListItemText
                  primary={
                    <>
                      <Button
                        href={"/login"}
                        sx={{ marginLeft: "auto" }}
                        variant="contained"
                      >
                        Sign In
                      </Button>

                      <Button
                        href={"/create-account"}
                        sx={{
                          marginLeft: 1,
                          backgroundColor: colors.brandColor[300],
                          color: "white",
                        }}
                        variant="contained"
                      >
                        Sign Up
                      </Button>
                    </>
                  }
                />
              )}
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton>
        <MenuRounded onClick={() => setOpen(!open)}></MenuRounded>
      </IconButton>
    </>
  );
}

export default DrawerComp