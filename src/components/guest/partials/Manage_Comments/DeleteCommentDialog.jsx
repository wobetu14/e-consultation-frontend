import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../../theme";
import { useState } from "react";
import axios from '../../../../axios/AxiosGlobal';

const DeleteCommentDialog = ({
  title,
  text,
  commentID,
  openDeleteDialog,
  setOpenDeleteDialog,

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
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const deleteComment = async (commentID) => {
    setNetworkError(null);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setLoading(true);
    return await axios
      .delete(`comments/${commentID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setNetworkError(null);
        setLoading(false);
        setOpenDeleteDialog(false);

        fetchDocumentDetails();
        fetchDocumentSections();
        fetchDocumentComments();
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setNetworkError(errors.code);
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="600">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1">{text}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteComment(commentID)}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: colors.dangerColor[200],
              color: colors.grey[300],
              textTransform: "none",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteCommentDialog;
