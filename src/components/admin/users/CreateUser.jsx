import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as YUP from "yup";
import "yup-phone";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Header from "../AdminHeader";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { UsersDataContext } from "../../../contexts/UsersDataContext";
import { UserContext } from "../../../contexts/UserContext";

const CreateUser = () => {
  const [institutions, setInstitutions] = useState(null);
  const [regions, setRegions] = useState(null);
  const [userRoles, setUserRoles] = useState(null);
  const [newRoleID, setNewRoleID]=useState(null);

  // User context
  const { userInfo, userRole } = useContext(UserContext);

  // UsersDataContext
  const { fetchUsers, setServerErrorMsg, setServerSuccessMsg, setLoading } =
    useContext(UsersDataContext);

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  useEffect(() => {
    /* const id = setInterval(fetchInstitutions(), 1000);
    return () => clearInterval(id); */
    fetchInstitutions();
  }, []);

  useEffect(() => {
    /* const id = setInterval(fetchUserRoles(), 1000);
    return () => clearInterval(id); */
    fetchUserRoles();
  }, []);

  useEffect(() => {
    /* const id = setInterval(fetchRegions(), 1000);
    return () => clearInterval(id); */
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    return await axios
      .get("public/regions", 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setRegions(res.data);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const fetchInstitutions = async () => {
    return await axios
      .get("institutions",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutions(res.data);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const fetchUserRoles = async () => {
    return await axios
      .get("roles", 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        console.log(res);
        setUserRoles(res);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleName: "",
      regionID: userInfo ? userInfo.user.region_id : "",
      institutionID: "",
      createdBy: userInfo ? userInfo.user.id : "",
      updatedBy: userInfo ? userInfo.user.id : "",
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
      mobileNumber: YUP.string()
        .required("This field is required. Please enter mobile number.")
        .phone(
          "ET",
          true,
          "Invalid phone number. Use +251, or 251 or 09... etc. Note: phone numbers starting with 07 are invalid for the time being."
        ),
      email: YUP.string()
        .required("This field is required. Please enter email address.")
        .email("Invalid email address"),
        roleName: YUP.string().required(
        "This field is required. Please select user role."
      ),
      // institutionID:YUP.string().required("This field is required. Please select Institution.")
    }),

    onSubmit: (values) => {
      const userData = {
        first_name: values.firstName,
        middle_name: values.middleName,
        last_name: values.lastName,
        mobile_number: values.mobileNumber,
        password: (
          values.firstName +
          "." +
          values.lastName
        ).toLocaleLowerCase(),
        confirm_password: (
          values.firstName +
          "." +
          values.lastName
        ).toLocaleLowerCase(),
        email: values.email,
        roles: values.roleName,
        created_by: values.createdBy,
        updated_by: values.updatedBy,
        region_id: values.regionID,
        institution_id: values.institutionID,
      };

      createUser(userData);
      fetchUsers();
    },
  });

  const createUser = async (userData) => {
    console.log(userData)

    setLoading(true);
    return await axios
      .post("register", userData,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }} 
      )
      .then((res) => {
        console.log(res);
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        formik.resetForm();
        fetchUsers();
        setLoading(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setLoading(false);
      });
  };

  return (
    <Box m="0" width={"95%"}>
      <Header title="Create New User" subtitle="Manage users" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="First Name *"
                variant="outlined"
                size="small"
                fullWidth
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
                label="Mobile Number *"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="mobileNumber"
                value={formik.values.mobileNumber}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <span style={helperTextStyle}>
                      {formik.errors.mobileNumber}
                    </span>
                  ) : null
                }
              />
              {userInfo ? (
                userInfo.user.roles[0].name === "Super Admin" &&  
                formik.values.roleName === "Regional Admin" ? (
                  <FormControl sx={{ minWidth: "100%", paddingBottom: "5px" }}>
                    <InputLabel>Select Region *</InputLabel>
                    <Select
                      labelId="region_id"
                      id="region_id"
                      size="small"
                      color="info"
                      name="regionID"
                      value={formik.values.regionID}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.regionID && formik.errors.regionID ? (
                          <span style={helperTextStyle}>
                            {formik.errors.regionID}
                          </span>
                        ) : null
                      }
                    >
                      <MenuItem value="">
                        <em>Not applicable</em>
                      </MenuItem>
                      {regions
                        ? regions.map((region) => (
                            <MenuItem value={region.id} key={region.id}>
                              {region.name}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                    <FormHelperText>
                      {formik.touched.regionID && formik.errors.regionID ? (
                        <span style={helperTextStyle}>
                          {formik.errors.regionID}
                        </span>
                      ) : null}
                    </FormHelperText>
                  </FormControl>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              {userRole &&
              (userRole === "Regional Institutions Admin" ||
                userRole === "Federal Institutions Admin" ||
                userRole === "Super Admin") ? (
                ""
              ) : (
                <FormControl sx={{ minWidth: "100%", paddingBottom: "5px" }}>
                  <InputLabel>Select Institution</InputLabel>
                  <Select
                    labelId="institution_id"
                    id="institution_id"
                    size="small"
                    color="info"
                    name="institutionID"
                    onClick={fetchInstitutions}
                    value={formik.values.institutionID}
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched.institutionID &&
                      formik.errors.institutionID ? (
                        <span style={helperTextStyle}>
                          {formik.errors.institutionID}
                        </span>
                      ) : null
                    }
                  >
                    {institutions
                      ? institutions.map((institution) => (
                          <MenuItem value={institution.id} key={institution.id}>
                            {institution.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                  <FormHelperText>
                    {formik.touched.institutionID &&
                    formik.errors.institutionID ? (
                      <span style={helperTextStyle}>
                        {formik.errors.institutionID}
                      </span>
                    ) : null}
                  </FormHelperText>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Middle Name *"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
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
                label="Email Address *"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.email && formik.errors.email ? (
                    <span style={helperTextStyle}>{formik.errors.email}</span>
                  ) : null
                }
              />

              {/* <Typography variant='body1' sx={{ paddingBottom:'10px' }}>User Role</Typography> */}
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Last Name *"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
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

              <FormControl sx={{ minWidth: "100%", paddingBottom: "30px" }}>
                <InputLabel>Select User Role *</InputLabel>
                <Select
                  labelId="user_role"
                  size="small"
                  id="user_role"
                  color="info"
                  name="roleName"
                  onClick={fetchUserRoles}
                  value={formik.values.roleName}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.roleName && formik.errors.roleName ? (
                      <span style={helperTextStyle}>
                        {formik.errors.roleName}
                      </span>
                    ) : null
                  }
                >
                  {userRoles
                    ? userRoles.map((userRole) => (
                        <MenuItem value={userRole.role.name} key={userRole.name}>
                          {userRole.role.name}{" "}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                <FormHelperText>
                  {formik.touched.roleName && formik.errors.roleName ? (
                    <span style={helperTextStyle}>{formik.errors.roleName}</span>
                  ) : null}
                </FormHelperText>
              </FormControl>

              <Grid sx={{ paddingBottom: "20px" }} align="right">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ align: "right", textTransform: "none" }}
                  color="info"
                >
                  Save{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </motion.span>
    </Box>
  );
};

export default CreateUser;