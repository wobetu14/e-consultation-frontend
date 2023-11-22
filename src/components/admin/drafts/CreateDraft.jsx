import {
  Typography,
  Button,
  FormControlLabel,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
  RadioGroup,
  Radio,
  Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as YUP from "yup";
import { useState, useEffect, useContext, useRef } from "react";
import Header from "../AdminHeader";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { DraftsDataContext } from "../../../contexts/DraftsDataContext";
import { useTranslation } from "react-i18next";

/**
 * Create a functional component named CreateDraft
 */
const CreateDraft = () => {
  /**
   * Create institutions variable to store list of institutions 
   * and allow the user select the name of the institution creating the draft.
   * Actually this data may not be necessary since the institution can be automatically taken 
   * from the logged user information
   */
  const [institutions, setInstitutions] = useState(null);

  /**
   * Create lawCategories variable to store list of law categories and allow
   * the user select the law category the draft belongs to while creating
   */
  const [lawCategories, setLawCategories] = useState(null);

  /**
   * Create sectors variable to store list of sectors and allow the user to specify 
   * the name of sectors the draft deals with
   */
  const [sectors, setSectors] = useState([]);

  /**
   * Create tagLists variable and allow the user enter list of tags the draft document 
   * mainly talks about. Specifiying tags related to topics in the draft content is 
   * important for the document filtering and searching purposes
   */
  const [tagLists, setTagLists] = useState([]);

  /**
   * Create variable to store list of selcted sector values from the Autocomplete TextField 
   * value
   */
  const [selectedSectors, setSelectedSectors] = useState([]);

  const {t}=useTranslation();

  const inputFile=useRef(null);

  /**
   * Destructure and access variable from the DraftsDataContext context 
   */
  const {
    drafts,
    fetchDrafts,
    setServerErrorMsg,
    setServerSuccessMsg,
    setLoading,
    networkError,
    setNetworkError
  } = useContext(DraftsDataContext);

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  /**
   * Fetch list of law categories on component load using the useEffect hook
   */
  useEffect(() => {
   fetchLawCategories()
  }, []);

  /**
   * Fetch list of sectors on component load using the useEffect hook
   */
  useEffect(() => {
    fetchSectors()
  }, []);

  /**
   * Initiate / update the fetchDrafts method call from the context
   */
  useEffect(() => {
    fetchDrafts();
  }, []);

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
     
      });
  };

  const fetchLawCategories = async () => {
    return await axios
      .get("law-categories",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setLawCategories(res.data);
      })
      .catch((error) => {
        
      });
  };

  const fetchSectors = async () => {
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

  /**
   * Use formik object and collect form data
   */
  const formik = useFormik({
    /** 
     * Set the forms intial values
     */
    initialValues: {
      shortTitle: "",
      lawCategoryId: "",
      draftStatusId: 1,
      sectors: [],
      openingDate: "",
      closingDate: "",
      file: null,
      slug: "",
      isPrivate: "",
      parent_id: "",
      tags: [],
      noteId: "1",
      baseLegalReference: "",
      definition: "",
      scope: "",
      mainProvision: "",
      summary: "",
      amendedLaws: "",
      repealedLaws: "",
      transitoryProvision: "",
    },

    /**
     * Validate form fields using formik and YUP validation packages
     */

    validationSchema: YUP.object({
      shortTitle: YUP.string().required(
        `${t('field_required')} ${t('please_provide_short_title')}`
      ),

      definition: YUP.string().required(
        `${t('field_required')} ${t('please_provide_document_definition')}`
      ),

      lawCategoryId: YUP.string().required(
        `${t('field_required')} ${t('please_provide_law_category')}`
      ),

      file: YUP.mixed().required(
        `${t('field_required')} ${t('please_choose_file_to_upload')}`
      ),
      isPrivate: YUP.number().required(
        `${t('field_required')} ${t('please_provide_document_access')}`
      ),
      summary: YUP.string().required(
        `${t('field_required')} ${t('please_provide_document_summary')}`
      ),
    }),

    /**
     * Update form data using onChanges methods of form fields and 
     * collect the updated values for submission and then call a function definition to initiate API call 
     * creating the document record
     */
    onSubmit: (values) => {
      const draftsData = {
        short_title: values.shortTitle,
        law_category_id: values.lawCategoryId,
        draft_status_id: values.draftStatusId,
        sectors:
          selectedSectors.length > 0
            ? selectedSectors.map((selectedSector) => selectedSector.name)
            : [],
        comment_opening_date: values.openingDate,
        comment_closing_date: values.closingDate,
        file: values.file,
        slug: values.slug,
        is_private: values.isPrivate,
        parent_id: values.parentId,
        tags: tagLists.length > 0 ? tagLists.map((tagLists) => tagLists) : [],
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
      };

      /**
       * Create method call and intitiate to create new draft document record in the database
       */
      createDraftDocument(draftsData);
    },
  });

  /**
   * The createDraftDocument method definition to make API calls and create a new document record.
   */
  const createDraftDocument = async (draftsData) => {
    setNetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    return await axios
      .post("drafts", draftsData, 
      { 
        headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setNetworkError(null);
        formik.resetForm();

        inputFile.current.value = ""; 
        inputFile.current.type = "text"; 
        inputFile.current.type = "file"; 
        setTagLists([]);
        fetchDrafts();
        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
        setServerErrorMsg(errors.response.data.message);
        setNetworkError(errors.code);
        setServerSuccessMsg(null);
      });
  };

  return (
    /**
     * Define form and fields to input draft detail information
     */
    <Box width={"95%"}>
      <Header title={t('upload_draft_document')} subtitle="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}> {/* Create form and call the formik object upon form submit */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label={`${t('short_title')} *`}
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
                {t('law_category')} *
              </Typography>
              <FormControl sx={{ minWidth: "100%", paddingBottom: "30px" }}>
                <InputLabel>{t('select_law_category')} *</InputLabel>
                <Select
                  label={t('law_category')}
                  labelId="law_category_Id"
                  id="law_category_Id"
                  size="small"
                  placeholder={`${t('select_law_category')}`}
                  color="info"
                  name="lawCategoryId"
                  onClick={fetchLawCategories}
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

              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                {t('economic_sector')}
              </Typography>
              <Autocomplete
                multiple
                label="Tags"
                id="tags-standard"
                autoSelect
                color="info"
                size="small"
                sx={{ paddingBottom: "10px" }}
                options={sectors}
                getOptionLabel={(option) => option.name}
                onClick={fetchSectors}
                onChange={(e, value) => setSelectedSectors(value)}
                // onSubmit={(e)=>formik.setFieldValue("sectors", [])}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('select_economic_sectors')}
                    placeholder={t('sectors')}
                    value={(option) => option.name}
                    color="info"
                  />
                )}
              />
              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                {t('document_access')} *
              </Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="isPrivate"
                size="small"
                value={formik.values.isPrivate}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label={t('public')}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={t('private')}
                />
                {formik.touched.isPrivate && formik.errors.isPrivate ? (
                  <span style={helperTextStyle}>{formik.errors.isPrivate}</span>
                ) : null}
              </RadioGroup>

              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                {t('enter_tags')}
              </Typography>
              <Autocomplete
                multiple
                id="taglists"
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
                    label={t('list_tags')}
                    name="tags"
                    value={tagLists.map((tag) => tag)}
                    color="info"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label={t('legal_reference')}
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
                label={`${t('definition')} *`}
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
                label={t('scope')}
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
                label={t('main_provision')}
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
                label={`${t('summary')} *`}
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
                label={t('amended_laws')}
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
                label={t('repealed_laws')}
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
                label={t('transitory_provision')}
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
                <strong>{t('attachement_file')}: </strong>
                {t('attach_draft_document_note')}
              </Typography>
              <input
                /* variant="outlined"
                fullWidth
                sx={{ paddingBottom: "20px" }}
                color="info" */
                type="file"
                name="file"
                required
                ref={inputFile}
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

              <Grid sx={{ paddingBottom: "20px" }} align="right">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ align: "right", textTransform: "none" }}
                  color="secondary"
                  elevation={10}
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

export default CreateDraft;