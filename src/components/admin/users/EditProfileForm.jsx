import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as YUP from "yup";
import axios from "../../../axios/AxiosGlobal";
import { UserContext } from '../../../contexts/UserContext';
import { useTranslation } from 'react-i18next';


const EditProfileForm = ({
    usersData, 
    setUsersData,
    setServerErrorMsg,
    setServerSuccessMsg,
    helperTextStyle,
    setShowProfileForm,
    setLoading,
    setNetworkError
}) => {

    const { userInfo, setUserInfo } = useContext(UserContext);
    const {t}=useTranslation();

    const formik = useFormik({
        initialValues: {
          userID: usersData ? usersData.id : "",
          firstName: usersData ? usersData.first_name : "",
          middleName: usersData ? usersData.middle_name : "",
          lastName: usersData ? usersData.last_name : "",
          mobileNumber: usersData ? usersData.mobile_number : "",
          email: usersData ? usersData.email : "",
          roleID: usersData.roles[0].id,
          updatedBy: usersData ? usersData.id : "",
        },
    
        validationSchema: YUP.object({
          firstName: YUP.string().required(
            "This field is required. Please enter the first name."
          ),
          middleName: YUP.string().required(
            "This field is required. Please enter father name."
          ),
          lastName: YUP.string().required(
            "This field is required. Please enter grandfather name."
          ),
          mobileNumber: YUP.string().required(
            "This field is required. Please enter mobile number."
          ),
          email: YUP.string().required(
            "This field is required. Please enter email address."
          ),
          roleID: YUP.string().required(
            "This field is required. Please select user role."
          ),
          // institutionID:YUP.string().required("This field is required. Please select Institution.")
        }),
    
        onSubmit: (values) => {
          const userData = {
            id: values.userID,
            first_name: values.firstName,
            middle_name: values.middleName,
            last_name: values.lastName,
            mobile_number: values.mobileNumber,
            email: values.email,
            roles: values.roleID,
            // created_by:values.createdBy,
            updated_by: values.updatedBy,
            _method:"put"
            // institution_id:values.institutionID
          };
    
          updateProfile(userData);
        },
      });
    
      const updateProfile = async (userData) => {
          setServerSuccessMsg(null)
          setServerErrorMsg(null)
          setNetworkError(null)
          setLoading(true)
        return await axios
          .post(`users/${userInfo.user.id}`, userData,
          {headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data"
          }})
          .then((res) => {
            setUsersData(res.data.data);
            setServerSuccessMsg(res.data.message);
            setNetworkError(null)
            setShowProfileForm(false);
            setLoading(false);
            setServerErrorMsg(null);
          })
          .catch((errors) => {
            setServerErrorMsg(errors.response.data.message);
            setServerSuccessMsg(null);
            setNetworkError(errors.code);
            setLoading(false);
          });
      };
  return (
    <Box m="0 20px" width={"95%"}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "500", marginBottom: "20px", marginTop: "20px" }}
          >
            {t('update_profile')}{" "}
          </Typography>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label={t('first_name')}
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{ paddingBottom: "30px" }}
                    color="info"
                    name="firstName"
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.firstName && formik.errors.firstName ? (
                        <span style={helperTextStyle}>
                          {formik.errors.firstName}
                        </span>
                      ) : null
                    }
                  />
                  <TextField
                    label={t('middle_name')}
                    variant="outlined"
                    fullWidth
                    sx={{ paddingBottom: "30px" }}
                    color="info"
                    size="small"
                    name="middleName"
                    value={formik.values.middleName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.middleName && formik.errors.middleName ? (
                        <span style={helperTextStyle}>
                          {formik.errors.middleName}
                        </span>
                      ) : null
                    }
                  />
                  <TextField
                    label={t('last_name')}
                    variant="outlined"
                    fullWidth
                    sx={{ paddingBottom: "30px" }}
                    color="info"
                    size="small"
                    name="lastName"
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName ? (
                        <span style={helperTextStyle}>
                          {formik.errors.lastName}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={t('mobile_number')}
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{ paddingBottom: "30px" }}
                    color="info"
                    name="mobileNumber"
                    value={formik.values.mobileNumber}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.mobileNumber &&
                      formik.errors.mobileNumber ? (
                        <span style={helperTextStyle}>
                          {formik.errors.mobileNumber}
                        </span>
                      ) : null
                    }
                  />
                  <TextField
                    label={t('email_address')}
                    variant="outlined"
                    fullWidth
                    sx={{ paddingBottom: "30px" }}
                    color="info"
                    size="small"
                    name="email"
                    disabled
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.email && formik.errors.email ? (
                        <span style={helperTextStyle}>
                          {formik.errors.email}
                        </span>
                      ) : null
                    }
                  />
                  <Grid
                    sx={{ marginBottom: "100px", marginTop: "30px" }}
                    align="right"
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      color="secondary"
                    >
                      {t('save_changes')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </motion.span>
        </Box>
  )
}

export default EditProfileForm