import { Box, useTheme, Alert, Typography } from "@mui/material";
import { tokens } from "../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/admin/AdminHeader";
import StatBox from "../../components/admin/StatBox";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CommentIcon from "@mui/icons-material/Comment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Drafts from "./drafts/Drafts";
import axios from "../../axios/AxiosGlobal";
import UserProfile from "./users/UserProfile";
import './Dashboard.css'
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userInfo, userRole, userToken, setUserInfo, setUserRole, setUserToken } = useContext(UserContext);
  const [drafts, setDrafts] = useState(null);
  const [comments, setComments] = useState(0);
  const [users, setUsers] = useState(null);
  const [openDrafts, setOpenDrafts] = useState(0);

  const {t}=useTranslation(); 

  /* useEffect(()=>{
    window.location.reload(true);
  }, []) */


  /* useEffect(()=>{
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    setUserRole(localStorage.getItem('userRole'));
    setUserToken(localStorage.getItem('token'));
  },[]) */


  useEffect(() => {
    fetchDrafts();
  }, []);

  useEffect(()=>{
    fetchUsers();
  }, [])

  useEffect(()=>{
    fetchComments();
  }, [])

  useEffect(()=>{
    fetchOpenDrafts();
  }, [])

  // drafts, users, comments, openDrafts

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
    }
  };

  return (
    <Box m="20px" sx={{ width:{
      xs:300, sm:500, md:700, lg:900, xl:1200
    } }} 
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={t('dashboard')} subtitle={t('dashboard_greeting')} />
      </Box>

      {userRole === "Uploader" || userRole === "Approver" ? (
        ""
      ) : (
        <Box
          display="flex"
          gridTemplateColumns="repeat(12, 1fr)"
          // gridAutoRows="140px"
          gap="10px"
          sx={{ height:'200px' }}
          className="box__container"
        >
          <Box
            gridColumn="span 3"
            backgroundColor={colors.grey[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              borderRadius: "5px",
              /* border: "2px solid",
              borderColor: colors.primary[400], */
              boxShadow: "5px, 10px",
              width:'300px'
            }}
          >
            <StatBox
              title={drafts ? drafts.length : ""}
              subtitle={t('total_documents')}
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
            sx={{
              borderRadius: "5px",
              /* border: "2px solid",
              borderColor: colors.brandColor[300], */
              boxShadow: "5px, 10px",
              width:'300px'
            }}
          >
            <StatBox
              title={openDrafts > 0 ? openDrafts : 0}
              subtitle={t('opened_documents')}
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
            sx={{
              borderRadius: "5px",
              /* border: "2px solid",
              borderColor: colors.dangerColor[300], */
              boxShadow: "5px, 10px",
              width:'300px'
            }}
          >
            <StatBox
              title={users ? users.length : ""}
              subtitle={t('total_users')}
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
            sx={{
              borderRadius: "5px",
              /* border: "2px solid",
              borderColor: colors.yellowColor[300], */
              boxShadow: "5px, 10px",
              width:'300px',
            }}
          >
            <StatBox
              title={comments > 0 ? comments : 0}
              subtitle={t('total_comments')}
              icon={
                <CommentIcon
                  sx={{ color: colors.yellowColor[300], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
      )}

      {userRole === "Uploader" ? (
        <Box sx={{ marginTop: "100px", marginBottom: "50px" }}>
          {
            parseInt(userInfo.user.institutionModel[0].can_create_draft)===1 ? (
              <Drafts />
            )
            :
            (
            <Alert severity="warning" variant="outlined">
              <Typography variant="body1">
                The institution belongs to this user have no the previlege to upload a document on this system!
              </Typography>
            </Alert>
            )
          }
          {/* <Drafts /> */}
          
        </Box>
      ) : (
        ""
      )}

      {userRole === "Approver" ? (
        <Box sx={{ marginTop: "100px", marginBottom: "50px" }}>
          <UserProfile />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Dashboard;
