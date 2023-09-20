import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { tokens } from "../../../theme";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import { UserContext } from "../../../contexts/UserContext";
import { useTranslation } from "react-i18next";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const {setUserInfo, setUserRole, setUserToken, userInfo } =
    useContext(UserContext);

  // const [loggedIn, setLoggedIn] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const errorStyle = {
    color: "red",
    fontWeight: "bold",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };
      userLogin(userData);
    },
  });

  const userLogin = async (userData) => {
    setLoading(true);
    return await axios
      .post("http://196.188.107.43:8080/api/v1/login", userData)
      .then((res) => {
        // console.log(res.data);
        if (res.status !== 200) {
          setServerError(res.data.message);
          setLoading(false);
        } else {
          
        if (res.status === 200 && res.data.token) {
            // setLoggedIn(true);
            setServerError(null);
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userRole", res.data.user.roles[0].name);
            localStorage.setItem("userInfo", JSON.stringify(res.data));

            setUserRole(localStorage.getItem("userRole"));
            setUserToken(localStorage.getItem("token"));
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")));


           /*  setUserInfo(JSON.stringify(res.data))
            setUserToken(res.data.token);
            setUserRole(res.data.user.roles[0].name) */

            if(res.data.user.password_changed===null || res.data.user.password_changed===0){
              navigate('/password_change_request')
            }
            else {
              if (localStorage.getItem("userRole") === "Commenter") {
                navigate("/");
              } else {
                navigate("/admin");
              }
            }
 
           } else {
            setServerError("Invalid email or password. Please try again.");
            setLoading(false);
          }
        } 
      })
      .catch((errors) => {
        setServerError(errors.message);
        setLoading(false);
      });
  };

  return (
    <Box sx={{ marginTop: "100px" }}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          elevation={1}
          sx={{
            padding: "20px",
            margin: "20px auto",
            width: "400px",
            backgroundColor: colors.grey[200],
          }}
        >
          <Grid align="center">
            <Avatar
              sx={{
                backgroundColor: colors.brandColor[200],
                width: "40px",
                height: "40px",
                marginBottom: "5px",
              }}
            >
              <LockOutlinedIcon sx={{ width: "20px", height: "20px" }} />
            </Avatar>
            <Typography
              variant="h5"
              sx={{ fontWeight: 400, paddingBottom: "20px" }}
            >
              {t("sign_in")}
            </Typography>
          </Grid>

          <Grid align="center">
            <p>
              {serverError ? (
                <Alert severity="error" style={errorStyle}>
                  {serverError}
                </Alert>
              ) : null}
            </p>

            {loading && <LinearProgress color="info" size="small" sx={{ marginBottom:"15px" }} />}
          </Grid>

          <form onSubmit={formik.handleSubmit}>
            <Grid>
              <TextField
                label={t("email_address")}
                variant="outlined"
                placeholder={t("enter_email_address")}
                required
                fullWidth
                size="small"
                sx={{ paddingBottom: "10px" }}
                color="info"
                name="email"
                value={formik.email}
                onChange={formik.handleChange}
              />
              <TextField
                label={t("password")}
                type="password"
                variant="outlined"
                placeholder={t("enter_password")}
                required
                fullWidth
                size="small"
                sx={{ paddingBottom: "5px" }}
                color="info"
                name="password"
                value={formik.password}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid sx={{ paddingBottom: "5px" }}>
              {/*      <FormControlLabel
              control={
                <Checkbox
                  name="checkeboxname"
                  color='info'
                  />
              }
              label={t('remember')}
            /> */}

              <Button
                type="submit"
                variant="contained"
                color="info"
                fullWidth
                sx={{
                  backgroundColor: colors.brandColor[200],
                  color: colors.grey[300],
                }}
              >
                {t("sign_in")}
              </Button>
            </Grid>
            <Typography>
              <Link to="/reset_password/email_address">
                {t("forgot_password")}?
              </Link>
            </Typography>
            <Typography>
              {t("no_account")}? &nbsp;
              <Link variant="text" color="info" to="/create-account">
                {t("sign_up")}
              </Link>
            </Typography>
          </form>
        </Paper>
      </motion.span>
    </Box>
  );
};

export default Login;