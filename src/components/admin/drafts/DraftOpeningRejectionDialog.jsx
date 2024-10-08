import React, { useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { tokens } from "../../../theme";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

const DraftOpeningRejectionDialog = ({
  draftID,
  title,
  documentDetail,
  setDocumentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openRejectionDialog,
  setOpenRejectionDialog,
  showRejectionDialog,

  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  const { t } = useTranslation();

  const errorStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "18px",
  };

  const formikRejectionForm = useFormik({
    initialValues: {
      draft_id: documentDetail ? documentDetail.id : "",
      requestRejectionMessage: "",
    },

    onSubmit: (values) => {
      const requestData = {
        draft_id: draftID,
        request_rejection_message: values.requestRejectionMessage,
      };
      rejectCommentOpening(requestData);
    },
  });

  const rejectCommentOpening = async (requestData) => {
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setNetworkError(null);
    setLoading(true);
    return await axios
      .post(`request-rejection`, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        fetchDocumentDetails();
        fetchDocumentSections();
        fetchDocumentComments();

        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setNetworkError(null);
        setLoading(false);
        setOpenRejectionDialog(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setNetworkError(errors.name);
        setLoading(false);
        setOpenRejectionDialog(false);
      });
  };

  return (
    <>
      <Dialog open={openRejectionDialog} fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight="600">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
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
                  {t("network_error_message")}
                </Alert>
              ) : null}
            </Typography>

            {loading ? <LinearProgress size="small" color="info" /> : ""}
            <form
              style={{ marginBottom: "30px" }}
              onSubmit={formikRejectionForm.handleSubmit}
            >
              <Stack spacing={1}>
                <Typography variant="h5" fontWeight="600">
                  {t("reason_to_reject")}?
                </Typography>
                <TextField
                  label={`${t("please_write_reason_to_reject")}...`}
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  rows={4}
                  sx={{ paddingBottom: "10px" }}
                  color="info"
                  name="requestRejectionMessage"
                  value={formikRejectionForm.values.requestRejectionMessage}
                  onBlur={formikRejectionForm.handleBlur}
                  onChange={formikRejectionForm.handleChange}
                  // helperText={formikRejectionForm.touched.reasonForRejection && formikRejectionForm.errors.reasonForRejection ? <span style={helperTextStyle}>{formikRejectionForm.errors.reasonForRejection}</span>:null}
                />

                <Box>
                  <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    type="submit"
                    sx={{
                      textTransform: "none",
                      marginRight: "5px",
                      backgroundColor: colors.dangerColor[200],
                      color: colors.grey[300],
                    }}
                  >
                    <Typography variant="body2">
                      {t("reject_this_request")}
                    </Typography>
                  </Button>
                </Box>
              </Stack>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenRejectionDialog(false)}
            variant="outlined"
            size="small"
            color="info"
            sx={{ textTransform: "none" }}
          >
            <Typography variant="body2">{t("cancel")}</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DraftOpeningRejectionDialog;
