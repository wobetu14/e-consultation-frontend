import { Button, TextField, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as YUP from "yup";
import { useContext } from "react";
import Header from "../AdminHeader";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { UserContext } from "../../../contexts/UserContext";
import { SectorsDataContext } from "../../../contexts/SectorsDataContext";

const CreateSector = () => {
  
  // User context
  const { userInfo } = useContext(UserContext);
  const { 
    setServerErrorMsg, 
    setServerSuccessMsg, 
    fetchSectors, 
    setLoading,
    networkError,
    setNetworkError
  } =
    useContext(SectorsDataContext);

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  const formik = useFormik({
    initialValues: {
      sectorName: "",
      sectorDescription: "",
      createdBy: userInfo ? userInfo.user.id : "",
    },

    validationSchema: YUP.object({
      sectorName: YUP.string().required(
        "This field is required. Please enter the sector name."
      ),
    }),

    onSubmit: (values) => {
      const sectorData = {
        name: values.sectorName,
        description: values.sectorDescription,
        created_by: values.createdBy,
      };

      createSector(sectorData);
      fetchSectors();
    },
  });

  const createSector = async (sectorData) => {
    setNetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    return await axios
      .post("sectors", sectorData, 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setNetworkError(null);
        setLoading(false);
        formik.resetForm();
        fetchSectors();
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setNetworkError(errors.code)
        setLoading(false);
      });
  };

  return (
    <Box width={"95%"}>
      <Header title="Create New Sector" subtitle="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <TextField
                label="Name of economic sector *"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="sectorName"
                value={formik.values.sectorName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.sectorName && formik.errors.sectorName ? (
                    <span style={helperTextStyle}>
                      {formik.errors.sectorName}
                    </span>
                  ) : null
                }
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                label="Short description"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={4}
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="sectorDescription"
                value={formik.values.sectorDescription}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.sectorDescription &&
                  formik.errors.sectorDescription ? (
                    <span style={helperTextStyle}>
                      {formik.errors.sectorDescription}
                    </span>
                  ) : null
                }
              />
            </Grid>

            <Grid item xs={2}>
              <Grid sx={{ paddingBottom: "20px" }} align="right">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ align: "right", textTransform: "none" }}
                  color="secondary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </motion.span>
    </Box>
  );
};

export default CreateSector;