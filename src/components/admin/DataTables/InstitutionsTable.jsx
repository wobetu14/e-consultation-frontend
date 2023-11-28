import {
  Alert,
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import { Stack } from "@mui/system";
import { tokens } from "../../../theme";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Header from "../AdminHeader";
import { motion } from "framer-motion";
import { InstitutionsDataContext } from "../../../contexts/InstitutionsDataContext";
import CreateInstitution from "../institutions/CreateInstitution";
import EditInstitution from "../institutions/EditInstitution";
import DeleteInstitutionDialog from "../institutions/DeleteInstitutionDialog";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";

const InstitutionsTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();
  const {
    filteredInstitutions,
    searchInstitution,
    setSearchInstitution,
    institution,
    setInstitution,
    showInstitutionAddForm,
    setShowInstitutionAddForm,
    showInstitutionEditForm,
    setShowInstitutionEditForm,
    serverErrorMsg,
    serverSuccessMsg,
    openDialog,
    setOpenDialog,
    loading,
    requestCompleted,
    networkErrorMessage,
    fetchInstitutions,
    networkError,
  } = useContext(InstitutionsDataContext);

  const errorStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "18px",
  };

  const successStyle = {
    color: "green",
    fontWeight: "400",
    fontSize: "18px",
  };

  // Show / Hide Add User Form
  const showAddInstitutionForm = () => {
    setShowInstitutionAddForm(!showInstitutionAddForm);
    setShowInstitutionEditForm(false);
  };

  const showEditInstitutionForm = (institutionRow) => {
    setInstitution(institutionRow);
    setShowInstitutionEditForm(true);
    setShowInstitutionAddForm(false);
  };

  const hideForm = () => {
    setShowInstitutionEditForm(false);
    setShowInstitutionAddForm(false);
  };

  const deleteInstitutionDialog = (institutionRow) => {
    setInstitution(institutionRow);
    setOpenDialog(true);
  };

  const handleNetworkStatus = () => {
    fetchInstitutions();
  };

  const columns = [
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("institution")}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">{`${row.name ? row.name : ""}`}</Typography>
      ),
      sortable: true,
    },

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("institution_type")}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">{`${row.institution_type.name}`}</Typography>
      ),
      sortable: true,
    },

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("email_address")}
        </Typography>
      ),
      selector: (row) => <Typography variant="body1">{row.email}</Typography>,
      sortable: true,
    },
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("telephone")}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">{row.telephone}</Typography>
      ),
      sortable: true,
    },
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("address")}
        </Typography>
      ),
      selector: (row) => <Typography variant="body1">{row.address}</Typography>,
      sortable: true,
    },

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("region")}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">
          {row.region ? row.region.name : ""}
        </Typography>
      ),
      sortable: true,
    },
    /* {
      name: (
        <Typography variant="h5" fontWeight="600">
          Created By
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">{row.creator.name}</Typography>
      ),
      sortable: true,
    }, */

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("actions")}
        </Typography>
      ),
      selector: (row) => {
        return (
          <Stack spacing={0} direction="row">
            <Button
              variant="Link"
              size="small"
              color="secondary"
              sx={{ textTransform: "none" }}
              key={row.id}
              onClick={() => showEditInstitutionForm(row)}
            >
              <ModeEditIcon fontSize="small" color="secondary" />
            </Button>
            <Button
              variant="Link"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => deleteInstitutionDialog(row)}
            >
              <DeleteIcon
                fontSize="small"
                sx={{ color: colors.dangerColor[200] }}
              />
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        width: {
          xs: 300,
          sm: 500,
          md: 700,
          lg: 900,
          xl: 1200,
        },
      }}
    >
      <Header
        title={t("institutions_info")}
        subtitle={t("manage_institutions")}
      />
      <Grid align="center" sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h1">
            {serverSuccessMsg ? (
              <Alert severity="success" style={successStyle}>
                {serverSuccessMsg}
              </Alert>
            ) : null}
          </Typography>

          <Typography variant="h1">
            {serverErrorMsg ? (
              <Alert severity="error" style={errorStyle}>
                {serverErrorMsg}
              </Alert>
            ) : null}
          </Typography>

          <Typography variant="h1">
            {networkError === "ERR_NETWORK" ? (
              <Alert severity="error" variant="outlined">
                {t("network_error_message")}
              </Alert>
            ) : null}
          </Typography>

          {loading ? <LinearProgress size="small" color="info" /> : null}
        </motion.span>
      </Grid>

      {openDialog && (
        <DeleteInstitutionDialog
          title="Deleting Institution..."
          text={`You are about to delete institution "${
            institution ? institution.name : ""
          }". Are you sure?`}
        />
      )}
      {showInstitutionAddForm && <CreateInstitution />}
      {showInstitutionEditForm && <EditInstitution />}

      <Paper
        elevation={1}
        sx={{ marginTop: "10px", marginBottom: "350px", maxWidth: "1200px" }}
      >
        <DataTable
          columns={columns}
          data={filteredInstitutions}
          progressPending={filteredInstitutions.length <= 0}
          highlightOnHover
          pointerOnHover
          progressComponent={
            <Box mb="20px">
              {/* Display progress bar if the data prop value is empty */}
              {requestCompleted === 1 &&
              filteredInstitutions.length <= 0 &&
              networkErrorMessage !== "AxiosError" ? (
                `${t("no_record")}`
              ) : networkErrorMessage === "AxiosError" ? (
                <>
                  <Typography variant="body1">
                    {t("network_error_message")} &nbsp;
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ textTransform: "none" }}
                      onClick={handleNetworkStatus}
                    >
                      {t("try_again")} <RefreshIcon />
                    </Button>
                  </Typography>
                </>
              ) : (
                `${t("please_wait")}`
              )}
            </Box>
          }
          pagination
          selectableRowsHighlight
          subHeader
          subHeaderComponent={
            <Box
              width="100%"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                direction: "row",
              }}
            >
              <Box width="30%">
                <TextField
                  label={`${t("search")}...`}
                  variant="outlined"
                  size="small"
                  color="info"
                  fullWidth
                  value={searchInstitution}
                  onChange={(e) => setSearchInstitution(e.target.value)}
                />
              </Box>
              <Box>
                {showInstitutionAddForm ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={hideForm}
                  >
                    <VisibilityOffIcon /> {t("hide_form")}
                  </Button>
                ) : showInstitutionEditForm ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={hideForm}
                  >
                    <VisibilityOffIcon /> {t("hide_form")}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={showAddInstitutionForm}
                  >
                    <AddIcon /> {t("add_new_institution")}
                  </Button>
                )}
              </Box>
            </Box>
          }
        />
      </Paper>
    </Box>
  );
};
export default InstitutionsTable;
