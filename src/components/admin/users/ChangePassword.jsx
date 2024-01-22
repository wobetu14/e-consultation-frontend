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
import { useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * This component is used to change password for a logged in user
 */

/**
 * Create functional component named "ChangePassword"
 * @returns 
 */

const ChangePassword = () => {
  /**
   * Create state to store error information coming from the server as a result of unsuccessfull API call
   */
  const [serverErrorMsg, setServerErrorMsg] = useState(null);

    /**
   * Create state to store success information coming from the server as a result of unsuccessfull API call
   */
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  /**
   * Destructure translation object from i18next internationalization API using the useTranslation() hook
   */
  const { t } = useTranslation();

  /**
   * Create state to store the progress of an API call. This is usefull to display a progressbar. 
   * If it is loading value is true, the system will display progress bar to indicate the request is being processed.
   * And if it is false, Progressbar will disapear to indicate request processing is completed.
   */
  const [loading, setLoading] = useState(false);

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
   * CSS style to mark helper information for form-validation messages
   */
  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  /**
   * Create initial form values to handle form data for submission using the useFormik() hook
   */
  const formikChangePassword = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    /**
     * Form validation using YUP react form validation library
     */
    validationSchema: YUP.object({
      oldPassword: YUP.string().required(
        `${t("field_required")} ${t("please_enter_old_password")}`
      ),
      newPassword: YUP.string().required(
        `${t("field_required")} ${t("please_enter_new_password")}`
      ),
      confirmPassword: YUP.string()
        .required(`${t("field_required")} ${t("please_confirm_password")}`)
        .oneOf([YUP.ref("newPassword"), null], `${t("password_mismatch")}`),
    }),

    /**
     * Update the formik initial values upon form submission and assign it into userData object
     * @param {*} values - Form values coming upon form submission
     */
    onSubmit: (values) => {
      const userData = {
        old_password: values.oldPassword,
        password: values.newPassword,
        confirm_password: values.confirmPassword,
      };

      /**
       * Call a method with userData parameter which is the implementation of an API call to change password
       */
      changePassword(userData);
    },
  });

  /**
   * The method definition which is the implementation of an API call to change password
   * @param {*} userData - User profile object which contains old_password, new_password and confirm_password values
   * @returns successMessage - If API call is success; returns success message
   * @returns exceptions - If API call fails; returns error message
   */
  const changePassword = async (userData) => {
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
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setLoading(false);
      });
  };

  return (
    /**
     * Create "Change Password form UI"
     */
    <Box m="0" width="95%">
      <Grid align="center" sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
            {/**
             * Display success message if there is any
             */}
          <Typography variant="h1">
            {serverSuccessMsg ? (
              <Alert severity="success" style={successStyle}>
                {serverSuccessMsg}
              </Alert>
            ) : null}
          </Typography>

          {/**
           * Display error message if there is any
           */}
          <Typography variant="h1">
            {serverErrorMsg ? (
              <Alert severity="error" style={errorStyle}>
                {serverErrorMsg}
              </Alert>
            ) : null}
          </Typography>

          {/**
           * Render progressbar if the value of loading state is true. This progressbar is used to indicate 
           * the status of API call to change the password and displayed when you click the submit button
           */}
          {loading ? <CircularProgress color="info" /> : null}
        </motion.span>
      </Grid>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >

        {/**
         * Create form UI
         */}
        <form onSubmit={formikChangePassword.handleSubmit}>
          <TextField
            label={`${t("enter_old_password")} *`}
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
            label={`${t("enter_new_password")} *`}
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
            label={`${t("confirm_password")}`}
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

          {/**
           * Create submit button
           */}
          <Grid sx={{ paddingBottom: "20px" }} align="right">
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ align: "right", textTransform: "none" }}
              color="info"
            >
              {t("change_password")}
            </Button>
          </Grid>
        </form>
      </motion.span>
    </Box>
  );
};

export default ChangePassword;