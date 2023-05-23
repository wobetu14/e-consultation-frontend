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
import Drafts from '../admin/drafts/Drafts'
import axios from '../../axios/AxiosGlobal'
import UserProfile from '../admin/users/UserProfile'

const CommenterDashboard = () => {
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
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="COMMENTER DASHBOARD" subtitle="Welcome to your dashboard" />

      </Box>
      
      <Box sx={{ marginTop:"100px", marginBottom:"50px" }}>
          {/* <Drafts /> */}
          <UserProfile />
      </Box>
    </Box>
  );
};

export default CommenterDashboard;
