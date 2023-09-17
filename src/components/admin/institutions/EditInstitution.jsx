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

const CreateInstitution = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [institutionsTypes, setInstitutionTypes] = useState(null);
  const [institutionsCategories, setInstitutionCategories] = useState(null);
  const [institutionsLevels, setInstitutionLevels] = useState(null);

  const [regions, setRegions] = useState(null);
  const [sectors, setSectors] = useState(null);

  // User context
  const { userInfo } = useContext(UserContext);
  const { institution, setServerErrorMsg, setServerSuccessMsg, setLoading } =
    useContext(InstitutionsDataContext);

  useEffect(() => {
    fetchInstitutionTypes();
  }, [institutionsTypes]);

  useEffect(() => {
    fetchRegions();
  }, [regions]);

  useEffect(() => {
    fetchEconomicSectors();
  }, [sectors]);

  const fetchInstitutionTypes = async () => {
    return await axios
      .get("institution-types",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutionTypes(res.data);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  useEffect(() => {
    fetchInstitutionCategories();
  }, [institutionsCategories]);

  const fetchInstitutionCategories = async () => {
    return await axios
      .get("institution-categories",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutionCategories(res.data);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  useEffect(() => {
    fetchInstitutionLevels();
  }, [institutionsLevels]);

  const fetchInstitutionLevels = async () => {
    return await axios
      .get("institution-levels",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutionLevels(res.data);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const fetchRegions = async () => {
    return await axios
      .get("regions",
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

  const fetchEconomicSectors = async () => {
    return await axios
      .get("sectors",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setSectors(res.data);
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      institutionName: institution.name,
      institutionCategoryId: institution.institution_category_id,
      institutionLevelId: institution.institution_level_id,

      email: institution.email,
      telephone: institution.telephone,
      address: institution.address,
      canCreateDraft: institution.can_create_draft,

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
        can_create_draft: values.canCreateDraft,
        updated_by: values.updatedBy,
        _method: "put",
      };
      createInstitution(institutionData);
    },
  });

  const createInstitution = async (institutionData) => {
    setLoading(true);
    return await axios
      .post(`institutions/${institution.id}`, institutionData,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        formik.resetForm();
        setLoading(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setLoading(false);
      });
  };

  return (
    <Box width={"95%"}>
      <Header title="Update Institution Info" subtitle="" />
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
                label="Institution Name"
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
                <InputLabel>Select Institution Category</InputLabel>
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
                <InputLabel>Select Institution Level</InputLabel>
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
                label="Email Address"
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
                label="Telephone Number"
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
                label="Address"
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
                Can this institution create draft document?
              </Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="canCreateDraft"
                size="small"
                value={formik.values.canCreateDraft}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value={1}
                  checked={institution.can_create_draft === 1}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={0}
                  checked={institution.can_create_draft === 0}
                  control={<Radio />}
                  label="No"
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
                  Save Changes{" "}
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