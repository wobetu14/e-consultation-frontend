import { useContext, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UserContext } from "../../contexts/UserContext";
import ListIcon from "@mui/icons-material/List";
import { useTranslation } from "react-i18next";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.headerText[300],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography variant="h5">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const CommenterSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { t } = useTranslation();
  const { userInfo, userRole } = useContext(UserContext);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          backgroundColor: `${colors.grey[200]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.headerText[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  style={{
                    margin: "10px 0 20px 0",
                    color: colors.headerText[100],
                  }}
                >
                  {t("dashboard")}
                </Typography>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  style={{
                    margin: "10px 0 20px 0",
                    color: colors.headerText[100],
                  }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/images/img_avatar.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.headerText[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userInfo !== null && userInfo !== undefined
                    ? userInfo.user.first_name + " " + userInfo.user.middle_name
                    : null}
                </Typography>
                <Typography variant="h6">{t("commenter")}</Typography>
              </Box>
            </Box>
          )}

          <Box
            paddingLeft={isCollapsed ? undefined : "5%"}
            sx={{
              "& .pro-inner-item:hover": {
                backgroundColor: `${colors.grey[100]} !important`,
                color: `${colors.headerText[100]} !important`,
                borderRadius: "5px",
              },
              "& .pro-menu-item.active": {
                backgroundColor: `${colors.grey[100]} !important`,
                color: `${colors.headerText[100]} !important`,
                borderRadius: "5px",
              },
            }}
          >
            {userRole === "Commenter" ? (
              <>
                <Item
                  title={t("assignments")}
                  to="assigned_drafts"
                  icon={<ListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Assigned to Comment"
                  to="assigned_to_comment"
                  icon={<ListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("invitations")}
                  to="invited_drafts"
                  icon={<ListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("edit_profile")}
                  to="user_profile"
                  icon={<ManageAccountsIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              " This menu is only for commenters"
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default CommenterSidebar;
