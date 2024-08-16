import { Alert, Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";

/**
 * This component is used to implement account activation functionality
 */

/**
 * Create a functional component named "AccountActivation"
 */
const AccountActivation = () => {
  const params = useParams();
  const [activation, setActivation] = useState(false);

  /**
   * Create a variable used to page redirect from the useNavigate() hook. This variable is 
   * used to redirect from component to another component
   */
  const navigate = useNavigate();

  /**
   * Access values about user information from the UserContext user defined Context API
   */
  const { setUserInfo, setUserRole, setUserToken } = useContext(UserContext);

  /**
   * Create state to store the state of user's login status. That is to check whether he/she is 
   * logged in or not
   */
  const [loggedIn, setLoggedIn] = useState(false);

  /**
   * Create state to store error informations coming from the server
   */
  const [serverError, setServerError] = useState(null);

  const errorStyle = {
    color: "red",
    fontWeight: "bold",
  };

  /**
   * Create method call that implements API call to activate user account using the useEffect() hook
   */
  useEffect(() => {
    activateUser();
  }, []);

  /**
   * Method definition that implements API call that activates user account
   * @returns successMessage - If API call is success; redirects to the home page
   * @returns exceptions - If API call fails; returns error message
   */
  const activateUser = async () => {
    return await axios
      .get(`activation/${params.token}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setActivation(true);
        setLoggedIn(true);
        setServerError(null);

        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userRole", res.data.data.user.roles[0].name);
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));

        setUserRole(localStorage.getItem("userRole"));
        setUserToken(localStorage.getItem("token"));
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));

        navigate("/");
      })
      .catch((errors) => {
        setServerError(errors.message);
      });
  };

  return (
    /**
     * Create UI to show the progress or the status of the activation process
     */
    <Box sx={{ marginTop: "100px" }}>
      {/**
       * Use transition or animation to smoothly render UI using the popular motion library
       */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Grid align="center">
          {/**
           * Render error message if there is any
           */}
          <p>
            {serverError ? (
              <Alert severity="error" style={errorStyle}>
                {serverError}
              </Alert>
            ) : null}
          </p>

          {/**
           * Show the activation status is in progress with a message
           */}
          <Typography variant="h5" fontWeight="600">
            {activation === false ? "Activation in progress. Please wait" : ""}
          </Typography>
        </Grid>
      </motion.span>
    </Box>
  );
};

export default AccountActivation;
