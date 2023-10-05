import { Box } from "@mui/material";
import Header from "../../components/admin/AdminHeader";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "../../axios/AxiosGlobal";
import UserProfile from "../admin/users/UserProfile";

const CommenterDashboard = () => {
  const { userInfo } =
    useContext(UserContext);
  const [drafts, setDrafts] = useState(null);
  const [comments, setComments] = useState(0);
  const [users, setUsers] = useState(null);
  const [openDrafts, setOpenDrafts] = useState(0);

  useEffect(()=>{
    fetchDrafts();
  }, [])

  useEffect(()=>{
    fetchUsers();
  }, [])

  useEffect(()=>{
    fetchComments();
  }, [])

  useEffect(()=>{
   fetchOpenDrafts();
  },[])


  const fetchDrafts = async () => {
    try {
      const res = await axios.get("mydrafts",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }});
      setDrafts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `users?institution_id=${userInfo.user.institution_id}`,
        {headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data"
        }}
      );
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get("count-comments",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }});
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOpenDrafts = async () => {
    try {
      const res = await axios.get("count-opened-drafts",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }});
      setOpenDrafts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="COMMENTER DASHBOARD"
          subtitle="Welcome to your dashboard"
        />
      </Box>

      <Box sx={{ marginTop: "100px", marginBottom: "50px" }}>
        <UserProfile />
      </Box>
    </Box>
  );
};

export default CommenterDashboard;
