import { useContext, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Logout  from "../../Logout"
import {Button} from '@mui/material';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import SourceIcon from '@mui/icons-material/Source';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InstitutionIcon from '@mui/icons-material/AccountBalance';
import SectorIcon from '@mui/icons-material/Category';
import RegionIcon from '@mui/icons-material/Public';
import IncomingCommentRequests from '@mui/icons-material/CallReceived';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { UserContext } from "../../contexts/UserContext";
// import ChecklistIcon from '@mui/icons-material/Checklist';
import ListIcon from '@mui/icons-material/List';

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
  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);

  const SuperAdminLinks=({children})=>{
    if(userRole==="Super Admin"){
      return (
        <>
          {children}
        </>
      )
    }
  }

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
                  {userInfo!==null && userInfo!==undefined ? userInfo.user.first_name+" "+userInfo.user.middle_name:null}
                </Typography>
                <Typography variant="h6">
                  {userRole}
                </Typography>
               {/*  <Typography variant="outlined">
                  <Button href='/admin/user_profile' variant="outlined" size="small" sx={{ textTransform:"none", color:"#000" }}>Go to Profile</Button>
                </Typography> */}
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

                    {
                        userRole==="Commenter" ? (
                            <>
                                <Item
                                title="Dashboard"
                                to="/admin"
                                icon={<HomeIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />

                                <Item
                                title="Assignments"
                                to="assigned_drafts"
                                icon={<ListIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            </>
                        ):(
                           " This menu is only for commenters"
                        )
                    }
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default CommenterSidebar;
