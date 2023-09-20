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

const OutgoingCommentRequestsDialog = ({
  draftInfo,
  title,
  setServerSuccessMsg,
  setServerErrorMsg,
  serverSuccessMsg,
  serverErrorMsg,
  openDialog,
  setOpenDialog,
  showDialog,
}) => {
  const params = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);

  // Set list of email address for invitation
  const [peopleEmail, setPeopleEmail] = useState([]);

  const [instIDs, setInsIDs] = useState([]);

  const [repliersEmail, setRepliersEmail] = useState([]);

  const [myUsers, setMyUsers] = useState([]);
  const [repliersID, setRepliersID] = useState([]);
  const [loading, setLoading] = useState(false);

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

  React.useEffect(() => {
    fetchInstitutions();
    getInstitutionsID();
    getMyUsersID();
    fetchMyUsers();
  }, [selectedInstitutions, repliersEmail]);

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
      const res = await axios.get("public/institutions",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }});
      setInstitutions(res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyUsers = async () => {
    try {
      const res = await axios.get(`commenters-per-institution`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }});
      console.log("My users");
      console.log(res.data.data);
      setMyUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formikAcceptanceForm = useFormik({
    initialValues: {
      draft_id: params.id,
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
        draft_id: params.id,

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
    setLoading(true);
    return await axios
      .post(`approve-comment-opening`, requestData,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setLoading(false)
        setOpenDialog(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
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
              {loading && <LinearProgress size="small" color="info" />}
            </motion.span>
          </Grid>

          <form
            style={{ marginBottom: "30px" }}
            onSubmit={formikAcceptanceForm.handleSubmit}
          >
            <Typography variant="h5" fontWeight="600">
              Set draft opening and closing date
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
              // label="Draft Closing Date"
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
              label="Write a remark (not mandatory)"
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
              // helperText={formikAcceptanceForm.touched.acceptanceRemark && formikAcceptanceForm.errors.acceptanceRemark ? <span style={helperTextStyle}>{formikAcceptanceForm.errors.acceptanceRemark}</span>:null}
            />

            {/*    <Button 
                        variant="contained" color='secondary'
                        size='small'
                        type="submit"
                        sx={{ textTransform:"none" }}
                    >
                        <Typography variant="body2">
                            Accept and Open Document
                        </Typography>
                    </Button> */}
            <Typography variant="subtitle1" fontWeight="600">
              Assign Repliers
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Enter email addresses"
                  value={(option) => option}
                />
              )}
            />

            {/* </form>

            
            
            <form onSubmit={formikInviteInstitutionForm.handleSubmit} style={{ paddingBottom:"30px" }}> */}
            <Typography variant="subtitle1" fontWeight="600">
              Invite Institutions
            </Typography>
            {/* <Stack spacing={2} > */}
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Institutions"
                  placeholder="Institutions"
                  value={(option) => option.name}
                />
              )}
            />

            <TextField
              label="Write a remark (not mandatory)"
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
              // helperText={formik.touched.shortTitle && formik.errors.shortTitle ? <span style={helperTextStyle}>{formik.errors.shortTitle}</span>:null}
            />

            {/* </Stack> */}
            {/* </form>

        <form onSubmit={formikInvitePeopleForm.handleSubmit}> */}
            <Typography variant="subtitle1" fontWeight="600">
              Invite People
              {peopleEmail.length > 0
                ? peopleEmail.map((email) => <h3>{email}</h3>)
                : ""}
            </Typography>
            {/* <Stack spacing={2} sx={{ width: 500 }}> */}
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
                  variant="standard"
                  label="Enter email addresses"
                  value={(option) => option}
                />
              )}
            />

            <TextField
              label="Write a remark (not mandatory)"
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
                  Publish Draft for Comment
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
            <Typography variant="body2">Cancel</Typography>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default OutgoingCommentRequestsDialog;
