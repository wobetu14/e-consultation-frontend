
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { tokens } from "./theme";
import RefreshIcon from "@mui/icons-material/Refresh";

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
const LogoutProgressDialog = ({ 
    title, 
    text, 
    logout,
    logoutLoading, 
    setLogoutLoading, 
    networkError, 
    setNeworkError 
}) => {
  const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
const colors=tokens(theme.palette.mode)

  /**
   * Destructure translation object from useTranslation hook of i18next language library used for language translation
   */
  const { t } = useTranslation();
  return (
    <>
    {/**
     * Create Material UI dialog component UI, with {title} and {text} passed from the parent 
     * coponent "Logout.jsx". Read more about Material UI dialog how to create a dialog box
     */}
      <Dialog open={logoutLoading} onClose={() => setLogoutLoading(false)}>
        <DialogTitle>
        {
            networkError!==null ? (
              <>
                <Typography variant="h5">
                  Couldn't logout. &nbsp;
                  <Button
                    onClick={logout}
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                  Try again <RefreshIcon fontSize="small" />
                </Button>
                </Typography>
              </>
            ):(
              <Typography variant="h5">
                {title}... 
              </Typography>
            )
            }
         </DialogTitle>
      </Dialog>
    </>
  );
};

export default LogoutProgressDialog;
