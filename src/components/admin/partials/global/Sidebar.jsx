import { useContext, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { UserContext } from "../../../../contexts/UserContext";
import { Button } from "@mui/material";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import SourceIcon from "@mui/icons-material/Source";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import InstitutionIcon from "@mui/icons-material/AccountBalance";
import SectorIcon from "@mui/icons-material/Category";
import RegionIcon from "@mui/icons-material/Public";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useTranslation } from "react-i18next";

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

const Sidebar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
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
                  {t("admin")}
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
                <Typography variant="h6">{userRole}</Typography>
                <Typography variant="outlined">
                  <Button
                    href="/admin/user_profile"
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: "none", color: "#000" }}
                  >
                    {t("go_to_profile")}
                  </Button>
                </Typography>
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
            {userRole === "Super Admin" ? (
              <>
                <Item
                  title={t("dashboard")}
                  to="/admin"
                  icon={<HomeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("users")}
                  to="users"
                  icon={<PersonIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("sectors")}
                  to="sectors"
                  icon={<SectorIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("regions")}
                  to="regions"
                  icon={<RegionIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("audit_and_reports")}
                  to="reports"
                  icon={<AssessmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("resource_center")}
                  to="resource_center"
                  icon={<SourceIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              ""
            )}

            {userRole === "Federal Admin" ? (
              <>
                <Item
                  title={t("dashboard")}
                  to="/admin"
                  icon={<HomeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("users")}
                  to="users"
                  icon={<PersonIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("institutions_info")}
                  to="institutions"
                  icon={<InstitutionIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("audit_and_reports")}
                  to="reports"
                  icon={<AssessmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("resource_center")}
                  to="resource_center"
                  icon={<SourceIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              ""
            )}

            {userRole === "Federal Institutions Admin" ? (
              <>
                <Item
                  title={t("dashboard")}
                  to="/admin"
                  icon={<HomeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("users")}
                  to="users"
                  icon={<PersonIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("resource_center")}
                  to="resource_center"
                  icon={<SourceIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              ""
            )}

            {userRole === "Regional Admin" ? (
              <>
                <Item
                  title={t("dashboard")}
                  to="/admin"
                  icon={<HomeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("users")}
                  to="users"
                  icon={<PersonIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("institutions_info")}
                  to="institutions"
                  icon={<InstitutionIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("audit_and_reports")}
                  to="reports"
                  icon={<AssessmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("resource_center")}
                  to="resource_center"
                  icon={<SourceIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              ""
            )}

            {userRole === "Regional Institutions Admin" ? (
              <>
                <Item
                  title={t("dashboard")}
                  to="/admin"
                  icon={<HomeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("users")}
                  to="users"
                  icon={<PersonIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("audit_and_reports")}
                  to="reports"
                  icon={<AssessmentIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("resource_center")}
                  to="resource_center"
                  icon={<SourceIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              ""
            )}

            {userRole === "Approver" ? (
              <>
                <Item
                  title={t("dashboard")}
                  to="/admin"
                  icon={<HomeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("opening_request")}
                  to="draft_approval_request"
                  icon={<FactCheckIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("incoming_requests")}
                  to="external_comment_requests"
                  icon={<ScheduleSendIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("resource_center")}
                  to="resource_center"
                  icon={<SourceIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              ""
            )}

            {userRole === "Uploader" ? (
              <>
                <Item
                  title={t("dashboard")}
                  to="/admin"
                  icon={<HomeIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("opening_request")}
                  to="draft_approval_request"
                  icon={<FactCheckIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title={t("resource_center")}
                  to="resource_center"
                  icon={<SourceIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : (
              ""
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;