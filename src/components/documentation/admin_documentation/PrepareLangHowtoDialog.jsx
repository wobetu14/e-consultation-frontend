import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useTheme,
  DialogActions,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import SetupLanguageGuide from "./SetupLanguageGuide";


const PrepareLangHowtoDialog = ({
    showHowtoDialog,
    setShowHowtoDialog
}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {t}=useTranslation();

  return (
    <Dialog
      fullWidth
      open={showHowtoDialog}
      maxWidth='lg'
    >
      <DialogTitle sx={{ backgroundColor:colors.primary[300], color:colors.grey[300] }}>
        <Typography variant="h4" fontWeight="600">
          How to Prepare and Setup Language
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
            <SetupLanguageGuide />
        </DialogContentText>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "none", backgroundColor:colors.successColor[200] }}
            onClick={()=>setShowHowtoDialog(false)}
          >
            <Typography variant="body2">{t('ok_got_it')}</Typography>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default PrepareLangHowtoDialog;
