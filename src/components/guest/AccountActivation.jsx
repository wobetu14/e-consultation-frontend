import { Alert, Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";

const AccountActivation = () => {
  const params = useParams();
  const [activation, setActivation] = useState(false);

  const navigate = useNavigate();
  const { setUserInfo, setUserRole, setUserToken } = useContext(UserContext);

  const [loggedIn, setLoggedIn] = useState(false);
  const [serverError, setServerError] = useState(null);

  const errorStyle = {
    color: "red",
    fontWeight: "bold",
  };

  useEffect(() => {
    activateUser();
  }, []);

  const activateUser = async () => {
    return await axios
      .get(`activation/${params.token}`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        console.log(res.data.data.user.roles[0].name);


        // if (res.status !== 200) {
        //   setServerError(res.data.message);
        // } else {
        //   if (res.status === 200 && res.data.token) {
            setActivation(true);
            setLoggedIn(true);
            setServerError(null);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("userRole", res.data.data.user.roles[0].name);
            localStorage.setItem("userInfo", JSON.stringify(res.data.data));

            setUserRole(localStorage.getItem("userRole"));
            setUserToken(localStorage.getItem("token"));
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")));

            // if (localStorage.getItem("userRole") === "Commenter") {
              navigate("/");
            /* }
          } else {
            setServerError(
              "Ooops! Something went wrong. We couldn't activate this account."
            ); */
          // }
        // }
      })
      .catch((errors) => {
        setServerError(errors.message);
      });
  };

  return (
    <Box sx={{ marginTop: "100px" }}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Grid align="center">
          <p>
            {serverError ? (
              <Alert severity="error" style={errorStyle}>
                {serverError}
              </Alert>
            ) : null}
          </p>

          <Typography variant="h5" fontWeight="600">
            {activation === false ? "Activation in progress. Please wait" : ""}
          </Typography>
        </Grid>
      </motion.span>
    </Box>
  );
};

export default AccountActivation;