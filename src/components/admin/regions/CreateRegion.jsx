import { Button, TextField, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as YUP from "yup";
import { useContext } from "react";
import Header from "../AdminHeader";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { RegionsDataContext } from "../../../contexts/RegionsDataContext";

const CreateRegion = () => {
  const { 
    setServerErrorMsg, 
    setServerSuccessMsg, 
    setLoading,
    networkError,
    setNetworkError, 
    fetchRegions
  } =
    useContext(RegionsDataContext);

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  const formik = useFormik({
    initialValues: {
      regionName: "",
      createdBy: 1,
    },

    validationSchema: YUP.object({
      regionName: YUP.string().required(
        "This field is required. Please enter the region name."
      ),
    }),

    onSubmit: (values) => {
      const regionData = {
        name: values.regionName,
        created_by: values.createdBy,
      };

      registerRegion(regionData);
    },
  });

  const registerRegion = async (regionData) => {
    setNetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    return await axios
      .post("regions", regionData, 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        console.log(res);
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setNetworkError(null)
        setLoading(false);
        fetchRegions();
        formik.resetForm();
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
      <Header title="Create New Region" subtitle="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Region Name *"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "10px" }}
                color="info"
                name="regionName"
                value={formik.values.regionName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.regionName && formik.errors.regionName ? (
                    <span style={helperTextStyle}>
                      {formik.errors.regionName}
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
                  color="secondary"
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

export default CreateRegion;