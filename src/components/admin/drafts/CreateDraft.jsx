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
import { useState, useEffect, useContext } from "react";
import Header from "../AdminHeader";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { DraftsDataContext } from "../../../contexts/DraftsDataContext";

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
  }, [institutions]);

  /**
   * Fetch list of law categories on component load using the useEffect hook
   */
  useEffect(() => {
   fetchLawCategories()
  }, [lawCategories]);

  /**
   * Fetch list of sectors on component load using the useEffect hook
   */
  useEffect(() => {
    fetchSectors()
  }, [sectors]);

  /**
   * Initiate / update the fetchDrafts method call from the context
   */
  useEffect(() => {
    fetchDrafts();
  }, [drafts]);

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
        console.log(error.response.message);
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
        console.log(error.response.message);
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
        "This field is required. Please provide a short description about the document."
      ),

      definition: YUP.string().required(
        "This field is required. Please provide law category information for this document."
      ),

      lawCategoryId: YUP.string().required(
        "This field is required. Please provide a definition for the document."
      ),

      file: YUP.mixed().required(
        "This field is required. Please choose file to upload."
      ),
      isPrivate: YUP.number().required(
        "This field is required. Please provide the status of this document."
      ),
      summary: YUP.string().required(
        "This field is required. Please provide summary."
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
        // console.log(res.data);
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setNetworkError(null);
        formik.resetForm();
        fetchDrafts();
        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
        setServerErrorMsg(errors.response.data.message);
        setNetworkError(errors);
        setServerSuccessMsg(null);
        console.log(errors)
      });
  };

  return (
    /**
     * Define form and fields to input draft detail information
     */
    <Box width={"95%"}>
      <Header title="Upload new draft document" subtitle="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={formik.handleSubmit}> {/* Create form and call the formik object upon form submit */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Short title *"
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
                <InputLabel>Select Law Category</InputLabel>
                <Select
                  labelId="law_category_Id"
                  id="law_category_Id"
                  size="small"
                  placeholder="Select law category"
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
                Economic Sector
              </Typography>
              <Autocomplete
                multiple
                id="tags-standard"
                autoSelect
                color="info"
                size="small"
                sx={{ paddingBottom: "10px" }}
                options={sectors}
                getOptionLabel={(option) => option.name}
                onClick={fetchSectors}
                onChange={(e, value) => setSelectedSectors(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select sectors"
                    placeholder="Sectors "
                    value={(option) => option.name}
                  />
                )}
              />
              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                Document Access *
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
                  label="Public"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Private"
                />
                {formik.touched.isPrivate && formik.errors.isPrivate ? (
                  <span style={helperTextStyle}>{formik.errors.isPrivate}</span>
                ) : null}
              </RadioGroup>

              <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                Enter Draft Tags
              </Typography>
              <Autocomplete
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
                    value={tagLists.map((tag) => tag)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Base Legal Reference"
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
                label="Definition *"
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
                label="Scope"
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
                label="Main Provision"
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
                label="Summary *"
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
                label="Amended Laws"
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
                label="Repealed Laws"
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
                label="Transitory Provision"
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
                <strong>Attachement:</strong>
                Please attach the draft document file *. (Only .doc or .docx
                files are allowed.)
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

              <Grid sx={{ paddingBottom: "20px" }} align="right">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ align: "right", textTransform: "none" }}
                  color="secondary"
                  elevation={10}
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

export default CreateDraft;