import { Button, TextField, Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useContext } from "react";
import { tokens } from "../../../theme";
import Header from "../AdminHeader";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { UserContext } from "../../../contexts/UserContext";
import { SectorsDataContext } from "../../../contexts/SectorsDataContext";
import { useTranslation } from "react-i18next";

const EditSector = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  // User context
  const { userInfo } = useContext(UserContext);
  const {
    sector,
    setSector,
    fetchSectors,
    setServerErrorMsg,
    setServerSuccessMsg,
    setNetworkError,
    setLoading,
    setShowSectorEditForm,
  } = useContext(SectorsDataContext);

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  const formik = useFormik({
    initialValues: {
      sectorName: sector ? sector.name : "",
      sectorDescription: sector ? sector.description : "",
      createdBy: userInfo ? userInfo.user.id : "",
      updatedBy: userInfo ? userInfo.user.id : "",
    },

    onSubmit: (values) => {
      const sectorData = {
        name: values.sectorName,
        description: values.sectorDescription,
        created_by: values.createdBy,
        updated_by: values.updatedBy,
        _method: "put",
      };

      updateSector(sectorData);
    },
  });

  const updateSector = async (sectorData) => {
    setNetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    return await axios
      .post(`sectors/${sector.id}`, sectorData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setNetworkError(null);
        setShowSectorEditForm(false);
        fetchSectors();
        setLoading(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setNetworkError(errors.code);
        setLoading(false);
      });
  };

  return (
    <Box width={"95%"}>
      <Header title={t("update_sector_information")} subtitle="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <TextField
                label={`${t("name_of_economic_sector")} *`}
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
                label={t("description")}
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
                  sx={{
                    align: "right",
                    textTransform: "none",
                    backgroundColor: colors.successColor[200],
                    color: colors.grey[300],
                  }}
                  color="info"
                >
                  {t("save_changes")}{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </motion.span>
    </Box>
  );
};

export default EditSector;