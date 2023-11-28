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
import { RegionsDataContext } from "../../../contexts/RegionsDataContext";
import { useTranslation } from "react-i18next";

const DeleteRegionDialog = ({ title, text }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  // RegionsDataContext
  const { region, openDialog, setOpenDialog, deleteRegion } =
    useContext(RegionsDataContext);
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
            {t("cancel")}
          </Button>
          <Button
            onClick={() => deleteRegion(region.id)}
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

export default DeleteRegionDialog;
