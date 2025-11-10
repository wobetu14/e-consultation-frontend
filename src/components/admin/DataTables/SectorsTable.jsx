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
import { motion } from "framer-motion";
import CreateSector from "../sectors/CreateSector";
import EditSector from "../sectors/EditSector";
import { SectorsDataContext } from "../../../contexts/SectorsDataContext";
import DeleteSectorDialog from "../sectors/DeleteSectorDialog";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";

const SectorsTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const {
    filteredSectors,
    searchSector,
    setSearchSector,
    sector,
    setSector,
    showSectorAddForm,
    setShowSectorAddForm,
    showSectorEditForm,
    setShowSectorEditForm,
    serverErrorMsg,
    serverSuccessMsg,
    openDialog,
    setOpenDialog,
    loading,
    requestCompleted,
    networkErrorMessage,
    fetchSectors,
    networkError,
  } = useContext(SectorsDataContext);

  const errorStyle = { color: "red", fontWeight: 400, fontSize: "18px" };
  const successStyle = { color: "green", fontWeight: 400, fontSize: "18px" };

  // === Custom DataTable Styles ===
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
  const showAddSectorForm = () => {
    setShowSectorAddForm(!showSectorAddForm);
    setShowSectorEditForm(false);
  };

  const showEditSectorForm = (sectorRow) => {
    setSector(sectorRow);
    setShowSectorEditForm(true);
    setShowSectorAddForm(false);
  };

  const hideForm = () => {
    setShowSectorEditForm(false);
    setShowSectorAddForm(false);
  };

  const deleteSectorDialog = (sectorRow) => {
    setSector(sectorRow);
    setOpenDialog(true);
  };

  const handleNetworkStatus = () => {
    fetchSectors();
  };

  // === Columns ===
  const columns = [
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("sector_name")}
        </Typography>
      ),
      selector: (row) => row.name || "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("description")}
        </Typography>
      ),
      selector: (row) => (row.description ? row.description.substr(0, 50) : ""),
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
        row.creator
          ? `${row.creator.first_name} ${row.creator.middle_name}`
          : "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("region")}
        </Typography>
      ),
      selector: (row) => row.region_id || "",
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
            onClick={() => showEditSectorForm(row)}
          >
            <ModeEditIcon fontSize="small" color="secondary" />
          </Button>
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => deleteSectorDialog(row)}
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
      {/* Alerts */}
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

      {/* Dialog */}
      {openDialog && (
        <DeleteSectorDialog
          title={`${t("deleting_sector_info")}...`}
          text={`${t("you_are_deleting_sector")} ${
            sector ? sector.name : ""
          }. ${t("are_you_sure")}`}
        />
      )}

      {/* Forms */}
      {showSectorAddForm && <CreateSector />}
      {showSectorEditForm && <EditSector />}

      {/* Table */}
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
          data={filteredSectors}
          progressPending={filteredSectors.length <= 0}
          highlightOnHover
          pointerOnHover
          pagination
          customStyles={customStyles}
          responsive
          progressComponent={
            <Box mb="20px">
              {requestCompleted === 1 &&
              filteredSectors.length <= 0 &&
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
                `${t("please_wait")}...`
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
                  value={searchSector}
                  onChange={(e) => setSearchSector(e.target.value)}
                />
              </Box>
              <Box textAlign={{ xs: "center", sm: "right" }}>
                {showSectorAddForm || showSectorEditForm ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={hideForm}
                  >
                    <VisibilityOffIcon fontSize="small" /> {t("hide_form")}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={showAddSectorForm}
                  >
                    <AddIcon fontSize="small" /> {t("add_new_sector")}
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

export default SectorsTable;
