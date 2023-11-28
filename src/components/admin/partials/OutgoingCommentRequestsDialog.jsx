import React, { useEffect, useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
  Box,
  DialogActions,
  Grid,
  Alert,
  LinearProgress,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

const OutgoingCommentRequestsDialog = ({
  draftID,
  draftInfo,
  title,
  setServerSuccessMsg,
  setServerErrorMsg,
  serverSuccessMsg,
  serverErrorMsg,
  openDialog,
  setOpenDialog,
  showDialog,
  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
}) => {
  const params = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);

  const { t } = useTranslation();

  // Set list of email address for invitation
  const [peopleEmail, setPeopleEmail] = useState([]);

  const [instIDs, setInsIDs] = useState([]);

  const [repliersEmail, setRepliersEmail] = useState([]);

  const [myUsers, setMyUsers] = useState([]);
  const [repliersID, setRepliersID] = useState([]);
  const [loading, setLoading] = useState(false);
  const [networkError, setnetworkError] = useState(null);

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  const errorStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "18px",
  };

  const successStyle = {
    color: "green",
    fontWeight: "400",
    fontSize: "18px",
  };

  useEffect(() => {
    getMyUsersID();
  }, [repliersEmail]);

  useEffect(() => {
    getInstitutionsID();
  }, [selectedInstitutions]);

  useEffect(() => {
    fetchInstitutions();
  }, []);

  useEffect(() => {
    fetchMyUsers();
  }, []);

  const getMyUsersID = () => {
    if (repliersEmail.length > 0) {
      repliersEmail.map((replier) =>
        setRepliersID([...repliersID, replier.id])
      );
    }
  };

  const getInstitutionsID = () => {
    if (selectedInstitutions.length > 0) {
      selectedInstitutions.map((selectedInstitution) =>
        setInsIDs([...instIDs, selectedInstitution.id])
      );
    }
  };

  const fetchInstitutions = async () => {
    try {
      const res = await axios.get("public/institutions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      });
      setInstitutions(res.data.data.data);
    } catch (error) {}
  };

  const fetchMyUsers = async () => {
    try {
      const res = await axios.get(`commenters-per-institution`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      });

      setMyUsers(res.data.data);
    } catch (error) {}
  };

  const formikAcceptanceForm = useFormik({
    initialValues: {
      draft_id: draftID,
      institutions: [],
      institutionMessage:
        "Dear Sir / Madam, We kindly invite your organization to review this draft documnet. You can assign experts among staff and let them review it. ",
      emails: [],
      comment_repliers: [],
      personalMessage:
        "Dear Sir / Madam, We kindly invite you to review this draft documnet. We are so happy if you can go through it and provide your comments as soon as possible.",

      draftOpeningDate: "",
      draftClosingDate: "",
      acceptanceRemark:
        "Draft opening request is accepted. The document is now open for commenting.",
    },

    onSubmit: (values) => {
      const requestData = {
        draft_id: draftID,

        comment_opening_date: values.draftOpeningDate,
        comment_closing_date: values.draftClosingDate,
        acceptance_remark: values.acceptanceRemark,

        institutions:
          instIDs.length > 0 ? instIDs.map((instIDs) => instIDs) : [],
        institution_message: values.institutionMessage,

        emails: peopleEmail.length > 0 ? peopleEmail.map((email) => email) : [],
        personnel_message: values.personalMessage,

        comment_repliers:
          repliersID.length > 0 ? repliersID.map((replierID) => replierID) : [],
      };

      acceptCommentOpening(requestData);
    },
  });

  const acceptCommentOpening = async (requestData) => {
    setnetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    return await axios
      .post(`approve-comment-opening`, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        fetchDocumentDetails();
        fetchDocumentSections();
        fetchDocumentComments();

        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setnetworkError(null);
        setLoading(false);
        setOpenDialog(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setnetworkError(errors.name);
        setLoading(false);
      });
  };

  return (
    <Dialog
      //   fullScreen
      open={openDialog}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="600">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid align="center" sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Typography variant="h1">
                {serverSuccessMsg ? (
                  <Alert severity="success" style={successStyle}>
                    {serverSuccessMsg}
                  </Alert>
                ) : null}
              </Typography>

              <Typography variant="h1">
                {serverErrorMsg ? (
                  <Alert severity="error" style={errorStyle}>
                    {serverErrorMsg}
                  </Alert>
                ) : null}
              </Typography>

              <Typography variant="h1">
                {networkError ? (
                  <Alert severity="error" style={errorStyle}>
                    Your internet connection may be unstable. Please try again.
                  </Alert>
                ) : null}
              </Typography>

              {loading && <LinearProgress size="small" color="info" />}
            </motion.span>
          </Grid>

          <form
            style={{ marginBottom: "30px" }}
            onSubmit={formikAcceptanceForm.handleSubmit}
          >
            <Typography variant="h5" fontWeight="600">
              {t("set_opening_and_closing_dates")}
            </Typography>
            <TextField
              // label="Draft Openining Date"
              type="datetime-local"
              variant="outlined"
              size="small"
              fullWidth
              rows={4}
              sx={{ paddingBottom: "10px" }}
              color="info"
              name="draftOpeningDate"
              value={formikAcceptanceForm.values.draftOpeningDate}
              onBlur={formikAcceptanceForm.handleBlur}
              onChange={formikAcceptanceForm.handleChange}
              helperText={
                formikAcceptanceForm.touched.draftOpeningDate &&
                formikAcceptanceForm.errors.draftOpeningDate ? (
                  <span style={helperTextStyle}>
                    {formikAcceptanceForm.errors.draftOpeningDate}
                  </span>
                ) : null
              }
            />
            <TextField
              type="datetime-local"
              variant="outlined"
              size="small"
              fullWidth
              rows={4}
              sx={{ paddingBottom: "10px" }}
              color="info"
              name="draftClosingDate"
              value={formikAcceptanceForm.values.draftClosingDate}
              onBlur={formikAcceptanceForm.handleBlur}
              onChange={formikAcceptanceForm.handleChange}
              helperText={
                formikAcceptanceForm.touched.draftClosingDate &&
                formikAcceptanceForm.errors.draftClosingDate ? (
                  <span style={helperTextStyle}>
                    {formikAcceptanceForm.errors.draftClosingDate}
                  </span>
                ) : null
              }
            />

            <TextField
              label={`${t("write_remark")} (${t("not_mandatory")})`}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              sx={{ paddingBottom: "10px" }}
              color="info"
              name="acceptanceRemark"
              value={formikAcceptanceForm.values.acceptanceRemark}
              onBlur={formikAcceptanceForm.handleBlur}
              onChange={formikAcceptanceForm.handleChange}
            />
            <Typography variant="subtitle1" fontWeight="600">
              {t("assign_repliers")}
            </Typography>

            <Autocomplete
              multiple
              id="tags-standard"
              freeSolo
              autoSelect
              color="info"
              sx={{ paddingBottom: "10px" }}
              options={myUsers}
              getOptionLabel={(option) =>
                option.first_name + " " + option.middle_name
              }
              onChange={(e, value) => setRepliersEmail(value)}
              onClick={fetchMyUsers}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={t("select_repliers")}
                  value={(option) => option}
                  color="info"
                />
              )}
            />

            <Typography variant="subtitle1" fontWeight="600">
              {t("invite_institutions")}
            </Typography>
            <Autocomplete
              multiple
              id="tags-standard"
              freeSolo
              autoSelect
              color="info"
              sx={{ paddingBottom: "10px" }}
              options={institutions}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => setSelectedInstitutions(value)}
              onClick={fetchInstitutions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={t("select_institutions")}
                  placeholder={t("institutions")}
                  value={(option) => option.name}
                  color="info"
                />
              )}
            />

            <TextField
              label={`${t("write_remark")} (${t("not_mandatory")})`}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              sx={{ paddingBottom: "5px" }}
              color="info"
              name="institutionMessage"
              value={formikAcceptanceForm.values.institutionMessage}
              onBlur={formikAcceptanceForm.handleBlur}
              onChange={formikAcceptanceForm.handleChange}
            />

            <Typography variant="subtitle1" fontWeight="600"> 
              {t("invite_people")}
            </Typography>
            <Autocomplete
              multiple
              id="tags-standard"
              freeSolo
              autoSelect
              color="info"
              sx={{ paddingBottom: "10px" }}
              options={peopleEmail}
              getOptionLabel={(option) => option}
              onChange={(e, value) => setPeopleEmail(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={t("enter_email_address")}
                  value={(option) => option}
                  color="info"
                />
              )}
            />

            <TextField
              label={`${t("write_remark")} (${t("not_mandatory")})`}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              sx={{ paddingBottom: "5px" }}
              color="info"
              name="personalMessage"
              value={formikAcceptanceForm.values.personalMessage}
              onBlur={formikAcceptanceForm.handleBlur}
              onChange={formikAcceptanceForm.handleChange}
            />

            <Box>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                type="submit"
                sx={{
                  textTransform: "none",
                  marginRight: "5px",
                  backgroundColor: colors.successColor[200],
                  color: colors.grey[300],
                }}
                onClick={acceptCommentOpening}
              >
                <Typography variant="body2">
                  {t("publish_draft_for_comment")}
                </Typography>
              </Button>
            </Box>
          </form>
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            size="small"
            color="info"
            sx={{ textTransform: "none" }}
          >
            <Typography variant="body2">{t("cancel")}</Typography>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default OutgoingCommentRequestsDialog;