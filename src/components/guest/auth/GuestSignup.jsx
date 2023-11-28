import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useFormik } from "formik";
import "yup-phone";
import * as YUP from "yup";
import { useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const GuestSignup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const errorStyle = {
    color: "red",
    fontSize: "16px",
  };

  const successStyle = {
    color: "green",
    fontSize: "16px",
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      roles: 8,
      institutionTypeID: 1,
    },

    validationSchema: YUP.object({
      firstName: YUP.string().required(
        "This field is required. Please enter your name."
      ),
      middleName: YUP.string().required(
        "This field is required. Please enter your father name."
      ),
      lastName: YUP.string().required(
        "This field is required. Please enter your grand father name."
      ),
      email: YUP.string()
        .email("Invalid email. Please enter a correct email address.")
        .required("This field is required. Please enter email address."),
      mobileNumber: YUP.string()
        .required("This field is required. Please enter mobile number.")
        .phone(
          "ET",
          true,
          "Invalid phone number. Use +251, or 251 or 09... etc. Note: phone numbers starting with 07 are invalid for the time being."
        ),
      password: YUP.string().required(
        "This field is required. Please enter password."
      ),
      confirmPassword: YUP.string()
        .required(
          "This field is required. Please re-enter password to confirm."
        )
        .oneOf([YUP.ref("password"), null], "Password didn't match."),
    }),

    onSubmit: (values) => {
      const userData = {
        first_name: values.firstName,
        middle_name: values.middleName,
        last_name: values.lastName,
        mobile_number: values.mobileNumber,
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
        roles: values.roles,
        institution_id: values.institutionTypeID,
      };

      registerUser(userData);
    },
  });

  const registerUser = async (userData) => {
    setLoading(true);
    return await axios
      .post("signup", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setLoading(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setLoading(false);
      });
  };

  return (
    <Box sx={{ backgroundColor: colors.grey[200] }}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: "15px",
            margin: "30px 100px",
            backgroundColor: colors.grey[200],
          }}
        >
          <Grid container spacing={2}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 500,
                padding: "20px",
                color: colors.primary[200],
              }}
            >
              {t("create_account")}
            </Typography>
          </Grid>

          <Grid container spacing={2} sx={{ marginLeft: "5px" }}>
            <p>
              {serverSuccessMsg ? (
                <Alert severity="success" style={successStyle}>
                  {serverSuccessMsg}
                </Alert>
              ) : null}
            </p>

            <p>
              {serverErrorMsg ? (
                <Alert severity="error" style={errorStyle}>
                  {serverErrorMsg}
                </Alert>
              ) : null}
            </p>
            <p>{loading ? <CircularProgress color="info" /> : null}</p>
          </Grid>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={10}>
              <Grid item xs={6}>
                <TextField
                  label={t("first_name") + "*"}
                  variant="outlined"
                  placeholder={t("enter_first_name")}
                  fullWidth
                  sx={{ paddingBottom: "25px" }}
                  color="info"
                  name="firstName"
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName ? (
                      <span style={errorStyle}>{formik.errors.firstName}</span>
                    ) : null
                  }
                />

                <TextField
                  label={t("middle_name") + "*"}
                  variant="outlined"
                  placeholder={t("enter_middle_name")}
                  fullWidth
                  sx={{ paddingBottom: "25px" }}
                  color="info"
                  name="middleName"
                  value={formik.values.fatherName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.middleName && formik.errors.middleName ? (
                      <span style={errorStyle}>{formik.errors.middleName}</span>
                    ) : null
                  }
                />

                <TextField
                  label={t("last_name") + "*"}
                  variant="outlined"
                  placeholder={t("enter_last_name")}
                  fullWidth
                  sx={{ paddingBottom: "25px" }}
                  color="info"
                  name="lastName"
                  value={formik.values.grandFatherName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.lastName && formik.errors.lastName ? (
                      <span style={errorStyle}>{formik.errors.lastName}</span>
                    ) : null
                  }
                />

                <TextField
                  label={t("email_address") + "*"}
                  variant="outlined"
                  placeholder={t("enter_email_address")}
                  fullWidth
                  sx={{ paddingBottom: "25px" }}
                  color="info"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched && formik.errors.email ? (
                      <span style={errorStyle}>{formik.errors.email}</span>
                    ) : null
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={t("mobile_number") + "*"}
                  variant="outlined"
                  placeholder={t("enter_mobile_number")}
                  fullWidth
                  sx={{ paddingBottom: "25px" }}
                  color="info"
                  name="mobileNumber"
                  value={formik.values.mobileNumber}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.mobileNumber &&
                    formik.errors.mobileNumber ? (
                      <span style={errorStyle}>
                        {formik.errors.mobileNumber}
                      </span>
                    ) : null
                  }
                />

                <TextField
                  label={t("password") + "*"}
                  type="password"
                  variant="outlined"
                  placeholder={t("enter_password")}
                  fullWidth
                  sx={{ paddingBottom: "25px" }}
                  color="info"
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.password && formik.errors.password ? (
                      <span style={errorStyle}>{formik.errors.password}</span>
                    ) : null
                  }
                />

                <TextField
                  label={t("confirm_password") + "*"}
                  type="password"
                  variant="outlined"
                  placeholder={t("confirm_password")}
                  fullWidth
                  sx={{ paddingBottom: "25px" }}
                  color="info"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onBlur={formik.touched}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <span style={errorStyle}>
                        {formik.errors.confirmPassword}
                      </span>
                    ) : null
                  }
                />
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      backgroundColor: colors.brandColor[200],
                      color: colors.grey[300],
                    }}
                    color="info"
                  >
                    {t("create_account")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </motion.span>
    </Box>
  );
};

export default GuestSignup;
