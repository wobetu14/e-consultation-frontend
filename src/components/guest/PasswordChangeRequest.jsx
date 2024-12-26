import {
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  Paper,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as YUP from "yup";
import "yup-phone";
import { useContext, useState } from "react";
import axios from "../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ChangePasswordRequestContext } from "../../contexts/ChangePasswordChangeContext";

const PasswordChangeRequest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const location = useLocation();

  const { userInfo, setUserInfo, setUserRole, setUserToken } = useContext(UserContext);
  const {enforcePasswordChange, setEnforcePasswordChange} = useContext(ChangePasswordRequestContext);

  const { passwordChanged, hello } = location || {}

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const [loading, setLoading] = useState(false);

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

  const newLogin = async (newLoginData) => {
    setLoading(true);
    return await axios
      .post("https://backend.e-consultation.gov.et/api/v1/login", newLoginData)
      .then((res) => {
        if (res.status !== 200) {
          // setServerError(res.data.message);
          setLoading(false);
        } else {
          if (res.status === 200 && res.data.token) {
            // setServerError(null);
            const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userRole", res.data.user.roles[0].name);
            localStorage.setItem("userInfo", JSON.stringify(res.data));

            setUserRole(localStorage.getItem("userRole"));
            setUserToken(localStorage.getItem("token"));
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
            setEnforcePasswordChange(false);
              if (localStorage.getItem("userRole") === "Commenter") {
                navigate("/");
              } else {
                navigate("/admin");
              }
          } else {
            // setServerError("Invalid email or password. Please try again.");
            setLoading(false);
          }
        }
      })
      .catch((errors) => {
        // setServerError(errors.message);
        setLoading(false);
      });
  }

  const formikChangePassword = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: YUP.object({
      oldPassword: YUP.string().required(
        "This field is required. Please enter your old password."
      ),
      newPassword: YUP.string()
        .required("This field is required. Please enter your new password.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character"
        ),
      confirmPassword: YUP.string()
        .required(
          "This field is required. Please re-enter password to confirm."
        )
        .oneOf(
          [YUP.ref("newPassword"), null],
          "Confirmation password didn't match."
        ),
    }),

    onSubmit: (values) => {
      const userData = {
        old_password: values.oldPassword,
        password: values.newPassword,
        confirm_password: values.confirmPassword,
      };

      const newLoginData = {
        email: userInfo.user.email,
        password: values.newPassword,
      };

      changePassword(userData, newLoginData);
    },
  });

  const changePassword = async (userData, newLoginData) => {
    setLoading(true);
    return await axios
      .post("change-password", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        formikChangePassword.resetForm();
        setLoading(false);
        if (localStorage.getItem("userRole") === "Commenter") {
          newLogin(newLoginData)
          navigate("/");
        } else {
          newLogin(newLoginData);
          navigate("/admin");
        }
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setLoading(false);
      });
  };

  const handleURLRedirection = () => {
    if (localStorage.getItem("userRole") === "Commenter") {
      navigate("/");
    } else {
      navigate("/admin");
    }
  };

  return (
    <Box
      sx={{
        marginTop: "100px",
        margin: {
          xs: "0 20px",
          sm: "0 50px",
          md: "0 200px",
          lg: "0 300px",
          xl: "0 500px",
        },
      }}
    >
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
            width: {
              md: "400px",
              lg: "500px",
              xl: "500px",
            },
            // width: "500px",
            // backgroundColor: colors.grey[200],
          }}
        >
          <Grid align="center">
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, paddingBottom: "20px" }}
            >
              Request for password change
            </Typography>
            <Typography variant="body1">
              It seems that you have not changed your password since it has been
              created the first time. It is recommended to change passwords
              frequently. Please change it now.
            </Typography>
          </Grid>

          <Grid align="center">
            <p>
              {serverErrorMsg ? (
                <Alert severity="error" style={errorStyle}>
                  {serverErrorMsg}
                </Alert>
              ) : null}
            </p>

            {loading && (
              <LinearProgress
                color="info"
                size="small"
                sx={{ marginBottom: "15px" }}
              />
            )}
          </Grid>

          <form onSubmit={formikChangePassword.handleSubmit}>
            {/* <Grid container spacing={2}>
          <Grid item xs={4}> */}
            <TextField
              label="Enter old password *"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ paddingBottom: "30px" }}
              color="info"
              name="oldPassword"
              value={formikChangePassword.values.oldPassword}
              onBlur={formikChangePassword.handleBlur}
              onChange={formikChangePassword.handleChange}
              helperText={
                formikChangePassword.touched.oldPassword &&
                formikChangePassword.errors.oldPassword ? (
                  <span style={helperTextStyle}>
                    {formikChangePassword.errors.oldPassword}
                  </span>
                ) : null
              }
            />
            <TextField
              label="Enter new password *"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ paddingBottom: "30px" }}
              color="info"
              name="newPassword"
              value={formikChangePassword.values.newPassword}
              onBlur={formikChangePassword.handleBlur}
              onChange={formikChangePassword.handleChange}
              helperText={
                formikChangePassword.touched.newPassword &&
                formikChangePassword.errors.newPassword ? (
                  <span style={helperTextStyle}>
                    {formikChangePassword.errors.newPassword}
                  </span>
                ) : null
              }
            />

            <TextField
              label="Confirm Password *"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ paddingBottom: "30px" }}
              color="info"
              name="confirmPassword"
              value={formikChangePassword.values.confirmPassword}
              onBlur={formikChangePassword.handleBlur}
              onChange={formikChangePassword.handleChange}
              helperText={
                formikChangePassword.touched.confirmPassword &&
                formikChangePassword.errors.confirmPassword ? (
                  <span style={helperTextStyle}>
                    {formikChangePassword.errors.confirmPassword}
                  </span>
                ) : null
              }
            />

            <Grid sx={{ paddingBottom: "20px" }} align="right">
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ align: "right", textTransform: "none" }}
                color="info"
              >
                <Typography variant="body1">Change Password</Typography>
              </Button>

              <Typography variant="h1">{passwordChanged}</Typography>
              <Typography variant="h1">{hello}</Typography>
              {/* 
              <Button
                onClick={handleURLRedirection}
                variant="text"
                size="small"
                sx={{ textTransform: "none" }}
              >
                <Typography variant="body1">Skip</Typography>
              </Button> */}
            </Grid>
          </form>
        </Paper>
      </motion.span>
    </Box>
  );
};

export default PasswordChangeRequest;
