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
import CheckIcon from "@mui/icons-material/Check";
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
  const showAddUserForm = (msg) => {
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

  const columns = [
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("full_name")}
        </Typography>
      ),
      selector: (row) => (
        <Typography
          variant="body1"
          key={row.id}
        >{`${row.first_name} ${row.middle_name}`}</Typography>
      ),
      sortable: true,
    },

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("mobile")}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1" key={row.id}>
          {row.mobile_number}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("institution")}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1" key={row.id}>
          {row.institution ? row.institution : ""}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("region")}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1" key={row.id}>
          {row.region ? row.region : ""}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("created_by")}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1" key={row.id}>
          {row.created_by}
        </Typography>
      ),
      sortable: true,
    },

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t("role")}
        </Typography>
      ),
      selector: (row) =>
        row.roles.map((role) => (
          <li style={{ listStyleType: "none" }} key={role.id}>
            <Typography variant="body1">{role.name}</Typography>
          </li>
        )),
    },
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
              onClick={() => showEditUserForm(row)}
            >
              <ModeEditIcon fontSize="small" color="secondary" />
            </Button>
            <Button
              variant="Link"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => deleteUserDialog(row)}
              disabled={true}
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
      m="0 20px"
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
      <Header title={t("users")} subtitle={t("manage_users")} />

      <Grid align="center" sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="body1">
            {serverSuccessMsg ? (
              <Alert
                icon={<CheckIcon fontSize="inherit" />}
                severity="success"
                style={successStyle}
              >
                {serverSuccessMsg}
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

          <Typography variant="h1">
            {serverErrorMsg ? (
              <Alert severity="error" style={errorStyle}>
                {serverErrorMsg}
              </Alert>
            ) : null}
          </Typography>

          {loading ? <LinearProgress size="small" color="info" /> : null}
        </motion.span>
      </Grid>
      {openDialog && (
        <DeleteUserDialog
          title={`${t("deleting_user")}...`}
          text={`${t("you_are_deleting_user")} ${
            user ? user.first_name + " " + user.middle_name : ""
          }. ${t("are_you_sure")}`}
        />
      )}

      {showUserAddForm && <CreateUser />}
      {showUserEditForm && <EditUser />}

      <Paper elevation={1} sx={{ marginTop: "10px", marginBottom: "350px" }}>
        <DataTable
          columns={columns}
          data={filteredUsers}
          progressPending={users.length <= 0}
          highlightOnHover
          pointerOnHover
          progressComponent={
            <Box mb="20px">
              {/* Display progress bar if the data prop value is empty */}
              {requestCompleted === 1 &&
              filteredUsers.length <= 0 &&
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
                `${t("please_wait")}...`
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
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </Box>
              <Box>
                {showUserAddForm ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={hideForm}
                  >
                    <VisibilityOffIcon fontSize="small" /> {t("hide_form")}
                  </Button>
                ) : showUserEditForm ? (
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
