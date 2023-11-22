import React, { useEffect, useState } from "react";
import axios from "../../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
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

import { Formik, useFormik } from "formik";
import { tokens } from "../../../../theme";
import { useTranslation } from "react-i18next";

const AcceptExternalRequestDialog = ({
  requestID,
  requestTitle,
  incomingCommentRequests,
  // requestDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openExternalAcceptanceDialog,
  setOpenExternalAcceptanceDialog,
  title = "Accept draft and assign expert to comment",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [repliersEmail, setRepliersEmail] = useState([]);
  const [myUsers, setMyUsers] = useState([]);
  const [repliersID, setRepliersID] = useState([]);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError]=useState(null);

  const {t}=useTranslation();

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


  const closeDialog=()=>{
    setOpenExternalAcceptanceDialog(false);
  }

  React.useEffect(() => {
    getMyUsersID();
  }, [repliersEmail]);

  useEffect(()=>{
    fetchMyUsers();
  }, [])

  const getMyUsersID = () => {
    if (repliersEmail.length > 0) {
      repliersEmail.map((replier) =>
        setRepliersID([...repliersID, replier.id])
      );
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
      
      setMyUsers(res.data.data);
    } catch (error) {
      
    }
  };

  const formikAcceptanceForm = useFormik({
    initialValues: {
      commentRequestID: requestID,
      acceptanceMessage: "Dear Sir / Madam, We have just accept these request.",
      commenters: [],
    },

    onSubmit: (values) => {
      const acceptanceData = {
        comment_request_id: values.commentRequestID,
        message: values.acceptanceMessage,
        commenters:
          repliersID.length > 0 ? repliersID.map((replierID) => replierID) : [],
      };

      assignRepliers(acceptanceData);
    },
  });

  const assignRepliers = async (acceptanceData) => {
    setServerSuccessMsg(null);
    setServerErrorMsg(null);
    setNetworkError(null);
    setLoading(true);
    return await axios
      .post(`assign-commenters`, acceptanceData, 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        incomingCommentRequests();
        setServerErrorMsg(null);
        setNetworkError(null)
        setOpenExternalAcceptanceDialog(false);
        formikAcceptanceForm.resetForm();
        setLoading(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setNetworkError(null);
        // setOpenExternalAcceptanceDialog(false)
      });
  };


  return (
    <Dialog key={requestID} open={openExternalAcceptanceDialog} fullWidth>
      <DialogTitle>
        <Typography variant="h5" fontWeight="600">
          {title} ( {requestTitle} )
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
                {networkError ? (
                  <Alert severity="success" style={successStyle}>
                    {t('network_error_message')}
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
              {loading ? <LinearProgress size="small" color="info" /> : ""}
            </motion.span>
          </Grid>

          <form
            style={{ marginBottom: "30px" }}
            onSubmit={formikAcceptanceForm.handleSubmit}
          >
            <TextField
              label={`${t('write_acceptance_message')} (${t('not_mandatory')})`}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              sx={{ paddingBottom: "10px" }}
              color="info"
              name="acceptanceMessage"
              value={formikAcceptanceForm.values.acceptanceMessage}
              onBlur={formikAcceptanceForm.handleBlur}
              onChange={formikAcceptanceForm.handleChange}
            />

            <Typography variant="subtitle1" fontWeight="600">
              {t('assign_commenters')}
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
                  label={t('select_commenters')}
                  color="info"
                  value={(option) => option}
                />
              )}
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
                  color: colors[300],
                }}
              >
                <Typography variant="body2">{`${t('accept')} ${t('and')} ${t('close')}`}</Typography>
              </Button>
            </Box>
          </form>
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={closeDialog}
            variant="outlined"
            size="small"
            color="secondary"
            sx={{ textTransform: "none" }}
          >
            <Typography variant="body2">{t('cancel')}</Typography>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptExternalRequestDialog;