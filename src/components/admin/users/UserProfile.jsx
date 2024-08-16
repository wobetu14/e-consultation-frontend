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
import { useTranslation } from "react-i18next";

/**
 * This component is used to render the user profile for logged in users along with important actions
 * such as edit profile and change password
 */

/**
 * Create a functional component named "UserProfile()"
 */
const UserProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /**
   * Create state used to hide and show the 'edit profile' form
   */
  const [showProfileForm, setShowProfileForm] = useState(false);

  /**
   * Access the userInfo and setUserInfo data and methods from the UserContext Context API
   */
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [usersData, setUsersData] = useState(null);

  const [institutions, setInstitutions] = useState(null);
  const [userRoles, setUserRoles] = useState(null);

  /**
   * Create state used to show and hide the 'change password' form
   */
  const [openListItem, setOpenListItem] = useState(false);

  /**
   * Create state to store the progress of an API call. This is usefull to display a progressbar.
   * If it is loading value is true, the system will display progress bar to indicate the request is being processed.
   * And if it is false, Progressbar will disapear to indicate request processing is completed.
   */
  const [loading, setLoading] = useState(false);

  /**
   * Create state to store error messages coming from results of API calls
   */
  const [networkError, setNetworkError] = useState(null);

  /**
   * Destructure translation object from i18next internationalization API using the useTranslation() hook
   */
  const { t } = useTranslation();

  const handleOpenListItem = () => {
    setOpenListItem(!openListItem);
  };

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  /**
   * CSS style object to mark error messages
   */
  const errorStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "18px",
  };

  /**
   * CSS style object to mark success messages
   */
  const successStyle = {
    color: "green",
    fontWeight: "400",
    fontSize: "18px",
  };

  /**
   * CSS style object to mark helper information for form-validation messages
   */
  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  /**
   * Method call inside the useEffect hook to fetch institutions data
   */
  useEffect(() => {
    fetchInstitutions();
  }, []);

  /**
   * Method call inside the useEffect hook to fetch user roles data
   */
  useEffect(() => {
    fetchUserRoles();
  }, []);

  /**
   * Method call inside the useEffect hook to fetch user's profile data
   */
  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * Method definition to fetch institutions data. It is API call to the server
   * @returns listOfInstitutions - List of institutions, if API call completes successfully
   * @returns exceptionMessage - Error message if API call fails to complete
   */
  const fetchInstitutions = async () => {
    return await axios
      .get("institutions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutions(res.data);
      })
      .catch((error) => {});
  };

  /**
   * Method definition to fetch user roles of the logged in user roles. This is an API call the server
   * @returns listOfRoles - List user roles of the logged in user, if the API call completes succesfully
   * @returns exception - Error message if the API call fails to complete
   */
  const fetchUserRoles = async () => {
    return await axios
      .get("roles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setUserRoles(res);
      })
      .catch((error) => {});
  };

  /**
   * Method definition to fetch the detail info of the logged in user. This is an API call to the server
   * @returns useDetailInfo - Detail users meta data if the API call completed successfully
   * @returns exception -  Error message if the API call fails to complete
   */
  const fetchUser = async () => {
    return await axios
      .get(`users/${userInfo.user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
      .then((res) => {
        setUsersData(res.data);
      })
      .catch((error) => {});
  };

  return (
    /**
     * Create the user profile UI component
     */
    <Box m="0 20px" width={"95%"}>
      {/**
       * Display heading text
       */}
      <Header title={t("user_profile")} subtitle={t("manage_profile")} />
      <Grid align="center" sx={{ paddingBottom: "15px", paddingTop: "15px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/**
           * Render success message if there is any
           */}
          <Typography variant="h1">
            {serverSuccessMsg ? (
              <Alert severity="success" style={successStyle}>
                {serverSuccessMsg}
              </Alert>
            ) : null}
          </Typography>

          {/**
           * Render error message if there is any
           */}
          <Typography variant="h1">
            {serverErrorMsg ? (
              <Alert severity="error" style={errorStyle}>
                {serverErrorMsg}
              </Alert>
            ) : null}
          </Typography>

          {/**
           * Display http network communication error if there is any
           */}
          <Typography variant="h1">
            {networkError === "ERR_NETWORK" ? (
              <Alert severity="success" style={successStyle}>
                Something went wrong. Your internet connection may be unstable.
                Please try again.
              </Alert>
            ) : null}
          </Typography>

          {/**
           * Display progressbar if the value of loading is true
           */}
          <Typography variant="h1">
            {loading ? <LinearProgress color="info" /> : null}
          </Typography>
        </motion.span>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Paper elevation={1} sx={{ padding: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {/**
                   * Display full name. Include label followed by value
                   */}
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    {t("full_name")}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {/**
                   * Extract userData value and display values such as first_name, middle_name, last_name as follows
                   */}
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
                    {t("email_address")}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">
                    {usersData ? usersData.email : ""}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    {t("mobile_number")}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">
                    {usersData ? usersData.mobile_number : ""}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    {t("region")}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">
                    {usersData ? usersData.region : ""}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    {t("institution")}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">
                    {usersData ? usersData.institution : ""}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: "600" }}>
                    {t("role")}
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
                  {/**
                   * Create a button to toggle between showing and hiding the EditForm component
                   */}
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    elevation={2}
                    onClick={() => setShowProfileForm(!showProfileForm)}
                  >
                    {/**
                     * Show difference icons based on whether the edit form is hidden or not. If is not-hidden
                     * show visibilityOffIcon. Otherwise, show the EditIcon
                     */}
                    {showProfileForm ? (
                      <>
                        <VisibilityOffIcon /> &nbsp; Hide form
                      </>
                    ) : (
                      <>
                        <EditIcon fontSize="small" /> &nbsp; {t("edit")}
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
                    {t("change_password")}
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

      {/**
       * Render EditProfileForm if the showProfileForm state is true.
       */}
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
