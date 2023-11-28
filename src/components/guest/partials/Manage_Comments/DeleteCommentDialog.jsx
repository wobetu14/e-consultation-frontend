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

const DeleteCommentDialog = ({
  title,
  text,
  commentID,
  openDeleteDialog,
  setOpenDeleteDialog,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
