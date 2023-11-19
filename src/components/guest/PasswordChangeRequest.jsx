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
import {useState } from "react";
import axios from "../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PasswordChangeRequest = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      newPassword: YUP.string().required(
        "This field is required. Please enter your new password."
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
        if (localStorage.getItem("userRole") === "Commenter") {
          navigate("/");
        } else {
          navigate("/admin");
        }
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setLoading(false);
      });
  };

  const handleURLRedirection=()=>{
    if (localStorage.getItem("userRole") === "Commenter") {
      navigate("/");
    } else {
      navigate("/admin");
    }
  }

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
            width: "500px",
            backgroundColor: colors.grey[200],
          }}
        >
          <Grid align="center">
            
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, paddingBottom: "20px" }}
            >
              Request for password change
            </Typography>
            <Typography
              variant="body1"
            >
              It seems that you have not changed your password since it has been created the first time. 
              It is recommended to change passwords frequently. Please change it now. 
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

            {loading && <LinearProgress color="info" size="small" sx={{ marginBottom:"15px" }} />}
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
              <Typography variant="body1">
                Change Password
              </Typography>
            </Button>

            <Button
              onClick={handleURLRedirection}
              variant="text"
              size="small"
              sx={{ textTransform:"none" }}
            >
              <Typography variant="body1">
                Skip
              </Typography>
            </Button>
          </Grid>
        </form>
        </Paper>
      </motion.span>
    </Box>
  );
};

export default PasswordChangeRequest;