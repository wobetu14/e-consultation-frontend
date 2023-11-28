import {
  Typography,
  Button,
  FormControlLabel,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  MenuItem,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { tokens } from "../../../theme";
import Header from "../AdminHeader";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { UserContext } from "../../../contexts/UserContext";
import { InstitutionsDataContext } from "../../../contexts/InstitutionsDataContext";
import { useTranslation } from "react-i18next";

const CreateInstitution = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [regions, setRegions] = useState(null);
  const [sectors, setSectors] = useState(null);

  const { t } = useTranslation();

  // User context
  const { userInfo } = useContext(UserContext);
  const {
    institution,
    setServerErrorMsg,
    setServerSuccessMsg,
    setLoading,
    setNetworkError,
    fetchInstitutions,
    setShowInstitutionEditForm,
  } = useContext(InstitutionsDataContext);

  const [institutionsTypes, setInstitutionTypes] = useState(null);
  const [institutionsCategories, setInstitutionCategories] = useState(null);
  const [institutionsLevels, setInstitutionLevels] = useState(null);

  const [canCreateDraft, setCanCreateDraft] = useState(
    parseInt(institution.can_create_draft)
  );

  useEffect(() => {
    fetchInstitutionTypes();
  }, []);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    fetchEconomicSectors();
  }, []);

  const fetchInstitutionTypes = async () => {
    return await axios
      .get("institution-types", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutionTypes(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchInstitutionCategories();
  }, []);

  const fetchInstitutionCategories = async () => {
    return await axios
      .get("institution-categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutionCategories(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchInstitutionLevels();
  }, []);

  const fetchInstitutionLevels = async () => {
    return await axios
      .get("institution-levels", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutionLevels(res.data);
      })
      .catch((error) => {});
  };

  const fetchRegions = async () => {
    return await axios
      .get("regions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setRegions(res.data);
      })
      .catch((error) => {});
  };

  const fetchEconomicSectors = async () => {
    return await axios
      .get("sectors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setSectors(res.data);
      })
      .catch((error) => {});
  };

  const formik = useFormik({
    initialValues: {
      institutionName: institution.name,
      institutionCategoryId: institution.institution_category_id,
      institutionLevelId: institution.institution_level_id,

      email: institution.email,
      telephone: institution.telephone,
      address: institution.address,
      canCreateDraft: canCreateDraft,

      createdBy: userInfo.user.id,
      updatedBy: userInfo.user.id,
    },

    onSubmit: (values) => {
      const institutionData = {
        name: values.institutionName,
        institution_category_id: values.institutionCategoryId,
        institution_level_id: values.institutionLevelId,

        email: values.email,
        telephone: values.telephone,
        address: values.address,
        created_by: values.createdBy,
        can_create_draft: canCreateDraft,
        updated_by: values.updatedBy,
        _method: "put",
      };
      updateInstitution(institutionData);
    },
  });

  const updateInstitution = async (institutionData) => {
    setNetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    return await axios
      .post(`institutions/${institution.id}`, institutionData, {
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
        setShowInstitutionEditForm(false);
        fetchInstitutions();
        formik.resetForm();
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
      <Header title={t("update_institution_info")} subtitle="" />
      <h3>{formik.values.institutionName}</h3>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label={t("institution")}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="institutionName"
                value={formik.values.institutionName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              <FormControl sx={{ minWidth: "100%", paddingBottom: "30px" }}>
                <InputLabel>{t("select_institution_category")}</InputLabel>
                <Select
                  labelId="institution_category_id"
                  id="institution_category"
                  size="small"
                  label="Select Institution Category"
                  placeholder="Select Institution Category"
                  color="info"
                  name="institutionCategoryId"
                  value={formik.values.institutionCategoryId}
                  onChange={formik.handleChange}
                >
                  {institutionsCategories
                    ? institutionsCategories.map((institutionsCategory) => (
                        <MenuItem
                          value={institutionsCategory.id}
                          key={institutionsCategory.id}
                        >
                          {institutionsCategory.name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: "100%", paddingBottom: "30px" }}>
                <InputLabel>{t("select_institution_level")}</InputLabel>
                <Select
                  labelId="institution_level_id"
                  id="institution_level"
                  size="small"
                  label="Select Institution Level"
                  placeholder="Select Institution Level"
                  color="info"
                  name="institutionLevelId"
                  value={formik.values.institutionLevelId}
                  onChange={formik.handleChange}
                >
                  {institutionsLevels
                    ? institutionsLevels.map((institutionsLevel) => (
                        <MenuItem
                          value={institutionsLevel.id}
                          key={institutionsLevel.id}
                        >
                          {institutionsLevel.name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={t("email_address")}
                variant="outlined"
                size="small"
                type="email"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <TextField
                label={t("telephone")}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="telephone"
                value={formik.values.telephone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={t("address")}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="address"
                value={formik.values.address}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />

              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                {t("can_create_draft")}
              </Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="canCreateDraft"
                size="small"
                value={canCreateDraft}
                onChange={(e) => setCanCreateDraft(parseInt(e.target.value))}
              >
                <FormControlLabel
                  value={1}
                  checked={canCreateDraft === 1}
                  control={<Radio />}
                  label={t("yes")}
                />
                <FormControlLabel
                  value={0}
                  checked={canCreateDraft === 0}
                  control={<Radio />}
                  label={t("no")}
                />
              </RadioGroup>

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

export default CreateInstitution;