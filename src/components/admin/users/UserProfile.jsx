import {
  Typography,
  Button,
  Grid,
  Paper,
  Alert,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import React, { useEffect, useState, useContext } from "react";
import axios from "../../../axios/AxiosGlobal";
import Header from "../AdminHeader";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import { UserContext } from "../../../contexts/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import ChangePassword from "./ChangePassword";
import EditProfileForm from "./EditProfileForm";

const UserProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [usersData, setUsersData] = useState(null);

  const [institutions, setInstitutions] = useState(null);
  const [userRoles, setUserRoles] = useState(null);

  const [openListItem, setOpenListItem] = useState(false);
  const [loading, setLoading]=useState(false);
  const [networkError, setNetworkError]=useState(null);

  const handleOpenListItem = () => {
    setOpenListItem(!openListItem);
  };

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const errorStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "18px",
  };

  const successStyle = {
    color: "green",
    fontWeight: "400",
    fontSize: "18px",
  };

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  useEffect(() => {
    fetchUserRoles()
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchInstitutions = async () => {
    return await axios
      .get("institutions",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutions(res.data);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const fetchUserRoles = async () => {
    return await axios
      .get("roles", 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        console.log(res);
        setUserRoles(res);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const fetchUser = async () => {
    return await axios
      .get(`users/${userInfo.user.id}`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data)
      .then((res) => {
        console.log("User Profiel Data");
        console.log(res.data);
        setUsersData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box m="0 20px" width={"95%"}>
      <Header title="User Profile" subtitle="Manage Profile" />
      <Grid align="center" sx={{ paddingBottom: "15px", paddingTop: "15px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h1">
            {serverSuccessMsg ? (
              <Alert severity="success" style={successStyle}>
                {serverSuccessMsg}
              </Alert>
            ) : null}
          </Typography>

          <Typography variant="h1">
            {serverErrorMsg ? (
              <Alert severity="error" style={errorStyle}>
                {serverErrorMsg}
              </Alert>
            ) : null}
          </Typography>

          <Typography variant="h1">
            {networkError==="ERR_NETWORK" ? (
              <Alert severity="success" style={successStyle}>
                Something went wrong. Your internet connection may be unstable. Please try again.
              </Alert>
            ) : null}
          </Typography>

          <Typography variant="h1">
            {loading ? (
              <LinearProgress color="info" />
            ) : null}
          </Typography>

        </motion.span>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Paper elevation={1} sx={{ padding: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    Full Name
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">
                    {usersData
                      ? usersData.first_name +
                        " " +
                        usersData.middle_name +
                        " " +
                        usersData.last_name
                      : ""}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    Email Address
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">
                    {usersData ? usersData.email : ""}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    Mobile Number
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">
                    {usersData ? usersData.mobile_number : ""}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    Region
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">
                    {usersData ? usersData.region : ""}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    Institution
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">
                    {usersData ? usersData.institution : ""}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    Roles
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {usersData
                    ? usersData.roles.map((role) => (
                        <Typography variant="h5">
                          {usersData.roles[0].name}
                        </Typography>
                      ))
                    : ""}
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    elevation={2}
                    onClick={() => setShowProfileForm(!showProfileForm)}
                  >
                    {showProfileForm ? (
                      <>
                        <VisibilityOffIcon /> &nbsp; Hide form
                      </>
                    ) : (
                      <>
                        <EditIcon /> &nbsp; Edit
                      </>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleOpenListItem}>
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    color={colors.headerText[100]}
                    sx={{ mb: "5px", fontWeight: 600 }}
                  >
                    Change Password
                  </Typography>
                }
              />
            </ListItemButton>
            <Collapse in={openListItem} timeout="auto">
              <List component="div">
                <ListItemText primary={<ChangePassword />} />
              </List>
            </Collapse>
          </List>
        </Grid>
      </Grid>

      {showProfileForm && (
        <EditProfileForm 
          usersData={usersData}
          setUsersData={setUsersData}
          setServerErrorMsg={setServerErrorMsg}
          setServerSuccessMsg={setServerSuccessMsg}    
          helperTextStyle={helperTextStyle}   
          setShowProfileForm={setShowProfileForm}   
          setLoading={setLoading}
          setNetworkError={setNetworkError}
        />
      )}
    </Box>
  );
};

export default UserProfile;