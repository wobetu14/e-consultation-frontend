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
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DraftsDataContext } from "../../../contexts/DraftsDataContext";
import CreateDraft from "../drafts/CreateDraft";
import EditDraft from "../drafts/EditDraft";
import DeleteDraftDialog from "../drafts/DeleteDraftDialog";
import { rootURL } from "../../../axios/AxiosGlobal";
import Header from "../AdminHeader";

const DraftsTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const {
    fetchDrafts,
    filteredDrafts,
    searchDraft,
    setSearchDraft,
    draft,
    setDraft,
    showDraftAddForm,
    setShowDraftAddForm,
    showDraftEditForm,
    setShowDraftEditForm,
    serverErrorMsg,
    serverSuccessMsg,
    openDialog,
    setOpenDialog,
    loading,
    requestCompleted,
    networkErrorMessage,
    networkError,
  } = useContext(DraftsDataContext);

  // === Styles ===
  const errorStyle = { color: "red", fontWeight: 400, fontSize: "18px" };
  const successStyle = { color: "green", fontWeight: 400, fontSize: "18px" };

  // === Custom Styles for DataTable ===
  const customStyles = {
    tableWrapper: {
      style: {
        display: "block",
        width: "100%",
        overflowX: "auto",
      },
    },
    cells: {
      style: {
        whiteSpace: "normal",
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
        fontWeight: "700",
        fontSize: "16px",
      },
    },
  };

  // === UI Logic ===
  const showAddDraftForm = () => {
    setShowDraftAddForm(!showDraftAddForm);
    setShowDraftEditForm(false);
  };

  const showEditDraftForm = (row) => {
    setDraft(row);
    setShowDraftEditForm(true);
    setShowDraftAddForm(false);
  };

  const hideForm = () => {
    setShowDraftEditForm(false);
    setShowDraftAddForm(false);
  };

  const deleteDraftDialog = (draftRow) => {
    setDraft(draftRow);
    setOpenDialog(true);
  };

  const handleNetworkStatus = () => {
    fetchDrafts();
  };

  // === Table Columns ===
  const columns = [
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("title")}
        </Typography>
      ),
      selector: (row) => row.short_title || "",
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("owning_institution")}
        </Typography>
      ),
      selector: (row) => (row.institution ? row.institution.name : ""),
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("created_by")}
        </Typography>
      ),
      selector: (row) =>
        row.uploader
          ? `${row.uploader.first_name || ""} ${row.uploader.last_name || ""}`
          : "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("download_file")}
        </Typography>
      ),
      cell: (row) =>
        row.file ? (
          <a href={row.file} target="_blank" rel="noreferrer">
            <Typography variant="body1" color="primary">
              {t("download")}
            </Typography>
          </a>
        ) : (
          ""
        ),
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("download_comment_reports")}
        </Typography>
      ),
      cell: (row) =>
        row.draft_status?.name === "Closed" ? (
          <a
            href={`${rootURL}report/${row.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Typography variant="body1" color="primary">
              {t("download")}
            </Typography>
          </a>
        ) : (
          ""
        ),
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
            onClick={() => showEditDraftForm(row)}
          >
            <ModeEditIcon fontSize="small" color="secondary" />
          </Button>
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => deleteDraftDialog(row)}
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
      <Header title={t("drafts")} subtitle={t("manage_drafts")} />

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
        <DeleteDraftDialog
          title={`${t("deleting_draft_document")}...`}
          text={`${t("you_are_deleting_draft")} "${
            draft ? draft.short_title : ""
          }". ${t("are_you_sure")}`}
        />
      )}

      {/* Create/Edit Forms */}
      {showDraftAddForm && <CreateDraft />}
      {showDraftEditForm && <EditDraft />}

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
          data={filteredDrafts}
          progressPending={filteredDrafts.length <= 0}
          highlightOnHover
          pointerOnHover
          pagination
          customStyles={customStyles}
          responsive
          progressComponent={
            <Box mb="20px">
              {requestCompleted === 1 &&
              filteredDrafts.length <= 0 &&
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
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                />
              </Box>
              <Box textAlign={{ xs: "center", sm: "right" }}>
                {showDraftAddForm || showDraftEditForm ? (
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
                    onClick={showAddDraftForm}
                  >
                    <AddIcon /> {t("add_new_draft")}
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

export default DraftsTable;
