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
import CreateUser from "../users/CreateUser";
import EditUser from "../users/EditUser";
import { UsersDataContext } from "../../../contexts/UsersDataContext";
import { motion } from "framer-motion";
import DeleteUserDialog from "../../../partials/DeleteUserDialog";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";

const UsersTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const {
    user,
    setUser,
    users,
    fetchUsers,
    filteredUsers,
    searchUser,
    setSearchUser,
    showUserAddForm,
    setShowUserAddForm,
    showUserEditForm,
    setShowUserEditForm,
    serverErrorMsg,
    serverSuccessMsg,
    openDialog,
    setOpenDialog,
    loading,
    requestCompleted,
    networkErrorMessage,
    networkError,
  } = useContext(UsersDataContext);

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
  const showAddUserForm = () => {
    setShowUserAddForm(!showUserAddForm);
    setShowUserEditForm(false);
  };

  const showEditUserForm = (userRow) => {
    setUser(userRow);
    setShowUserEditForm(true);
    setShowUserAddForm(false);
  };

  const hideForm = () => {
    setShowUserEditForm(false);
    setShowUserAddForm(false);
  };

  const deleteUserDialog = (userRow) => {
    setUser(userRow);
    setOpenDialog(true);
  };

  const handleNetworkStatus = () => {
    fetchUsers();
  };

  // === Table Columns ===
  const columns = [
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("full_name")}
        </Typography>
      ),
      selector: (row) => `${row.first_name} ${row.middle_name}` || "",
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("mobile")}
        </Typography>
      ),
      selector: (row) => row.mobile_number || "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("institution")}
        </Typography>
      ),
      selector: (row) => row.institution || "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("region")}
        </Typography>
      ),
      selector: (row) => row.region || "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("created_by")}
        </Typography>
      ),
      selector: (row) => row.created_by || "",
      sortable: true,
      wrap: true,
    },
    {
      name: (
        <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
          {t("role")}
        </Typography>
      ),
      cell: (row) =>
        row.roles.map((role) => (
          <li key={role.id} style={{ listStyleType: "none" }}>
            <Typography variant="body1">{role.name}</Typography>
          </li>
        )),
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
            onClick={() => showEditUserForm(row)}
          >
            <ModeEditIcon fontSize="small" color="secondary" />
          </Button>
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => deleteUserDialog(row)}
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
      <Header title={t("users")} subtitle={t("manage_users")} />

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
        <DeleteUserDialog
          title={`${t("deleting_user")}...`}
          text={`${t("you_are_deleting_user")} ${
            user ? `${user.first_name} ${user.middle_name}` : ""
          }. ${t("are_you_sure")}`}
        />
      )}

      {/* Create/Edit Forms */}
      {showUserAddForm && <CreateUser />}
      {showUserEditForm && <EditUser />}

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
          data={filteredUsers}
          progressPending={users.length <= 0}
          highlightOnHover
          pointerOnHover
          pagination
          customStyles={customStyles}
          responsive
          progressComponent={
            <Box mb="20px">
              {requestCompleted === 1 &&
              filteredUsers.length <= 0 &&
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
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </Box>
              <Box textAlign={{ xs: "center", sm: "right" }}>
                {showUserAddForm || showUserEditForm ? (
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
                    onClick={showAddUserForm}
                  >
                    <AddIcon /> {t("add_new_user")}
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

export default UsersTable;
