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
  FormHelperText,
  MenuItem,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react";
import { tokens } from "../../../theme";
import Header from "../AdminHeader";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { UserContext } from "../../../contexts/UserContext";
import { DraftsDataContext } from "../../../contexts/DraftsDataContext";
import { useTranslation } from "react-i18next";

/**
 * Create a functional component named 'EditDraft'
 */
const EditDraft = () => {
  /**
   * Create important variables such as things to set theme color, language, user login infomration
   */
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /**
   * Destructure translation object from useTranslation hook of i18next language library
   */
  const { t } = useTranslation();

  /**
   * Destructure the 'userInfo' variable from UserContext to get access to
   * logged in user's information
   */
  const { userInfo } = useContext(UserContext);

  /**
   * Destructure variables from DraftsDataContext to access data and methods
   * related to the current draft document
   */
  const {
    draft,
    fetchDrafts,
    setShowDraftEditForm,
    setServerErrorMsg,
    setServerSuccessMsg,
    setLoading,
    setNetworkError,
  } = useContext(DraftsDataContext);

  /**
   * Create variables to access and store data related to institutions,
   * law categories, sectors, document access types, tags etc
   */
  const [institutions, setInstitutions] = useState(null);
  const [lawCategories, setLawCategories] = useState(null);
  const [sectors, setSectors] = useState(draft.sector);
  const [documentAccess, setDocumentAccess] = useState(
    parseInt(draft.is_private)
  );

  const [tagLists, setTagLists] = useState([]);

  /**
   * Create variable to store value of sector data selected by user from a dropdown list
   */
  const [selectedSectors, setSelectedSectors] = useState([]);

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  /**
   * Method call to retrieve institutions data from an API call.
   * The results are used to populate option value dropdown list
   */
  useEffect(() => {
    fetchInstitutions();
  }, []);

  /**
   * Method call to retrieve law categories data from an API call.
   * The results are use to populate option value of a drop down list
   */

  useEffect(() => {
    fetchLawCategories();
  }, []);

  /**
   * Method call to retrieve sectors data from API call.
   * The results are used to populate option value of a dropdown list
   */
  useEffect(() => {
    fetchSectors();
  }, []);

  /**
   * Method call to retrieve drafts data in which the definition is available from
   * DraftsDataContext. This data is used to fill the initial form fields for the selected
   * draft and make it ready for updating.
   */
  useEffect(() => {
    fetchDrafts();
  }, []);

  /**
   * Method definition for fetching institutions data from the API
   */
  const fetchInstitutions = async () => {
    return await axios
      .get("institutions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setInstitutions(res.data);
      })
      .catch((error) => {});
  };

  /**
   * Method definition for fetching law categories data from the API
   */
  const fetchLawCategories = async () => {
    return await axios
      .get("law-categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data)
      .then((res) => {
        setLawCategories(res.data);
      })
      .catch((error) => {});
  };

  /**
   * Method definition for fetching sectors data from the API
   */
  const fetchSectors = async () => {
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

  /**
   * Defining intial values of form fields using formik library. Read more about formik
   * library to understand how it works at https://formik.org/
   */
  const formik = useFormik({
    initialValues: {
      institutionID: draft ? draft.institution.id : "",
      shortTitle: draft ? draft.short_title : "",
      lawCategoryId: draft ? draft.law_category.id : "",
      draftStatusId: draft ? draft.draft_status_id : "",
      sectors: draft.sector.length > 0 ? draft.sector.map((sec) => sec) : [],
      file: null,
      active: draft ? draft.active : "",
      isPrivate: documentAccess,
      tags: draft ? draft.tags : [],
      baseLegalReference: draft ? draft.base_legal_reference : "",
      definition: draft ? draft.definition : "",
      scope: draft ? draft.scope : "",
      mainProvision: draft ? draft.main_provision : "",
      summary: draft ? draft.summary : "",
      amendedLaws: draft ? draft.amended_laws : "",
      repealedLaws: draft ? draft.repealed_laws : "",
      transitoryProvision: draft ? draft.transitory_provision : "",
      updatedBy: userInfo.user.updated_by,
    },

    /**
     * Collected updated values from the form upon submission and prepare it for input for the API call
     */
    onSubmit: (values) => {
      const draftsData = {
        institution_id: values.institutionID,
        short_title: values.shortTitle,
        law_category_id: values.lawCategoryId,
        draft_status_id: values.draftStatusId,
        sectors:
          selectedSectors.length > 0
            ? selectedSectors.map((sector) => sector)
            : [],
        comment_opening_date: values.openingDate,
        comment_closing_date: values.closingDate,
        file: values.file,
        slug: values.slug,
        // active:values.active,
        is_private: documentAccess,
        parent_id: values.parentId,
        tags:
          tagLists.length > 0
            ? tagLists.map((tagList) => tagList)
            : values.tags,
        note_id: values.noteId,
        base_legal_reference: values.baseLegalReference,
        definition: values.definition,
        scope: values.scope,
        main_provision: values.mainProvision,
        summary: values.summary,
        amended_laws: values.amendedLaws,
        repealed_laws: values.repealedLaws,
        transitory_provision: values.transitoryProvision,
        comment_request_description: values.summary,
        comment_summary: values.summary,
        updated_by: values.updatedBy,
        _method: "put",
      };

      updateDraftDocument(draftsData);
    },
  });

  /**
   * Method definition to execute API call to commit an update of drafts data on the database
   */
  const updateDraftDocument = async (draftsData) => {
    setNetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    return await axios
      .post(`drafts/${draft.id}`, draftsData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setShowDraftEditForm(false);
        setNetworkError(null);
        formik.resetForm();
        fetchDrafts();
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
      {/**
       * Define for used to update drafts information
       */}
      <Header title={t("update_draft_info")} subtitle="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label={t("short_title")}
                variant="outlined"
                size="small"
                fullWidth
                rows={4}
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="shortTitle"
                value={formik.values.shortTitle}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.shortTitle && formik.errors.shortTitle ? (
                    <span style={helperTextStyle}>
                      {formik.errors.shortTitle}
                    </span>
                  ) : null
                }
              />

              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                Law Category
              </Typography>
              <FormControl sx={{ minWidth: "100%", paddingBottom: "30px" }}>
                <InputLabel>{t("select_law_category")}</InputLabel>
                <Select
                  labelId="law_category_Id"
                  id="law_category_Id"
                  size="small"
                  placeholder={t("select_law_category")}
                  color="info"
                  name="lawCategoryId"
                  value={formik.values.lawCategoryId}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.lawCategoryId &&
                    formik.errors.lawCategoryId ? (
                      <span style={helperTextStyle}>
                        {formik.errors.lawCategoryId}
                      </span>
                    ) : null
                  }
                >
                  {lawCategories
                    ? lawCategories.map((lawCategory) => (
                        <MenuItem value={lawCategory.id} key={lawCategory.id}>
                          {lawCategory.name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                <FormHelperText>
                  {formik.touched.lawCategoryId &&
                  formik.errors.lawCategoryId ? (
                    <span style={helperTextStyle}>
                      {formik.errors.lawCategoryId}
                    </span>
                  ) : null}
                </FormHelperText>
              </FormControl>

              {/* <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                Economic Sector
              </Typography>
              <Autocomplete
                multiple
                id="tags-standard"
                color="info"
                size="small"
                sx={{ paddingBottom: "10px" }}
                options={sectors ? sectors : []}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => setSelectedSectors(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select sectors"
                    placeholder="Sectors "
                    name="sectors"
                    value={formik.values.sectors.map((sec) => sec)}
                  />
                )}
              /> */}
              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                {t("document_access")}
              </Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="isPrivate"
                size="small"
                value={documentAccess}
                onChange={(e) => setDocumentAccess(parseInt(e.target.value))}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  checked={documentAccess === 0}
                  label={t("public")}
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  checked={documentAccess === 1}
                  label={t("private")}
                />
              </RadioGroup>

              {/* <Autocomplete
                multiple
                id="tags-standard"
                freeSolo
                autoSelect
                color="info"
                sx={{ paddingBottom: "10px" }}
                options={tagLists}
                getOptionLabel={(option) => option}
                onChange={(e, value) => setTagLists(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="List of tags"
                    name="tags"
                    value={draft ? draft.tags : ""}
                  />
                )}
              /> */}
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={t("legal_reference")}
                variant="outlined"
                size="small"
                multiline
                rows={4}
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="baseLegalReference"
                value={formik.values.baseLegalReference}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.baseLegalReference &&
                  formik.errors.baseLegalReference ? (
                    <span style={helperTextStyle}>
                      {formik.errors.baseLegalReference}
                    </span>
                  ) : null
                }
              />

              <TextField
                label={t("definition")}
                variant="outlined"
                size="small"
                multiline
                rows={4}
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="definition"
                value={formik.values.definition}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.definition && formik.errors.definition ? (
                    <span style={helperTextStyle}>
                      {formik.errors.definition}
                    </span>
                  ) : null
                }
              />

              <TextField
                label={t("scope")}
                variant="outlined"
                size="small"
                multiline
                rows={4}
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="scope"
                value={formik.values.scope}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.scope && formik.errors.scope ? (
                    <span style={helperTextStyle}>{formik.errors.scope}</span>
                  ) : null
                }
              />

              <TextField
                label={t("main_provision")}
                variant="outlined"
                size="small"
                multiline
                rows={4}
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="mainProvision"
                value={formik.values.mainProvision}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.mainProvision &&
                  formik.errors.mainProvision ? (
                    <span style={helperTextStyle}>
                      {formik.errors.mainProvision}
                    </span>
                  ) : null
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={t("summary")}
                variant="outlined"
                size="small"
                multiline
                rows={4}
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="summary"
                value={formik.values.summary}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.summary && formik.errors.summary ? (
                    <span style={helperTextStyle}>{formik.errors.summary}</span>
                  ) : null
                }
              />
              <TextField
                label={t("amended_laws")}
                variant="outlined"
                size="small"
                multiline
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="amendedLaws"
                value={formik.values.amendedLaws}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.amendedLaws && formik.errors.amendedLaws ? (
                    <span style={helperTextStyle}>
                      {formik.errors.amendedLaws}
                    </span>
                  ) : null
                }
              />

              <TextField
                label={t("repealed_laws")}
                variant="outlined"
                size="small"
                multiline
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="repealedLaws"
                value={formik.values.repealedLaws}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.repealedLaws && formik.errors.repealedLaws ? (
                    <span style={helperTextStyle}>
                      {formik.errors.repealedLaws}
                    </span>
                  ) : null
                }
              />

              <TextField
                label={t("transitory_provision")}
                variant="outlined"
                size="small"
                multiline
                rows={4}
                fullWidth
                sx={{ paddingBottom: "30px" }}
                color="info"
                name="transitoryProvision"
                value={formik.values.transitoryProvision}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.transitoryProvision &&
                  formik.errors.transitoryProvision ? (
                    <span style={helperTextStyle}>
                      {formik.errors.transitoryProvision}
                    </span>
                  ) : null
                }
              />

              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                <strong>{t("attachement_file")} : </strong>
                {t("attach_draft_document_note")}
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                sx={{ paddingBottom: "20px" }}
                color="info"
                type="file"
                name="file"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.setFieldValue("file", e.target.files[0]);
                }}
                helperText={
                  formik.touched.file && formik.errors.file ? (
                    <span style={helperTextStyle}>{formik.errors.file}</span>
                  ) : null
                }
              />

              <Button
                color="secondary"
                size="small"
                href={draft ? draft.file : ""}
                target="_blank"
                sx={{ textTransform: "none" }}
              >
                {t("download_previous_file")}
              </Button>

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

export default EditDraft;
