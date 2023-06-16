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

import { tokens } from "../../../theme";
import { SectorsDataContext } from "../../../contexts/SectorsDataContext";

const DeleteSectorDialog = ({ title, text }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // SectorsDataContext
  const {
    sector,
    openDialog,
    setOpenDialog,
    deleteSector,
  } = useContext(SectorsDataContext);
  return (
    <>
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
            Cancel
          </Button>
          <Button
            onClick={() => deleteSector(sector.id)}
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

export default DeleteSectorDialog;