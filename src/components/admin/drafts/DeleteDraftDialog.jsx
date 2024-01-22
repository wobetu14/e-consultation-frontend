import React, { useContext } from "react";
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

import { DraftsDataContext } from "../../../contexts/DraftsDataContext";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";

/**
 * This is a dialog box component used to delete a selected draft data. It is the child component of 
 * DraftsTable component and it is triggered when delete button available at the end of each row of 
 * the draft data is clicked. Important data will be passed as props as well as context data to this 
 * component. "title" and "text" are passed as props from the parent component "DraftsTable" and "drafts" 
 * data passed from from DraftsDataContext context component
 */

/**
 * Create a functional component named "DeleteDraftDialog"
 */
const DeleteDraftDialog = ({ title, text }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /**
   * Destructure translation object from useTranslation hook of i18next language library used for language translation
   */
  const { t } = useTranslation();
  /**
   * Destructure values from DraftsDataContext to access data and methods related to 
   * "draft, openDialog, setOpenDialog, deleteDraft"
   */
  const { draft, openDialog, setOpenDialog, deleteDraft } =
    useContext(DraftsDataContext);
  return (
    <>
    {/**
     * Create Material UI dialog component UI, with {title} and {text} passed from the parent 
     * coponent "DraftsTable" and with two buttons "Delete" and "Cancel" to confirm delete 
     * or to cancel deletion. Read more about Material UI dialog how to create a dialog box
     */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ textTransform: "none" }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => deleteDraft(draft.id)}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: colors.dangerColor[200],
              color: colors.grey[300],
              textTransform: "none",
            }}
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDraftDialog;
