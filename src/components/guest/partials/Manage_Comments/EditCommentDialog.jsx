import React, { useState } from "react";
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
  commentID,
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
  // const [commentText, setCommentText] = useState(commentID);

  const { t } = useTranslation();

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  const formik = useFormik({
    initialValues: {
      commentID: commentID,
      section_comment: commentText,
    },

    onSubmit: (values) => {
      const commentData = {
        commentID: values.commentID,
        section_comment: values.section_comment,
        _method: "put",
      };

      updateComment(commentData);
      fetchDocumentDetails();
      fetchDocumentSections();
      fetchDocumentComments();
    },
  });

  const updateComment = async (commentData) => {
    setNetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.post(`comments/${commentID}`, commentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      });
      setServerSuccessMsg(res.data.message);
      setServerErrorMsg(null);
      setOpenEditDialog(false);
      setNetworkError(null);
      setLoading(false);
      setAnchorEl(null);
    } catch (error) {
      setServerErrorMsg(error);
      setServerSuccessMsg(null);
      setNetworkError(error.code);
      setLoading(false);
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
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
                sx={{ paddingBottom: "30px" }}
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
          <DialogActions>
            <Button
              onClick={() => setOpenEditDialog(false)}
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="secondary"
              sx={{ color: colors.grey[300], textTransform: "none" }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditCommentDialog;
