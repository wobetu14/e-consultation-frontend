import {
  Typography,
  Button,
  FormControlLabel,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as YUP from "yup";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Header from "../AdminHeader";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { UserContext } from "../../../contexts/UserContext";
import { InstitutionsDataContext } from "../../../contexts/InstitutionsDataContext";
import { useTranslation } from "react-i18next";

const CreateInstitution = () => {
  const [institutionsTypes, setInstitutionTypes] = useState(null);
  const [institutionsCategories, setInstitutionCategories] = useState(null);
  const [institutionsLevels, setInstitutionLevels] = useState(null);
  const [regions, setRegions] = useState(null);
  const [sectors, setSectors] = useState(null);

  const {t}=useTranslation();

  // User context
  const { userInfo} =
    useContext(UserContext);
  const {
    setServerErrorMsg,
    setServerSuccessMsg,
    fetchInstitutions,
    setLoading,
    networkError,
    setNetworkError
  } = useContext(InstitutionsDataContext);

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  useLayoutEffect(() => {
    fetchInstitutionTypes();
  }, []);

  useLayoutEffect(() => {
    fetchRegions();
  }, []);

  useLayoutEffect(() => {
    fetchEconomicSectors();
  }, []);

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
        
      });
  };

  useEffect(() => {
    fetchInstitutionCategories()
  }, []);

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
        
      });
  };

  useEffect(() => {
    fetchInstitutionLevels()
  }, []);

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
        
      });
  };

  const formik = useFormik({
    initialValues: {
      institutionName: "",
      institutionTypeId: userInfo.user.region_id !== null ? 2 : 1,
      institutionCategoryId: "",
      institutionLevelId: "",

      email: "",
      telephone: "",
      address: "",
      canCreateDraft: "",
      institution_category_id: "",

      createdBy: userInfo ? userInfo.user.id : "",
      updatedBy: userInfo ? userInfo.user.id : "",
    },

    validationSchema: YUP.object({
      institutionName: YUP.string().required(
        `${t('field_required')}${t('please_enter_institution_name')}`
      ),

      institutionCategoryId: YUP.number().required(
        `${t('field_required')}${t('please_select_institution_category')}`
      ),
      // institutionLevelId:YUP.number().required("This field is required. Please select level of institution."),

      telephone: YUP.string()
        .required(`${t('field_required')}${t('please_enter_mobile_number')}`)
        .phone(
          "ET",
          true,
          `${t('invalid_phone_number')}`,
          // "Invalid phone number. Use +251, or 251 or 09... etc. Note: phone numbers starting with 07 are invalid for the time being."
        ),
      email: YUP.string()
        .required(`${t('field_required')}${t('please_enter_email_address')}`)
        .email(`${t('invalid_email')}`),
      canCreateDraft: YUP.number().required(
        "This field is required. Please choose an option."
      ),
    }),

    onSubmit: (values) => {
      const institutionData = {
        name: values.institutionName,
        institution_category_id: values.institutionCategoryId,
        institution_level_id: values.institutionLevelId,
        institution_type_id: userInfo.user.region_id !== null ? 2 : 1,

        email: values.email,
        telephone: values.telephone,
        address: values.address,
        created_by: values.createdBy,
        can_create_draft: values.canCreateDraft,
        updated_by: values.updatedBy,
      };
      createInstitution(institutionData);
    },
  });

  const createInstitution = async (institutionData) => {
    setNetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    return await axios
      .post("institutions", institutionData, {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }}, 
      )
      .then((res) => {
        
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        formik.resetForm();
        fetchInstitutions();
        setLoading(false);
        networkError(null);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setNetworkError(errors.code)
        setServerSuccessMsg(null);
        setLoading(false);
      });
  };

  return (
    <Box width={"95%"}>
      <Header title={t('add_new_institution')} subtitle="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label={`${t('institution')} *`}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="institutionName"
                value={formik.values.institutionName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.institutionName &&
                  formik.errors.institutionName ? (
                    <span style={helperTextStyle}>
                      {formik.errors.institutionName}
                    </span>
                  ) : null
                }
              />

              <FormControl sx={{ minWidth: "100%", paddingBottom: "30px" }}>
                <InputLabel>{t('select_institution_category')} *</InputLabel>
                <Select
                  labelId="institution_category_id"
                  id="institution_category"
                  size="small"
                  label="Select Institution Category"
                  placeholder="Select Institution Category"
                  color="info"
                  name="institutionCategoryId"
                  value={formik.values.institutionCategoryId}
                  onClick={fetchInstitutionCategories}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.institutionCategoryId &&
                    formik.errors.institutionCategoryId ? (
                      <span style={helperTextStyle}>
                        {formik.errors.institutionCategoryId}
                      </span>
                    ) : null
                  }
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
                <FormHelperText>
                  {formik.touched.institutionCategoryId &&
                  formik.errors.institutionCategoryId ? (
                    <span style={helperTextStyle}>
                      {formik.errors.institutionCategoryId}
                    </span>
                  ) : null}
                </FormHelperText>
              </FormControl>

              <FormControl sx={{ minWidth: "100%", paddingBottom: "30px" }}>
                <InputLabel>{t('select_institution_level')}</InputLabel>
                <Select
                  labelId="institution_level_id"
                  id="institution_level"
                  size="small"
                  label="Select Institution Level"
                  placeholder="Select Institution Level"
                  color="info"
                  name="institutionLevelId"
                  value={formik.values.institutionLevelId}
                  onClick={fetchInstitutionLevels}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.institutionLevelId &&
                    formik.errors.institutionLevelId ? (
                      <span style={helperTextStyle}>
                        {formik.errors.institutionLevelId}
                      </span>
                    ) : null
                  }
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
                <FormHelperText>
                  {formik.touched.institutionLevelId &&
                  formik.errors.institutionLevelId ? (
                    <span style={helperTextStyle}>
                      {formik.errors.institutionLevelId}
                    </span>
                  ) : null}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={`${t('email_address')} *`}
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
                helperText={
                  formik.touched.email && formik.errors.email ? (
                    <span style={helperTextStyle}>{formik.errors.email}</span>
                  ) : null
                }
              />
              <TextField
                label={`${t('telephone')}`}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="telephone"
                value={formik.values.telephone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.telephone && formik.errors.telephone ? (
                    <span style={helperTextStyle}>
                      {formik.errors.telephone}
                    </span>
                  ) : null
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={t('address')}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="address"
                value={formik.values.address}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.address && formik.errors.address ? (
                    <span style={helperTextStyle}>{formik.errors.address}</span>
                  ) : null
                }
              />

              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                {t('can_create_draft')} *
              </Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="canCreateDraft"
                size="small"
                value={formik.values.canCreateDraft}
                onChange={formik.handleChange}
              >
                <FormControlLabel value={1} control={<Radio />} label={t('yes')} />
                <FormControlLabel value={0} control={<Radio />} label={t('no')} />
              </RadioGroup>

              <Grid sx={{ paddingBottom: "20px" }} align="right">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ align: "right", textTransform: "none" }}
                  color="secondary"
                >
                  {t('save')}{" "}
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