import React, { useEffect, useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
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

const ExtendDeadlineDialog = ({
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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const { t } = useTranslation();

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

  const formikUpdateClosingForm = useFormik({
    initialValues: {
      draft_id: draftID,
      draftClosingDate: "",
    },

    onSubmit: (values) => {
      const requestData = {
        draft_id: draftID,
          comment_closing_date: values.draftClosingDate,
        _method:"put"
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
      .post(`dead-line-extension/${draftID}`, requestData, {
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
          fullWidth
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
            onSubmit={formikUpdateClosingForm.handleSubmit}
          >
            <Typography variant="subtitle1" fontWeight="500">
              Set new closing date
            </Typography>

            <TextField
              type="datetime-local"
              variant="outlined"
              size="small"
              fullWidth
              rows={4}
              sx={{ paddingBottom: "10px" }}
              color="info"
              name="draftClosingDate"
              value={formikUpdateClosingForm.values.draftClosingDate}
              onBlur={formikUpdateClosingForm.handleBlur}
              onChange={formikUpdateClosingForm.handleChange}
              helperText={
                formikUpdateClosingForm.touched.draftClosingDate &&
                formikUpdateClosingForm.errors.draftClosingDate ? (
                  <span style={helperTextStyle}>
                    {formikUpdateClosingForm.errors.draftClosingDate}
                  </span>
                ) : null
              }
            />

            <Box>
              <Button
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
                <Typography variant="body2">Save changes</Typography>
              </Button>
            </Box>
          </form>
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
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

export default ExtendDeadlineDialog;
