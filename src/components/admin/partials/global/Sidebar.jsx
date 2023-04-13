import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

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
                <Typography variant="h3" style={{
                  margin: "10px 0 20px 0",
                  color: colors.headerText[100],
                 }} >
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} style={{
              margin: "10px 0 20px 0",
              color: colors.headerText[100],
            }}>
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
                  src={`../../assets/images/wobe.jpg`}
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
                  WOBETU SHIFERAW
                </Typography>
                <Typography variant="h6">
                  INSTITUTIONAL ADMIN
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
              borderRadius:"5px",
            },
            "& .pro-menu-item.active": {
              backgroundColor: `${colors.grey[100]} !important`,
              color:`${colors.headerText[100]} !important`,
              borderRadius:"5px",
            },
           }}
          >
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              // color={colors.primary[100]}
              sx={{ m: "15px 0 5px 20px", fontWeight:"600", color:`${colors.headerText[100]} !important` }}
            >
              Users
            </Typography>
            <Item
              title="Create user"
              to="create_user"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users"
              to="users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              color={colors.primary[100]}
              sx={{ m: "15px 0 5px 20px", fontWeight:"600", }}
            >
              Sectors
            </Typography>
            <Item
              title="New Sector"
              to="create_sector"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sectors"
              to="sectors"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              color={colors.primary[100]}
              sx={{ m: "15px 0 5px 20px", fontWeight:"600", }}
            >
              Regions
            </Typography>
            <Item
              title="New Region"
              to="create_region"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Regions"
              to="regions"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              color={colors.primary[100]}
              sx={{ m: "15px 0 5px 20px", fontWeight:"600", }}
            >
              Institutions
            </Typography>
            <Item
              title="Create Institution"
              to="create_institution"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Institutions"
              to="institutions"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          <Typography
              variant="h5"
              color={colors.primary[100]}
              sx={{ m: "15px 0 5px 20px", fontWeight:"600", }}
            >
              Consultations
            </Typography>
            <Item
              title="New Draft"
              to="create_draft"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Draft Documents"
              to="drafts"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          <Typography
              variant="h5"
              color={colors.primary[100]}
              sx={{ m: "15px 0 5px 20px", fontWeight:"600", }}
            >
              Resource Center
            </Typography>
            <Item
              title="Document Template"
              to="form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
