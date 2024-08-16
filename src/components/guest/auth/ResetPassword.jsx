import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as YUP from "yup";
import { useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const location = useLocation();
  const [serverError, setServerError] = useState(null);

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const [loading, setLoading] = useState(false);

  const errorStyle = {
    color: "red",
    fontWeight: "bold",
  };

  const successStyle = {
    color: "green",
    fontWeight: "bold",
  };

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  const formikResetPassword = useFormik({
    initialValues: {
      emailAddress: location.state.email,
      password: "",
      confirmPassword: "",
      passwordResetCode: "",
    },

    validationSchema: YUP.object({
      password: YUP.string().required(
        "This field is required. Please enter your new password."
      ),
      passwordResetCode: YUP.string().required(
        "This field is required. Please enter your reset code."
      ),
      confirmPassword: YUP.string()
        .required(
          "This field is required. Please re-enter password to confirm."
        )
        .oneOf(
          [YUP.ref("password"), null],
          "Confirmation password didn't match."
        ),
    }),

    onSubmit: (values) => {
      const userData = {
        email: values.emailAddress,
        password: values.password,
        confirm_password: values.confirmPassword,
        token: values.passwordResetCode,
      };

      resetPassword(userData);
    },
  });

  const resetPassword = async (userData) => {
    setLoading(true);
    return await axios
      .post("reset-password", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        formikResetPassword.resetForm();
        setLoading(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setLoading(false);
      });
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
            // backgroundColor: colors.grey[200],
          }}
        >
          <Grid align="center">
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                paddingBottom: "20px",
                color: colors.headerText[100],
              }}
            >
              {t("password_reset")}
            </Typography>
            <Typography variant="body1">
              {t("password_reset_message")}
            </Typography>

            <Grid
              align="center"
              sx={{ paddingBottom: "5px", paddingTop: "5px" }}
            >
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
                {loading ? <CircularProgress color="info" /> : null}
              </motion.span>
            </Grid>
          </Grid>

          <Grid align="center">
            <p>
              {serverError ? (
                <Alert severity="error" style={errorStyle}>
                  {serverError}
                </Alert>
              ) : null}
            </p>

            <p style={successStyle}></p>
          </Grid>

          <form onSubmit={formikResetPassword.handleSubmit}>
            <Grid>
              <TextField
                label={t("email_address")}
                variant="outlined"
                fullWidth
                disabled={true}
                size="small"
                sx={{ paddingBottom: "10px" }}
                color="info"
                name="emailAddress"
                value={location.state.email}
                onChange={formikResetPassword.handleChange}
              />

              <TextField
                label={t("password")}
                variant="outlined"
                placeholder={t("enter_email_address")}
                fullWidth
                size="small"
                sx={{ paddingBottom: "10px" }}
                color="info"
                name="password"
                value={formikResetPassword.password}
                onChange={formikResetPassword.handleChange}
                helperText={
                  formikResetPassword.touched.password &&
                  formikResetPassword.errors.password ? (
                    <span style={helperTextStyle}>
                      {formikResetPassword.errors.password}
                    </span>
                  ) : null
                }
              />

              <TextField
                label={t("confirm_password")}
                variant="outlined"
                placeholder={t("confirm_password")}
                fullWidth
                size="small"
                sx={{ paddingBottom: "10px" }}
                color="info"
                name="confirmPassword"
                value={formikResetPassword.confirmPassword}
                onChange={formikResetPassword.handleChange}
                helperText={
                  formikResetPassword.touched.confirmPassword &&
                  formikResetPassword.errors.confirmPassword ? (
                    <span style={helperTextStyle}>
                      {formikResetPassword.errors.confirmPassword}
                    </span>
                  ) : null
                }
              />

              <TextField
                label={t("password_reset_code")}
                variant="outlined"
                placeholder={t("password_reset_code")}
                fullWidth
                size="small"
                sx={{ paddingBottom: "10px" }}
                color="info"
                name="passwordResetCode"
                value={formikResetPassword.passwordResetCode}
                onChange={formikResetPassword.handleChange}
                helperText={
                  formikResetPassword.touched.passwordResetCode &&
                  formikResetPassword.errors.passwordResetCode ? (
                    <span style={helperTextStyle}>
                      {formikResetPassword.errors.passwordResetCode}
                    </span>
                  ) : null
                }
              />
            </Grid>

            <Grid sx={{ paddingBottom: "5px" }}>
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
                {t("reset_password")}
              </Button>
            </Grid>
          </form>
        </Paper>
      </motion.span>
    </Box>
  );
};

export default ResetPassword;
