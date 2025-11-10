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

  // === Styles ===
  const errorStyle = { color: "red", fontWeight: 400, fontSize: "18px" };
  const successStyle = { color: "green", fontWeight: 400, fontSize: "18px" };

  // === Custom Styles for DataTable (wrap text + responsive) ===
  const customStyles = {
    tableWrapper: {
      style: {
        display: "block",
        width: "100%",
        overflowX: "auto", // enable horizontal scroll on small screens
      },
    },
    cells: {
      style: {
        whiteSpace: "normal", // wrap text
        wordBreak: "break-word",
        lineHeight: "1.5em",
        paddingTop: "8px",
        paddingBottom: "8px",
      },
    },
    headCells: {
      style: {
        whiteSpace: "normal",
        wordBreak: "break-word",
        fontWeight: "600",
        fontSize: "14px",
      },
    },
  };

  // === UI Logic ===
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

  // === Table Columns ===
  const columns = [
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("institution")}
        </Typography>
      ),
      selector: (row) => row.name || "",
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("institution_type")}
        </Typography>
      ),
      selector: (row) => row.institution_type?.name || "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("email_address")}
        </Typography>
      ),
      selector: (row) => row.email || "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("telephone")}
        </Typography>
      ),
      selector: (row) => row.telephone || "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("address")}
        </Typography>
      ),
      selector: (row) => row.address || "",
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("region")}
        </Typography>
      ),
      selector: (row) => row.region?.name || "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("actions")}
        </Typography>
      ),
      cell: (row) => (
        <Stack spacing={0} direction="row">
          <Button
            variant="text"
            size="small"
            color="secondary"
            sx={{ textTransform: "none" }}
            onClick={() => showEditInstitutionForm(row)}
          >
            <ModeEditIcon fontSize="small" color="secondary" />
          </Button>
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => deleteInstitutionDialog(row)}
            disabled
          >
            <DeleteIcon
              fontSize="small"
              sx={{ color: colors.dangerColor[200] }}
            />
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "auto",
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      {/* Header */}
      <Header
        title={t("institutions_info")}
        subtitle={t("manage_institutions")}
      />

      {/* Alerts + Progress */}
      <Grid align="center" sx={{ pb: 1, pt: 1 }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {serverSuccessMsg && (
            <Alert severity="success" style={successStyle}>
              {serverSuccessMsg}
            </Alert>
          )}
          {serverErrorMsg && (
            <Alert severity="error" style={errorStyle}>
              {serverErrorMsg}
            </Alert>
          )}
          {networkError === "ERR_NETWORK" && (
            <Alert severity="error" variant="outlined">
              {t("network_error_message")}
            </Alert>
          )}
          {loading && <LinearProgress size="small" color="info" />}
        </motion.span>
      </Grid>

      {/* Delete Dialog */}
      {openDialog && (
        <DeleteInstitutionDialog
          title="Deleting Institution..."
          text={`You are about to delete institution "${
            institution?.name || ""
          }". Are you sure?`}
        />
      )}

      {/* Create/Edit Forms */}
      {showInstitutionAddForm && <CreateInstitution />}
      {showInstitutionEditForm && <EditInstitution />}

      {/* Data Table */}
      <Paper
        elevation={1}
        sx={{
          mt: 2,
          mb: 10,
          width: "100%",
          overflowX: "auto",
        }}
      >
        <DataTable
          columns={columns}
          data={filteredInstitutions}
          progressPending={filteredInstitutions.length <= 0}
          highlightOnHover
          pointerOnHover
          pagination
          customStyles={customStyles}
          responsive
          progressComponent={
            <Box mb="20px">
              {requestCompleted === 1 &&
              filteredInstitutions.length <= 0 &&
              networkErrorMessage !== "AxiosError" ? (
                `${t("no_record")}`
              ) : networkErrorMessage === "AxiosError" ? (
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
              ) : (
                `${t("please_wait")}`
              )}
            </Box>
          }
          selectableRowsHighlight
          subHeader
          subHeaderComponent={
            <Box
              width="100%"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                gap: 2,
              }}
            >
              <Box width={{ xs: "100%", sm: "40%", md: "30%" }}>
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
              <Box textAlign={{ xs: "center", sm: "right" }}>
                {showInstitutionAddForm || showInstitutionEditForm ? (
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
