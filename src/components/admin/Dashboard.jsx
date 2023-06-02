import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/admin/AdminHeader";
import StatBox from "../../components/admin/StatBox";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CommentIcon from '@mui/icons-material/Comment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Drafts from "./drafts/Drafts";
import axios from '../../axios/AxiosGlobal'
import UserProfile from "./users/UserProfile";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {userInfo, setUserInfo, userRole, setUserRole, setUserToken}=useContext(UserContext);
  const [drafts, setDrafts]=useState(null);
  const [comments, setComments]=useState(0);
  const [users, setUsers]=useState(null);
  const [openDrafts, setOpenDrafts]=useState(0);
  
  useEffect(()=>{
    fetchDrafts();
    fetchUsers();
    fetchComments();
    fetchOpenDrafts();
}, [drafts, users, comments, openDrafts])

const fetchDrafts =async() =>{
    try{
      const res = await  axios.get('mydrafts')
        console.log(res.data.data.data);
        setDrafts(res.data.data.data);
    } catch(error){
        console.log(error);
     }
  }

  const fetchUsers =async() =>{
    try{
      const res = await  axios.get(`users?institution_id=${userInfo.user.institution_id}`)
        setUsers(res.data.data);
    } catch(error){
        console.log(error);
     }
  }


  const fetchComments =async() =>{
    try{
      const res = await  axios.get('count-comments')
        console.log(res.data);
        setComments(res.data);
    } catch(error){
        console.log(error);
     }
  }

  const fetchOpenDrafts =async() =>{
    try{
      const res = await  axios.get('count-opened-drafts')
        console.log(res.data);
        setOpenDrafts(res.data);
    } catch(error){
        console.log(error);
     }
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {
        userRole==="Uploader" || userRole==="Approver" ? (
          ""
        ):
        (
          <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.grey[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius:"5px", border:"2px solid", borderColor:colors.primary[400], boxShadow:"5px, 10px" }}
        >
          <StatBox
            title={drafts ? drafts.length:""}
            subtitle="Total Documents"
            icon={
              <LibraryBooksIcon
                sx={{ color: colors.primary[400], fontSize: "35px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.grey[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius:"5px", border:"2px solid", borderColor:colors.brandColor[300], boxShadow:"5px, 10px" }}
        >
          <StatBox
            title={openDrafts>0 ? openDrafts:0}
            subtitle="Open for Comment"
            icon={
              <MenuBookIcon
                sx={{ color: colors.brandColor[300], fontSize: "35px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.grey[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius:"5px", border:"2px solid", borderColor:colors.dangerColor[300], boxShadow:"5px, 10px" }}
        >
          <StatBox
            title={users ? users.length:""}
            subtitle="Total Users"
            icon={
              <PersonAddIcon
                sx={{ color: colors.brandColor[300], fontSize: "35px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.grey[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius:"5px", border:"2px solid", borderColor:colors.yellowColor[300], boxShadow:"5px, 10px" }}
        >
          <StatBox
            title={comments > 0 ? comments:0}
            subtitle="Total Comments"
            icon={
              <CommentIcon
                sx={{ color: colors.yellowColor[300], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
        )
      }

      {
        (userRole==="Uploader") ? (
          <Box sx={{ marginTop:"100px", marginBottom:"50px" }}>
            <Drafts />
          </Box>
        ):"" 
      }

      {
        (userRole==="Approver") ? (
          <Box sx={{ marginTop:"100px", marginBottom:"50px" }}>
            <UserProfile />
          </Box>
        ):""
      }

      
    </Box>
  );
};

export default Dashboard;
