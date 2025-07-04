import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../../theme";
import axios from "../../../../axios/AxiosGlobal";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

const EditCommentDialog = ({
  title,
  commentText,
  commentID, // Using commentID from props
  openEditDialog,
  setOpenEditDialog,
  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
  serverErrorMsg,
  serverSuccessMsg,
  networkError,
  loading,
  networkErrorMessag,
  setServerErrorMsg,
  setServerSuccessMsg,
  setNetworkError,
  setLoading,
  setNetworkErrorMessage,
  setAnchorEl,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  const htmlToText = (html) => {
    if (!html) return "";
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value.replace(/<br\s*\/?>/gi, "\n");
  };

  const textToHtml = (text) => {
    if (!text) return "";
    return text
      .replace(/\n/g, "<br />")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const formik = useFormik({
    initialValues: {
      // No need to store commentID in form values since we're using it from props
      section_comment: htmlToText(commentText),
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setNetworkError(null);
      setServerErrorMsg(null);
      setServerSuccessMsg(null);
      setLoading(true);

      try {
        const commentData = {
          section_comment: textToHtml(values.section_comment),
          _method: "put",
        };

        // Using commentID from props in the API call
        const res = await axios.post(`comments/${commentID}`, commentData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data",
          },
        });

        setServerSuccessMsg(res.data.message);
        setOpenEditDialog(false);

        // Refresh data
        fetchDocumentDetails();
        fetchDocumentSections();
        fetchDocumentComments();

        if (setAnchorEl) setAnchorEl(null);
      } catch (error) {
        setServerErrorMsg(error.response?.data?.message || error.message);
        setNetworkError(error.code);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (openEditDialog) {
      formik.resetForm({
        values: {
          section_comment: htmlToText(commentText),
        },
      });
    }
  }, [openEditDialog, commentText]);

  return (
    <Dialog
      open={openEditDialog}
      onClose={() => setOpenEditDialog(false)}
      fullWidth
      maxWidth="md"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography variant="h5" fontWeight="600">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              multiline
              variant="outlined"
              size="small"
              fullWidth
              minRows={6}
              sx={{ paddingBottom: "30px", mt: 2 }}
              color="info"
              name="section_comment"
              value={formik.values.section_comment}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              helperText={
                formik.touched.section_comment &&
                formik.errors.section_comment ? (
                  <span style={helperTextStyle}>
                    {formik.errors.section_comment}
                  </span>
                ) : null
              }
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenEditDialog(false)}
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ textTransform: "none" }}
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="secondary"
            disabled={loading}
            sx={{
              color: colors.grey[300],
              textTransform: "none",
              minWidth: 100,
            }}
          >
            {loading ? "Saving..." : t("save_changes")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditCommentDialog;
