import {
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as YUP from "yup";
import "yup-phone";
import {useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);
  
  const {t}=useTranslation()

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

  const formikChangePassword = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: YUP.object({
      oldPassword: YUP.string().required(
       `${t('field_required')} ${t('please_enter_old_password')}`
      ),
      newPassword: YUP.string().required(
        `${t('field_required')} ${t('please_enter_new_password')}`
      ),
      confirmPassword: YUP.string()
        .required(
          `${t('field_required')} ${t('please_confirm_password')}`
        )
        .oneOf(
          [YUP.ref("newPassword"), null],
          `${t('password_mismatch')}`
        ),
    }),

    onSubmit: (values) => {
      const userData = {
        old_password: values.oldPassword,
        password: values.newPassword,
        confirm_password: values.confirmPassword,
      };

      changePassword(userData);
    },
  });

  const changePassword = async (userData) => {
    setLoading(true);
    return await axios
      .post("change-password", userData, 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        formikChangePassword.resetForm();
        setLoading(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setLoading(false);
      });
  };

  return (
    <Box m="0" width="95%">
      <Grid align="center" sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
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

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formikChangePassword.handleSubmit}>
          {/* <Grid container spacing={2}>
          <Grid item xs={4}> */}
          <TextField
            label={`${t('enter_old_password')} *`}
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
            label={`${t('enter_new_password')} *`}
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
            label={`${t('confirm_password')}`}
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
              {t('change_password')}
            </Button>
          </Grid>
        </form>
      </motion.span>
    </Box>
  );
};

export default ChangePassword;